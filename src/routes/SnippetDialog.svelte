<script lang="ts">
    import {_} from 'svelte-i18n';
    import {snippets} from './snippets';
    import {highlight} from '$lib/markdown/mdToHtml';

    type Props = {
        isOpen: boolean;
    };

    let {isOpen = $bindable(false)}: Props = $props();

    let selectedSnippet = $state<(typeof snippets)[number]['key']>();
    let copied = $state(false);
    let snippet = $derived(snippets.find((s) => s.key === selectedSnippet) ?? {key: '', sql: ''});
</script>

<div class="dialog-header">
    <button class="btn" style:--fg="var(--color-fg)" style:--bg="var(--color-bg-1)" onclick={() => (isOpen = false)}>ESC</button>
    {#if selectedSnippet !== undefined}
        <button
            class="btn"
            style:--fg="var(--color-fg)"
            style:--bg="var(--color-bg-1)"
            onclick={() => {
                selectedSnippet = undefined;
                copied = false;
            }}>{$_('back')}</button
        >
        <h2>{$_(`snippets.${snippet.key}.title`)}</h2>
        <button
            disabled={copied}
            class="btn"
            style:--fg="var(--color-fg)"
            style:--bg="var(--color-bg-1)"
            onclick={() => {
                navigator.clipboard.writeText(snippet.sql);
                copied = true;
            }}>{copied ? $_('copied') : $_('copySql')}</button
        >
    {/if}
</div>
{#if selectedSnippet !== undefined}
    {@html highlight(snippet.sql ?? '', 'sql')}
{:else}
    <div class="dialog-content grid" style:--col="12rem" style:width="45rem">
        {#each snippets as snippet}
            <button class="snippet-card" onclick={() => (selectedSnippet = snippet.key)}>
                <h2>{$_(`snippets.${snippet.key}.title`)}</h2>
                <p>{$_(`snippets.${snippet.key}.description`)}</p>
            </button>
        {/each}
    </div>
{/if}

<style>
    .dialog-header {
        display: flex;
        gap: 1rem;
        align-items: center;
        & > h2 {
            margin-block: 0;
            margin-right: auto;
        }
    }
    .dialog-content {
        width: 40rem;
        max-width: 100%;
        margin: 1rem 0;
        overflow: auto;
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
