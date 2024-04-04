<script lang="ts">
    export let header: {name: string; type: string}[] | undefined = undefined;
    export let data: Record<string, any>[];
</script>

<table>
    <thead>
        <tr>
            {#each header ?? Object.keys(data[0]).map((name) => ({name, type: undefined})) as column}
                <th
                    >{column.name}
                    {#if column.type}<span class="type">{column.type}</span>{/if}</th
                >
            {/each}
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
    table {
        border-collapse: collapse;
    }

    th,
    td {
        text-align: start;
        padding: 0.5rem 1rem;
        border: 1px solid var(--theme-colors-dimmed);
    }

    th > .type {
        color: var(--theme-colors-dimmed);
        font-size: 0.7rem;
        padding-left: 0.3rem;
    }
    td {
        color: var(--theme-colors-dimmed);
    }
</style>
