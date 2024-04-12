<script lang="ts">
    import MoonIcon from '$lib/icons/MoonIcon.svelte';
    import SunIcon from '$lib/icons/SunIcon.svelte';
    import {onMount} from 'svelte';
    import {colorScheme, type ColorScheme} from './store';

    onMount(() => {
        const value = document.documentElement.getAttribute('color-scheme') as ColorScheme;
        if (value === null) {
            console.warn('color-scheme should be set on load');
        }
        $colorScheme = value;
    });

    function toggleColorScheme() {
        $colorScheme = $colorScheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('colorScheme', $colorScheme);
        document.documentElement.setAttribute('color-scheme', $colorScheme);
    }
</script>

<button class="circle" on:click={toggleColorScheme}>
    {#if $colorScheme === 'dark'}
        <SunIcon />
    {:else}
        <MoonIcon />
    {/if}
</button>
