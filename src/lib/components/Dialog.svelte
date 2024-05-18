<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    export let isOpen = false;

    const dispatch = createEventDispatcher<{requestclose: void; animationended: void}>();

    let dialog: HTMLDialogElement;

    function handleClose(event: Event) {
        event.preventDefault();
        dispatch('requestclose');
    }
    function handleAnimationEnd() {
        if (!isOpen) {
            dialog.close();
            dispatch('animationended');
        }
    }

    $: if (isOpen) {
        dialog.showModal();
    }
</script>

<dialog bind:this={dialog} class:closing={!isOpen} on:close={handleClose} on:animationend={handleAnimationEnd}>
    <slot />
</dialog>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    @keyframes slide-in {
        from {
            translate: 0 20%;
            opacity: 0;
        }
        to {
            translate: 0;
            opacity: 1;
        }
    }
    @keyframes slide-out {
        from {
            translate: 0;
            opacity: 1;
        }
        to {
            translate: 0 20%;
            opacity: 0;
        }
    }
    dialog {
        color: var(--color-fg);
        border: none;
        overflow: auto;
        height: fit-content;
        max-height: 95%;
        padding: 1.5rem;
        border-radius: 1em;
        background-color: var(--color-bg);
    }
    dialog[open] {
        display: flex;
        flex-direction: column;
        animation: slide-in 0.3s cubic-bezier(0.25, 0, 0.3, 1) normal;
    }
    dialog[open].closing {
        animation: slide-out 0.3s cubic-bezier(0.25, 0, 0.3, 1) normal;
    }

    dialog::backdrop {
        backdrop-filter: blur(5px) saturate(0.5) brightness(0.5);
        background-color: rgba(180, 178, 216, 0.13);
    }
    dialog[open]::backdrop {
        animation: fade-in 0.3s cubic-bezier(0.25, 0, 0.3, 1) normal;
    }
    dialog[open].closing::backdrop {
        animation: fade-out 0.3s cubic-bezier(0.25, 0, 0.3, 1) normal;
    }
</style>
