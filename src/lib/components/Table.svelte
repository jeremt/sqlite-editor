<script lang="ts">
    export let data: Record<string, any>[];
</script>

<table>
    <thead>
        <tr>
            {#each Object.keys(data[0]) as column}
                <th>{column}</th>
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
        padding: 0.5rem 1rem;
        border: 1px solid var(--theme-colors-dimmed);
    }
</style>
