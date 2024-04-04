<script lang="ts">
    import type monaco from 'monaco-editor';
    import {createEventDispatcher, onMount, onDestroy} from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    // import sqlWorker from 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution?worker';

    /**
     * Represents a virtual file used by the editor.
     */
    type FileData = {path: string; value: string};

    /**
     * List of files to load when the editor is mounted. Each file has 2 attributs :
     * - `path`: the name of the file
     * - `value`: the code
     * @example `[{path: 'index.html', code: '<h1>Hello</h1>'}, [{path: 'index.js', code: 'console.log("👋")'}]]`
     */
    export let files: FileData[] = [];

    /**
     * The currently selected file.
     * @example 'index.html'
     */
    export let selectedFile: string;

    /**
     * The current code value. You can specify it if you want to editor to be controlled from outsite.
     */
    export let value: string | undefined = undefined;

    /**
     * The code font size in pixels.
     */
    export let fontSize: number;

    /**
     * The name of the color highlighting theme to use.
     */
    export let theme: 'light' | 'dark' = 'dark';

    /**
     * The debounce delay for each change (in ms).
     */
    export let debounce: number = 0;

    /**
     * Whether emmet should be enabled.
     */
    // export let emmet = true;

    let divEl: HTMLElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco: typeof monaco;

    const dispatch = createEventDispatcher<{change: FileData}>();

    // @ts-ignore fuck you node
    let debounceTimer: NodeJS.Timeout;

    // @ts-ignore async works but not in typescript 🤔
    onMount(async () => {
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                // if (label === 'sql') {
                //     return new sqlWorker();
                // }
                return new editorWorker();
            },
        };

        Monaco = await import('monaco-editor');
        // const {default: dracula} = await import(`monaco-themes/themes/Dracula.json`);
        // Monaco.editor.defineTheme('dracula', dracula as monaco.editor.IStandaloneThemeData);
        // npx monaco-vscode-textmate-theme-converter -i ./node_modules/shiki/themes/dark-plus.json -o dark-plus-monaco.json

        // if (emmet) {
        // 	const { emmetHTML, emmetCSS } = await import('emmet-monaco-es');
        // 	emmetHTML(Monaco);
        // 	emmetCSS(Monaco);
        // }

        Monaco.editor.defineTheme('dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {},
        });

        Monaco.editor.defineTheme('light', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {},
        });

        Monaco.editor.setTheme(theme);

        // generate mocano model for each file and create editor from selectedFile
        for (const file of files) {
            const [_, ext] = file.path.split('.');
            const model = Monaco.editor.createModel(file.value, ext === 'js' ? 'javascript' : ext, new Monaco.Uri().with({path: file.path}));
            if (file.path === selectedFile) {
                editor = Monaco.editor.create(divEl, {
                    model,
                    language: ext === 'js' ? 'javascript' : ext,
                    fontSize,
                    minimap: {enabled: false},
                });
            }
        }

        if (editor === undefined) {
            throw new Error('selectedFile should be specify to properly create the editor');
        }

        // call on:change and apply debounce if specified
        editor.onDidChangeModelContent(() => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                dispatch('change', {path: selectedFile, value: editor.getValue()});
            }, debounce);
        });

        return () => {
            editor.dispose();
        };
    });

    onDestroy(() => {
        Monaco?.editor.getModels().forEach((model) => {
            model.dispose();
        });
    });

    // load model when selected file changes
    $: if (editor) {
        const model = Monaco.editor.getModels().find((m) => m.uri.path === `/${selectedFile}`);
        if (model === undefined) {
            throw new Error(`file ${selectedFile} not found`);
        }
        editor.setModel(model);

        // update editor if value is changed from outside
        if (model !== undefined && value !== undefined && value !== model.getValue()) {
            model.pushEditOperations(
                [],
                [
                    {
                        range: model.getFullModelRange(),
                        text: value,
                    },
                ],
                () => [],
            );
        }
    }
</script>

<div bind:this={divEl} class="editor" />

<svelte:window
    on:resize={() => {
        editor.layout({width: 0, height: 0}); // the layout below won't be triggered otherwise
        window.requestAnimationFrame(() => {
            const rect = divEl.getBoundingClientRect();
            editor.layout({width: rect.width, height: rect.height});
        });
    }}
/>

<style>
    .editor {
        height: 100%;
        background-color: var(--theme-colors-area); /* FIXME: not generic, should be a prop */
    }
</style>
