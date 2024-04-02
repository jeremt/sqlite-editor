<script lang="ts">
    import MonacoEditor from '$lib/editor/MonacoEditor.svelte';
    import type {SQLite3} from '$lib/sqlite/sqlite3';
    import {onMount} from 'svelte';
    import FeatherIcon from '$lib/components/FeatherIcon.svelte';
    import Button from '$lib/components/Button.svelte';
    import Table from '$lib/components/Table.svelte';

    let value: string;
    let sql: string;

    let db: any;

    let tables: string[] = [];
    let selectedTableName: string | undefined = undefined;
    let selectedTable: Record<string, any>[] = [];
    $: updateSchema(selectedTableName);

    let result: Record<string, any>[] = [];
    let error: string;

    onMount(async () => {
        const {default: initSqlite} = await import('$lib/sqlite/sqlite3.mjs');
        const sqlite3: SQLite3 = await initSqlite();
        db = new sqlite3.oo1.DB(':localStorage:', 'ct');
        updateSchema();
    });

    function runQuery() {
        try {
            const start = performance.now();
            result = db.exec(sql, {rowMode: 'object'});
            const time = performance.now() - start;
            console.log(`${sql} (${time.toFixed(1)}ms)`);
            updateSchema(selectedTableName);
        } catch (err) {
            error = (err as Error).message;
        }
    }

    function updateSchema(tableName?: string) {
        try {
            tables = db
                .exec(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;`, {rowMode: 'object'})
                .map((row: {name: string}) => row.name)
                .filter((name: string) => name !== 'sqlite_sequence');
            tableName = tableName ?? tables[0];
            if (tableName) {
                const infos = db.exec(`PRAGMA table_info('${tableName}');`, {rowMode: 'object'});
                const rows = db.exec(`SELECT * from "${tableName}"`, {rowMode: 'object'});
                selectedTable = rows;
                console.log(infos);
            }
        } catch (e) {
            console.warn('Failed to update schema: ', (e as Error).message);
        }
    }
</script>

<header>
    <h1><FeatherIcon /> SQLite editor</h1>
    <Button on:click={runQuery}>Run query</Button>
</header>
<main>
    <div id="left">
        <div id="editor">
            <MonacoEditor
                theme="dark"
                fontSize={14}
                files={[{path: 'default.sql', value: ``}]}
                selectedFile="default.sql"
                bind:value
                debounce={300}
                on:change={(event) => {
                    switch (event.detail.path) {
                        case 'default.sql':
                            sql = event.detail.value;
                            result = [];
                            error = '';
                            break;
                        default:
                            throw new Error(`File ${event.detail.path} not found.`);
                    }
                }}
            />
        </div>
        <div id="result">
            {#if error}
                <div id="error">{error}</div>
            {:else if result.length === 0}
                <div id="success">Success. No rows returned</div>
            {:else}
                <Table data={result} />
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
                <Table data={selectedTable} />
            {:else}
                <p>The table {selectedTable} is empty.</p>
            {/if}
        {:else}
            <p>No tables created yet. You can create one by copying this into the editor and clicking on <strong>RUN QUERY</strong>.</p>
            <pre><code
                    >-- Create a user table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
-- Insert 3 users into the table
INSERT INTO users (name, email) VALUES
  ('Ada', 'ada@codepassport.dev'),
  ('Grace', 'grace@codepassport.dev'),
  ('Dorothy', 'dorothy@codepassport.dev');</code
                ></pre>
        {/if}
    </div>
</main>

<style>
    header {
        display: flex;
        padding: 0.2rem 1rem;
        align-items: center;
        justify-content: space-between;
    }
    h1 {
        font-size: 1.3rem;
    }
    main {
        width: 100%;
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
    #result {
        height: 20rem;
        background-color: var(--theme-colors-area);
        padding: 1rem;
        overflow: auto;
    }
    #error {
        color: var(--theme-colors-error);
    }
    select {
        border: none;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        outline: none;
    }
    p {
        margin: 0;
        color: var(--theme-colors-dimmed);
        & strong {
            color: var(--theme-colors-fg);
        }
    }
    pre {
        padding: 1rem;
        background-color: var(--theme-colors-area);
    }
</style>
