import {mdToHtml} from '$lib/markdown/mdToHtml';
import {error} from '@sveltejs/kit';
import empty from './empty.md?raw';

export const prerender = true;

export async function load() {
    const [content, err] = await mdToHtml(empty);
    if (err) {
        throw error(500, err.message);
    }
    return {
        content,
    };
}
