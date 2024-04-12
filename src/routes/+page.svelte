<script lang="ts">
    import MonacoEditor from '$lib/editor/MonacoEditor.svelte';
    import type {SQLite3} from '$lib/sqlite/sqlite3';
    import {onMount} from 'svelte';
    import FeatherIcon from '$lib/icons/FeatherIcon.svelte';
    import Table from '$lib/components/Table.svelte';
    import GithubIcon from '$lib/icons/GithubIcon.svelte';
    import ColorSchemeToggle from '$lib/color-scheme/ColorSchemeToggle.svelte';
    import {colorScheme} from '$lib/color-scheme/store';

    let value: string;
    let sql: string;

    let db: any; // TODO: stop being lazy and fix this type 😅

    let tables: string[] = [];
    let selectedTableName: string | undefined = undefined;
    let selectedTableHeader: {name: string; type: string}[] | undefined = undefined;
    let selectedTable: Record<string, any>[] = [];
    $: updateSchema(selectedTableName);

    let result: Record<string, any>[] = [];
    let error = '';
    let isClear = true;
    let executionTime = '';

    onMount(async () => {
        const {default: initSqlite} = await import('$lib/sqlite/sqlite3.mjs');
        const sqlite3: SQLite3 = await initSqlite();
        db = new sqlite3.oo1.DB(':localStorage:', 'ct');
        updateSchema();
    });

    function runQuery() {
        result = [];
        error = '';
        try {
            const start = performance.now();
            result = db.exec(sql, {rowMode: 'object'});
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
            tableName = tableName ?? tables[0];
            if (tableName) {
                const rows = db.exec(`SELECT * from "${tableName}"`, {rowMode: 'object'});
                selectedTable = rows;
                selectedTableHeader = getTableHeader(tableName);
            }
        } catch (e) {
            console.warn('Failed to update schema: ', (e as Error).message);
        }
    }

    function getTableHeader(tableName: string) {
        const infos = db.exec(`PRAGMA table_info('${tableName}');`, {rowMode: 'object'});
        return infos.map(({pk, name, type}: Record<string, any>) => ({name: `${pk === 1 ? '🔑 ' : ''}${name}`, type}));
    }
</script>

<header>
    <h1><FeatherIcon /> SQLite editor</h1>
    <ColorSchemeToggle />
    <a role="button" class="circle" href="https://github.com/jeremt/sqlite-editor" target="_blank"><GithubIcon /></a>
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
                debounce={300}
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
            <button style:--font-size="0.75rem" on:click={runQuery}>RUN QUERY ⌘⏎</button>
            <button style:--font-size="0.75rem" style:--fg="var(--color-fg)" style:--bg="var(--color-area)" on:click={clearResult}>CLEAR</button>
            {executionTime}
        </div>
        <div id="result">
            {#if error !== ''}
                <div class="error">{error}</div>
            {:else if result.length > 0}
                <Table data={result} />
            {:else if !isClear}
                <div class="info">Success. No rows returned</div>
            {:else}
                <div class="info">Click <strong>RUN QUERY</strong> to execute your SQL query.</div>
            {/if}
        </div>
    </div>
    <div id="right">
        {#if tables.length}
            <select bind:value={selectedTableName}>
                {#each tables as table}
                    <option value={table}>{table}</option>
                {/each}
            </select>
            {#if selectedTable.length}
                <Table header={selectedTableHeader} data={selectedTable} />
            {:else}
                <p>The table {selectedTable} is empty.</p>
            {/if}
        {:else}
            <p>No tables created yet. You can create one by copying this into the editor and clicking on <strong>RUN QUERY</strong>.</p>
            <pre><code
                    >-- Create a simple user table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
-- Insert 4 famous in tech women into the table
INSERT INTO users (name, email) VALUES
  ('Ada', 'ada@codepassport.dev'),
  ('Grace', 'grace@codepassport.dev'),
  ('Dorothy', 'dorothy@codepassport.dev'),
  ('Vi', 'vi@codepassport.dev');</code
                ></pre>
        {/if}
    </div>
</main>

<style>
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

    p {
        margin: 0;
        color: var(--color-muted);
        & strong {
            color: var(--color-fg);
        }
    }
    pre {
        padding: 1.5rem;
        background-color: var(--color-area);
    }
</style>
