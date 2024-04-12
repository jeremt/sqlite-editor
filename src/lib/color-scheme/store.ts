import {writable} from 'svelte/store';

export type ColorScheme = 'dark' | 'light';
export const colorScheme = writable<ColorScheme>('dark');
