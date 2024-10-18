import {mdToHtml} from '$lib/markdown/mdToHtml';
import {error} from '@sveltejs/kit';
import empty from './empty.md?raw';
import emptyFR from './empty.fr.md?raw';
import {get} from 'svelte/store';
import {locale} from 'svelte-i18n';
import {snippets} from './snippets';

export const prerender = true;

export async function load({request}) {
    const localeEmpty = get(locale) === 'fr-FR' ? emptyFR : empty;
    const [content, err] = await mdToHtml(localeEmpty);
    if (err) {
        throw error(500, err.message);
    }
    return {
        isMac: request.headers.get('user-agent')?.includes('Mac OS') ?? false,
        content,
        snippets,
    };
}
