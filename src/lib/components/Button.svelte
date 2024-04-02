<script lang="ts">
    export let tabindex = 0;
    export let tag: 'a' | 'button' = 'button';
    export let loading: boolean | undefined = undefined;
</script>

<svelte:element this={tag} {tabindex} class:loading {...$$restProps} role="button" on:click><slot /></svelte:element>

<style>
    a,
    button {
        gap: 0.5em;
        color: var(--fg, var(--theme-colors-area));
        cursor: pointer;
        border: none;
        display: flex;
        padding: 0.8em 1em;
        font-size: var(--font-size, 0.85rem);
        background: var(--color, var(--theme-colors-accent));
        transition: all 0.3s;
        align-items: center;
        font-family: var(--theme-fonts-ui);
        font-weight: bold;
        user-select: none;
        border-radius: 0.8em;
        text-transform: uppercase;
        justify-content: center;
        text-decoration: none;
        &:hover {
            translate: 0 -0.1em;
            border-radius: 1em;
        }
        &:active {
            translate: 0 0.2em;
            border-radius: 0.8em;
        }
        &:disabled {
            color: var(--theme-colors-dimmed);
            cursor: default;
            pointer-events: none;
            background-color: var(--theme-colors-area);
        }

        &.loading {
            cursor: default;
            pointer-events: none;
            filter: brightness(0.8);
        }

        /* padding should only be based on text not icons */
        & > svg {
            margin: -1rem 0;
        }
    }
</style>
