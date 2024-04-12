<script lang="ts">
    import KeyIcon from '$lib/icons/KeyIcon.svelte';
    import type {TableInfoColumn} from '$lib/sqlite/sqlite3';

    export let header: TableInfoColumn[] | undefined = undefined;
    export let data: Record<string, any>[];
</script>

<table>
    <thead>
        <tr>
            {#if header}
                {#each header as column}
                    <th>
                        {#if column.pk}<span title="PRIMARY KEY" style:padding-right="0.5rem"><KeyIcon /></span>{/if}
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

    th {
        white-space: nowrap;
    }

    th > .type {
        color: var(--color-muted);
        font-weight: normal;
        font-size: 0.7rem;
        padding-left: 0.3rem;
    }
    td {
        color: var(--color-muted);
    }
</style>
