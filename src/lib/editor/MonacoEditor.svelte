<script lang="ts">
    import type monaco from 'monaco-editor';
    import {resize} from '$lib/helpers/resize';
    import {shikiToMonaco} from '@shikijs/monaco';
    import {createEventDispatcher, onMount, onDestroy} from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
    import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    import {highlighter} from '$lib/markdown/mdToHtml';
    import {addSqliteAutocomplete, type Schema} from './addSqliteAutocomplete';

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
     * The table names and columns, used for autocomplete.
     */
    export let schema: Schema;

    /**
     * The currently selected text.
     */
    export let selection = '';

    /**
     * The name of the color highlighting theme to use.
     */
    export let theme: 'light' | 'dark' = 'dark';

    /**
     * The debounce delay for each change (in ms).
     */
    export let debounce: number = 0;

    let divEl: HTMLElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco: typeof monaco;

    const dispatch = createEventDispatcher<{
        change: FileData;
        run: void;
        ready: {monaco: typeof monaco; editor: monaco.editor.IStandaloneCodeEditor};
        save: void;
    }>();

    let debounceTimer: number;

    // @ts-ignore async works but not in typescript 🤔
    onMount(async () => {
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                if (label === 'json') {
                    return new jsonWorker();
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                    return new cssWorker();
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return new htmlWorker();
                }
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            },
        };

        Monaco = await import('monaco-editor');

        shikiToMonaco(highlighter, Monaco);

        Monaco.editor.setTheme(`${theme}-plus`);

        // generate mocano model for each file and create editor from selectedFile
        for (const file of files) {
            const [_, ext] = file.path.split('.');
            const mapExtension: Record<string, string> = {
                js: 'typescript',
                md: 'markdown',
            };
            const language = mapExtension[ext] ?? ext;
            const model = Monaco.editor.createModel(file.value, language, new Monaco.Uri().with({path: file.path}));
            if (file.path === selectedFile) {
                editor = Monaco.editor.create(divEl, {
                    model,
                    language,
                    fontSize,
                    minimap: {enabled: false},
                });
            }
        }

        if (editor === undefined) {
            throw new Error('selectedFile should be specify to properly create the editor');
        }

        editor.addAction({
            id: 'run',
            keybindings: [Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter],
            label: 'Run',
            run: () => {
                dispatch('run');
            },
        });

        editor.onKeyDown((event) => {
            if (event.keyCode === 49 /** KeyCode.KeyS */ && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                editor.getAction('editor.action.formatDocument')?.run();
                dispatch('save');
            }
        });

        // call on:change and apply debounce if specified
        editor.onDidChangeModelContent(() => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                dispatch('change', {path: selectedFile, value: editor.getValue()});
            }, debounce);
        });

        editor.onDidChangeCursorSelection((event) => {
            const model = editor.getModel();
            if (model === null) {
                return;
            }
            selection = model.getValueInRange(event.selection);
        });

        dispatch('ready', {editor, monaco: Monaco});
        return () => {
            editor.dispose();
        };
    });

    onDestroy(() => {
        Monaco?.editor.getModels().forEach((model) => {
            model.dispose();
        });
    });

    let sqlAutocomplete: monaco.IDisposable;
    $: if (Monaco) {
        if (sqlAutocomplete) {
            sqlAutocomplete.dispose();
        }
        sqlAutocomplete = addSqliteAutocomplete(Monaco, schema);
    }

    $: Monaco?.editor.setTheme(`${theme}-plus`);

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

    function onResize(width: number, height: number) {
        if (!editor) {
            return;
        }
        editor.layout({width, height});
    }
</script>

<div bind:this={divEl} class="editor" use:resize={onResize}></div>

<style>
    .editor {
        height: 100%;
        background-color: var(--color-bg-1); /* FIXME: not generic, should be a prop */
    }
</style>
