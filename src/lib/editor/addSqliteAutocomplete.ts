import type monaco from 'monaco-editor';

const sqliteKeywords = [
    'SELECT',
    'FROM',
    'WHERE',
    'INSERT',
    'UPDATE',
    'DELETE',
    'CREATE',
    'TABLE',
    'DROP',
    'ALTER',
    'INDEX',
    'TRIGGER',
    'VIEW',
    'AS',
    'INTO',
    'VALUES',
    'AND',
    'OR',
    'NOT',
    'ORDER BY',
    'GROUP BY',
    'HAVING',
    'LIMIT',
    'OFFSET',
    'JOIN',
    'INNER',
    'LEFT',
    'RIGHT',
];

const sqliteFunctions = [
    'AVG',
    'COUNT',
    'MAX',
    'MIN',
    'SUM',
    'COALESCE',
    'IFNULL',
    'LENGTH',
    'LOWER',
    'UPPER',
    'SUBSTR',
    'TRIM',
    'ROUND',
    'ABS',
    'RANDOM',
    'DATETIME',
    'DATE',
    'TIME',
];

export type Schema = Record<string, string[]>;

export function addSqliteAutocomplete(Monaco: typeof monaco, schema: Schema) {
    return Monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems: (
            model: monaco.editor.ITextModel,
            position: monaco.Position,
        ): monaco.languages.ProviderResult<monaco.languages.CompletionList> => {
            const suggestions: monaco.languages.CompletionItem[] = [];
            const wordInfo = model.getWordUntilPosition(position);
            const wordRange = new Monaco.Range(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);

            for (const keyword of sqliteKeywords) {
                suggestions.push({
                    kind: Monaco.languages.CompletionItemKind.Keyword,
                    insertText: keyword,
                    label: keyword,
                    detail: 'SQLite keyword',
                    range: wordRange,
                });
            }
            for (const func of sqliteFunctions) {
                suggestions.push({
                    label: func,
                    kind: Monaco.languages.CompletionItemKind.Function,
                    insertText: func + '()',
                    detail: 'SQLite function',
                    insertTextRules: Monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: wordRange,
                });
            }

            for (const table of Object.keys(schema)) {
                suggestions.push({
                    label: table,
                    kind: Monaco.languages.CompletionItemKind.Class,
                    insertText: table,
                    detail: 'Table',
                    range: wordRange,
                });
                for (const column of schema[table]) {
                    suggestions.push({
                        label: column,
                        kind: Monaco.languages.CompletionItemKind.Field,
                        insertText: column,
                        detail: `Column of ${table}`,
                        range: wordRange,
                    });
                }
            }
            return {suggestions};
        },
    });
}
