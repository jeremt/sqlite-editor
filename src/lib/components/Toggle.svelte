<script lang="ts">
    export let id: string;
    export let checked: boolean;
</script>

<input {id} type="checkbox" role="switch" bind:checked on:change />

<style>
    [role='switch'] {
        --toggle-width: 1.4rem;
        --toggle-thumb-gap: 0.2rem;
        --toggle-thumb-size: 0.6rem;

        display: inline-flex;

        cursor: pointer;
        outline: none;
        font-size: 0;
        appearance: none;
        user-select: none;

        margin: 0;
        padding-inline: 0 var(--toggle-width);
        transition: 0.3s all;
        border-radius: 1rem;

        background-color: var(--bg, var(--color-bg-2));
    }
    [role='switch']:checked {
        padding-inline: var(--toggle-width) 0;
        background-color: var(--color, var(--color-primary));
    }
    [role='switch']::before {
        content: '';
        margin: var(--toggle-thumb-gap);
        padding: var(--toggle-thumb-size);
        transition: inherit;
        background-color: white;
        box-sizing: border-box;
        border-radius: 1rem;
    }
</style>
