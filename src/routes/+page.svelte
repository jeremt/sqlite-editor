<script lang="ts">
    import MonacoEditor from '$lib/editor/MonacoEditor.svelte';
    import type {DB, SQLite3, TableInfoColumn} from '$lib/sqlite/sqlite3';
    import {onMount} from 'svelte';
    import FeatherIcon from '$lib/icons/LogoIcon.svelte';
    import SQLTable from '$lib/components/SQLTable.svelte';
    import GithubIcon from '$lib/icons/GithubIcon.svelte';
    import ColorSchemeToggle from '$lib/color-scheme/ColorSchemeToggle.svelte';
    import {colorScheme} from '$lib/color-scheme/store';
    import TableIcon from '$lib/icons/TableIcon.svelte';
    import BadgeIcon from '$lib/icons/BadgeIcon.svelte';
    import Dialog from '$lib/components/Dialog.svelte';
    import Toggle from '$lib/components/Toggle.svelte';
    import {generateDbDump, getTableHeader} from '$lib/generateDbSchema';
    import {_} from 'svelte-i18n';
    import {mdToHtml} from '$lib/markdown/mdToHtml';
    import {SplitPane} from '@rich_harris/svelte-split-pane';
    import type {Schema} from '$lib/editor/addSqliteAutocomplete';

    export let data;

    let value: string;
    let sql: string;

    let db: DB | undefined;

    let schema: Schema;
    let tables: string[] = [];
    let selectedTableName: string | undefined = undefined;
    let selectedTableHeader: TableInfoColumn[] | undefined = undefined;
    let selectedTable: Record<string, any>[] = [];
    $: updateSchema(selectedTableName);

    let result: Record<string, any>[] = [];
    let error = '';
    let isClear = true;
    let executionTime = '';
    let selection = '';

    let isMounted = false; // prevent fouc
    onMount(async () => {
        const {default: initSqlite} = await import('$lib/sqlite/sqlite3.mjs');
        const sqlite3: SQLite3 = await initSqlite();
        db = new sqlite3.oo1.DB(':localStorage:', '');
        updateSchema();
        isMounted = true;
    });

    function runQuery() {
        result = [];
        error = '';
        try {
            const start = performance.now();
            result = db?.exec(selection !== '' ? selection : sql, {rowMode: 'object'});
            const time = performance.now() - start;
            executionTime = `executed in ${time.toFixed(1)}ms`;
            updateSchema(selectedTableName);
        } catch (err) {
            error = (err as Error).message;
        } finally {
            isClear = false;
        }
    }

    function clearResult() {
        result = [];
        error = '';
        isClear = true;
        executionTime = '';
    }

    function updateSchema(tableName?: string) {
        if (!db) {
            return;
        }
        try {
            schema = db
                .exec(
                    `SELECT 
                        m.name AS tableName, 
                        p.name AS columnName
                    FROM 
                        sqlite_master m
                    JOIN 
                        pragma_table_info(m.name) p
                    WHERE 
                        m.type = 'table' AND m.name != 'sqlite_sequence'
                    ORDER BY 
                        m.name, 
                        p.cid;`,
                    {rowMode: 'object'},
                )
                .reduce((result: Schema, {tableName, columnName}: {tableName: string; columnName: string}) => {
                    return {...result, [tableName]: result[tableName] ? [...result[tableName], columnName] : [columnName]};
                }, {} as Schema);
            tables = Object.keys(schema);
            selectedTableName = tableName ?? tables[0];
            if (selectedTableName) {
                const rows = db.exec(`SELECT * from "${selectedTableName}"`, {rowMode: 'object'});
                selectedTable = rows;
                selectedTableHeader = getTableHeader(db, selectedTableName);
            }
        } catch (e) {
            console.warn('Failed to update schema: ', (e as Error).message);
        }
    }

    let downloadLink: HTMLAnchorElement | null;
    let downloadOpen = false;
    let dbDump = '';
    let includeData = true;
    $: updateDbDump(), includeData, db, downloadOpen;
    async function updateDbDump() {
        if (!db) {
            return;
        }
        const [content, err] = await mdToHtml('```sql\n' + generateDbDump(db, includeData) + '```');
        if (err) {
            console.error(err);
        }
        if (content) {
            dbDump = content;
        }
    }
    function openDownload() {
        downloadOpen = true;
    }

    let snippetsOpen = false;
    function applySnippet(sql: string) {
        value = sql;
        snippetsOpen = false;
    }
</script>

<svelte:head>
    <title>Sqlite Editor</title>
    <meta name="description" content="A very simple online SQL editor, with a local database." />
    <meta property="og:title" content="Sqlite Editor" />
    <meta property="og:site_name" content="Sqlite Editor" />
    <meta property="og:image" content="/thumbnail.png" />
    <meta property="og:url" content="https://simple-sqlite-editor.vercel.app" />
    <meta property="og:description" content="A very simple online SQL editor with a local database." />
    <meta property="twitter:title" content="Sqlite Editor" />
    <meta property="twitter:description" content="A very simple online SQL editor, with a local database." />
    <meta property="twitter:image" content="/thumbnail.png" />
</svelte:head>

<svelte:document
    on:keydown={(e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
            e.preventDefault();
            downloadLink?.click();
        }
    }}
/>

<header>
    <h1><FeatherIcon /> SQLite editor</h1>
    <button class="btn" on:click={() => (snippetsOpen = true)}>IMPORTER</button>
    <ColorSchemeToggle />
    <a role="button" class="circle" aria-label="Project's github" href="https://github.com/jeremt/sqlite-editor" target="_blank"><GithubIcon /></a>
</header>
<main>
    <SplitPane type="horizontal" min="200px" max="-100px" pos="50%" priority="min" --color="var(--color-bg-1)" --thickness="1rem">
        <div id="left" slot="a">
            <SplitPane type="vertical">
                <div id="editor" slot="a">
                    <MonacoEditor
                        theme={$colorScheme}
                        fontSize={14}
                        files={[{path: 'default.sql', value: ``}]}
                        selectedFile="default.sql"
                        {schema}
                        bind:value
                        bind:selection
                        debounce={300}
                        on:save={() => {
                            downloadLink?.click();
                        }}
                        on:run={runQuery}
                        on:change={(event) => {
                            switch (event.detail.path) {
                                case 'default.sql':
                                    sql = event.detail.value;
                                    break;
                                default:
                                    throw new Error(`File ${event.detail.path} not found.`);
                            }
                        }}
                    />
                </div>
                <slot slot="b">
                    <div id="console">
                        <div id="toolbar">
                            <button class="btn" style:--font-size="0.75rem" on:click={runQuery}
                                >{selection === '' ? $_('run') : $_('run_selection')} {data.isMac ? '⌘' : 'Ctrl'}⏎</button
                            >
                            <button class="btn" style:--font-size="0.75rem" style:--fg="var(--color-fg)" style:--bg="var(--color-bg-1)" on:click={clearResult}
                                >{$_('clear')}</button
                            >
                            <span style:color="var(--color-fg-1)">{executionTime}</span>
                            <button
                                class="btn"
                                style:--font-size="0.75rem"
                                style:margin-left="auto"
                                style:--fg="var(--color-fg)"
                                style:--bg="var(--color-bg-1)"
                                on:click={openDownload}>{$_('download')} .sql</button
                            >
                        </div>
                        <div id="result">
                            {#if error !== ''}
                                <div class="error">{error}</div>
                            {:else if result.length > 0}
                                <SQLTable data={result} />
                            {:else if !isClear}
                                <div class="info">{$_('result.success')}</div>
                            {:else}
                                <div class="info">
                                    {@html $_('result.emptyState', {
                                        values: {cmdOrCtrl: data.isMac || navigator.userAgent.indexOf('Mac OS X') !== -1 ? '⌘' : 'Ctrl'},
                                    })}
                                </div>
                            {/if}
                        </div>
                    </div>
                </slot>
            </SplitPane>
        </div>
        <div id="right" slot="b">
            {#if tables.length}
                <div id="tables">
                    {#each tables as table}
                        <button class="btn" class:selected={selectedTableName === table} on:click={() => (selectedTableName = table)}
                            ><TableIcon /> {table}</button
                        >
                    {/each}
                </div>
                <SQLTable header={selectedTableHeader} data={selectedTable} bind:tableName={selectedTableName} />
            {:else if isMounted}
                <article class="prose">{@html data.content}</article>
            {/if}
        </div>
    </SplitPane>
</main>

<a href="https://codepassport.dev" target="_blank" class="badge">
    <BadgeIcon />
</a>

<Dialog bind:isOpen={downloadOpen} on:requestclose={() => (downloadOpen = false)}>
    <div class="dialog-header">
        <button class="btn" style:--fg="var(--color-fg)" style:--bg="var(--color-bg-1)" on:click={() => (downloadOpen = false)}>ESC</button>
        <label for="includeData"
            >{$_('downloadDialog.include_data')}
            <Toggle id="includeData" bind:checked={includeData} />
        </label>
        <a role="button" class="btn" bind:this={downloadLink} href="data:application/octet-stream,{encodeURIComponent(dbDump)}" download="schema.sql"
            >{$_('downloadDialog.download_file')}</a
        >
    </div>
    <div class="dialog-content">
        {@html dbDump}
    </div>
    <small>{@html $_('downloadDialog.warning')}</small>
</Dialog>

<Dialog bind:isOpen={snippetsOpen} on:requestclose={() => (snippetsOpen = false)}>
    <div class="dialog-header">
        <button class="btn" style:--fg="var(--color-fg)" style:--bg="var(--color-bg-1)" on:click={() => (snippetsOpen = false)}>ESC</button>
    </div>
    <div class="dialog-content grid" style:--col="12rem" style:width="45rem">
        {#each data.snippets as snippet}
            <button class="snippet-card" on:click={() => applySnippet(snippet.sql)}>
                <h2>{$_(`snippets.${snippet.key}.title`)}</h2>
                <p>{$_(`snippets.${snippet.key}.description`)}</p>
            </button>
        {/each}
    </div>
    <div class="title" style:color="var(--color-fg-1)" style:text-align="center">Clique sur un snippet pour l'insérer dans l'éditeur</div>
</Dialog>

<style>
    .badge {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
    }
    header {
        display: flex;
        gap: 0.75rem;
        padding: 0.5rem 2rem;
        align-items: center;
    }
    h1 {
        font-size: 1.3rem;
        margin-right: auto;
    }
    main {
        width: 100%;
        max-width: 100rem;
        margin: auto;
        display: flex;
        overflow: hidden;
        flex-grow: 1;
    }
    #left {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0 0 1rem 1rem;
    }
    #right {
        padding: 1rem;
        overflow: auto;
    }
    #editor {
        flex-grow: 1;
    }

    #console {
        display: flex;
        flex-direction: column;
        padding-top: 1rem;
        gap: 0.5rem;
    }

    #toolbar {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-size: 0.9rem;
        color: var(--color-dimmed);
    }
    #result {
        flex-grow: 1;
        background-color: var(--color-bg-1);
        padding: 1rem;
        overflow: auto;
    }
    .error {
        color: var(--color-error);
    }
    .info {
        color: var(--color-fg-1);
    }
    .info > :global(strong) {
        color: var(--color-fg);
        font-size: 0.8rem;
        padding: 0 0.3rem;
    }

    #tables {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        padding-bottom: 1rem;
    }
    #tables > button {
        text-transform: lowercase;
    }

    #tables > button:not(.selected) {
        --fg: var(--color-fg);
        --bg: var(--color-bg-1);
    }
    .dialog-header {
        display: flex;
        gap: 1rem;
        align-items: center;
        & > label {
            display: flex;
            gap: 1rem;
            align-items: center;
            margin-right: auto;
        }
    }
    .dialog-content {
        width: 40rem;
        max-width: 100%;
        margin: 1rem 0;
        overflow: auto;
    }
    .dialog-content > :global(pre) {
        margin: 0;
    }
    small {
        width: 40rem;
        max-width: 100%;
        padding: 0 1rem;
        text-align: center;
        color: var(--color-fg-1);
        & > a {
            color: var(--color-primary);
        }
    }

    .grid {
        gap: 1rem;
    }

    .snippet-card {
        color: var(--color-fg);
        text-align: left;
        font-family: var(--font-ui);
        padding: 1rem;
        border-radius: 1rem;
        background-color: var(--color-bg-1);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        cursor: pointer;
        border: 2px solid transparent;
        transition: 0.3s all;
        &:hover {
            border: 2px solid var(--color-fg);
        }
        & > h2 {
            margin: 0;
            font-size: 1.2rem;
        }
        & > p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--color-fg-1);
        }
    }
</style>
