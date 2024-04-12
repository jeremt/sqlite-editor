import {unified} from 'unified';
import rehypeSlug from 'rehype-slug';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import {getHighlighter} from 'shiki';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import dark from './themes/dark-plus.json';
import light from './themes/light-plus.json';

import html from './langs/html.tmLanguage.json';
import css from './langs/css.tmLanguage.json';
import json from './langs/json.tmLanguage.json';
import javascript from './langs/javascript.tmLanguage.json';

const langs = [
    {
        id: 'html',
        scopeName: 'text.html.basic',
        grammar: html,
    },
    {
        id: 'css',
        scopeName: 'source.css',
        grammar: css,
    },
    {
        id: 'javascript',
        scopeName: 'source.js',
        aliases: ['js'],
        grammar: javascript,
    },
    {
        id: 'json',
        scopeName: 'source.json',
        grammar: json,
    },
];

/**
 * Setup unified markdown parser with some useful plugins (syntax highlighting, slugs, etc.)
 */
const parser = unified()
    .use(remarkParse)
    .use(remarkUnwrapImages)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {behavior: 'wrap'})
    .use(rehypeExternalLinks, {rel: ['nofollow'], target: '_blank'})

    // @ts-expect-error rehype-pretty-code is poorly typed 🥲
    .use(rehypePrettyCode, {
        keepBackground: false,
        theme: {dark, light},
        getHighlighter: (options) =>
            getHighlighter({
                ...options,
                // @ts-expect-error rehype-pretty-code is poorly typed 🥲
                langs,
            }),
    })
    .use(rehypeStringify);

/**
 * Takes a markdown text and convert it to html.
 * @param content markdown text as raw string
 * @returns generated html
 */
export async function mdToHtml(content: string) {
    try {
        return [(await parser.process(content)).toString(), null] as const;
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
    return (await parser.process(content)).toString();
}

const darkHighlighter = await getHighlighter({
    theme: dark,
    // @ts-expect-error rehype-pretty-code is poorly typed 🥲
    langs,
});

const lightHighlighter = await getHighlighter({
    theme: light,
    // @ts-expect-error rehype-pretty-code is poorly typed 🥲
    langs,
});

export function highlight(code: string, lang: string) {
    // @ts-expect-error rehype-pretty-code is poorly typed 🥲
    return darkHighlighter.codeToHtml(code, {lang}) + lightHighlighter.codeToHtml(code, {lang});
}
