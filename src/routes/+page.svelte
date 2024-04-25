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
    import {isMac} from '$lib/isMac.js';

    export let data;

    let value: string;
    let sql: string;

    let db: DB | undefined;

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
        db = new sqlite3.oo1.DB(':localStorage:', 'ct');
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
            tables = db
                .exec(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;`, {rowMode: 'object'})
                .map((row: {name: string}) => row.name)
                .filter((name: string) => name !== 'sqlite_sequence');
            selectedTableName = tableName ?? tables[0];
            if (selectedTableName) {
                const rows = db.exec(`SELECT * from "${selectedTableName}"`, {rowMode: 'object'});
                selectedTable = rows;
                selectedTableHeader = getTableHeader(selectedTableName);
            }
        } catch (e) {
            console.warn('Failed to update schema: ', (e as Error).message);
        }
    }

    function getTableHeader(tableName: string): TableInfoColumn[] | undefined {
        return db?.exec(`PRAGMA table_info('${tableName}');`, {rowMode: 'object'});
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
</svelte:head>

<header>
    <h1><FeatherIcon /> SQLite editor</h1>
    <ColorSchemeToggle />
    <a role="button" class="circle" aria-label="Project's github" href="https://github.com/jeremt/sqlite-editor" target="_blank"><GithubIcon /></a>
</header>
<main>
    <div id="left">
        <div id="editor">
            <MonacoEditor
                theme={$colorScheme}
                fontSize={14}
                files={[{path: 'default.sql', value: ``}]}
                selectedFile="default.sql"
                bind:value
                bind:selection
                debounce={300}
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
        <div id="toolbar">
            <button style:--font-size="0.75rem" on:click={runQuery}>{selection === '' ? 'RUN' : 'RUN SELECTION'} {isMac() ? '⌘' : 'Ctrl'}⏎</button>
            <button style:--font-size="0.75rem" style:--fg="var(--color-fg)" style:--bg="var(--color-area)" on:click={clearResult}>CLEAR</button>
            {executionTime}
        </div>
        <div id="result">
            {#if error !== ''}
                <div class="error">{error}</div>
            {:else if result.length > 0}
                <SQLTable data={result} />
            {:else if !isClear}
                <div class="info">Success. No rows returned</div>
            {:else}
                <div class="info">Use <strong>RUN {isMac() ? '⌘' : 'Ctrl'}⏎</strong> to execute your SQL query.</div>
            {/if}
        </div>
    </div>
    <div id="right">
        {#if tables.length}
            <div id="tables">
                {#each tables as table}
                    <button class:selected={selectedTableName === table} on:click={() => (selectedTableName = table)}><TableIcon /> {table}</button>
                {/each}
            </div>
            <SQLTable header={selectedTableHeader} data={selectedTable} />
        {:else if isMounted}
            <article class="prose">{@html data.content}</article>
        {/if}
    </div>
</main>

<a href="https://codepassport.dev" target="_blank" class="badge">
    <BadgeIcon />
</a>

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
        flex-grow: 1;
        gap: 0.5rem;
        padding: 0 0 1rem 1rem;
    }
    #right {
        width: 45%;
        padding: 1rem;
        overflow: auto;
    }
    #editor {
        flex-grow: 1;
    }

    #toolbar {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-size: 0.9rem;
        color: var(--color-dimmed);
    }
    #result {
        height: 20rem;
        background-color: var(--color-area);
        padding: 1rem;
        overflow: auto;
    }
    .error {
        color: var(--color-error);
    }
    .info {
        color: var(--color-muted);
    }
    .info > strong {
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
        --bg: var(--color-area);
    }
</style>
