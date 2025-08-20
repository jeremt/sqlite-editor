import {unified} from 'unified';
import rehypeSlug from 'rehype-slug';
import rehypeShiki from '@shikijs/rehype';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { createHighlighter } from 'shiki';

// Setup the parser once with some useful plugins so we can use it later
const _parser = unified()
    .use(remarkParse)
    .use(remarkUnwrapImages)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {behavior: 'wrap'})
    .use(rehypeExternalLinks, {rel: ['nofollow'], target: '_blank'})
    .use(rehypeShiki, {
        langs: ['sql'],
        themes: {
            light: 'light-plus',
            dark: 'dark-plus',
        },
    })
    .use(rehypeStringify);

/**
 * Takes a markdown text and convert it to html.
 * @param content markdown text as raw string
 * @returns generated html
 */
export async function mdToHtml(content: string) {
    try {
        return [(await _parser.process(content)).toString(), null] as const;
    } catch (err) {
        return [null, err as Error] as const;
    }
}

/**
 * Same as `mdToHtml()` but throws
 * @param content markdown text as raw string
 * @returns generated html
 * @throws
 */
export async function unsafeMdToHtml(content: string) {
    return (await _parser.process(content)).toString();
}

export const highlighter = await createHighlighter({
    themes: ['dark-plus', 'light-plus'],
    langs: ['sql', 'javascript', 'typescript', 'markdown', 'json', 'css', 'html'],
});

export function highlight(code: string, lang: string) {
    return highlighter.codeToHtml(code, {themes: {dark: 'dark-plus', light: 'light-plus'}, lang});
}
