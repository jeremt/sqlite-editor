<script lang="ts">
    import KeyIcon from '$lib/icons/KeyIcon.svelte';
    import LinkIcon from '$lib/icons/LinkIcon.svelte';
    import type {TableInfoColumn} from '$lib/sqlite/sqlite3';

    export let header: TableInfoColumn[] | undefined = undefined;
    export let data: Record<string, any>[];

    function selectForeignTable(table?: string, column?: string) {
        console.log(table, column);
    }
</script>

<table>
    <thead>
        <tr>
            {#if header}
                {#each header as column}
                    <th>
                        {#if column.pk}<span title="PRIMARY KEY" style:padding-right="0.5rem"><KeyIcon /></span>{/if}
                        {#if column.fk_column && column.fk_table}<button
                                class="invisible"
                                title="FOREIGN KEY {column.fk_table}.{column.fk_column}"
                                on:click={() => selectForeignTable(column.fk_table, column.fk_column)}><LinkIcon /></button
                            >{/if}
                        <span class="name">{column.name}</span>
                        {#if column.type}<span class="type">{column.type}</span>{/if}
                    </th>
                {/each}
            {:else if data.length > 0}
                {#each Object.keys(data[0]) as column}
                    <th>{column}</th>
                {/each}
            {/if}
        </tr>
    </thead>
    <tbody>
        {#each data as row}
            <tr>
                {#each Object.values(row) as cell}
                    <td>{cell}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    th,
    td {
        text-align: start;
        padding: 0.5rem 1rem;
    }
    button.invisible {
        background-color: transparent;
        padding: 0;
        cursor: pointer;
        border: none;
        color: var(--color-fg);
    }

    th {
        white-space: nowrap;
    }

    th > .type {
        color: var(--color-fg-1);
        font-weight: normal;
        font-size: 0.7rem;
        padding-left: 0.3rem;
    }
    td {
        color: var(--color-fg-1);
    }
</style>
