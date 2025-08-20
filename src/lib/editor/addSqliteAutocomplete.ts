import type monaco from 'monaco-editor';

const sqliteKeywords = [
    'SELECT',
    'DISTINCT',
    'FROM',
    'WHERE',
    'IN',
    'LIKE',
    'REGEXP',
    'INSERT INTO',
    'ON CONFLICT',
    'UPDATE',
    'SET',
    'DELETE FROM',
    'CREATE TABLE',
    'DROP TABLE',
    'ALTER TABLE',
    'CREATE INDEX',
    'DROP INDEX',
    'CREATE TRIGGER',
    'DROP TRIGGER',
    'CREATE VIEW',
    'DROP VIEW',
    'AS',
    'VALUES',
    'AND',
    'OR',
    'NOT',
    'ORDER BY',
    'ASC',
    'DESC',
    'GROUP BY',
    'HAVING',
    'LIMIT',
    'OFFSET',
    'JOIN',
    'INNER JOIN',
    'LEFT JOIN',
    'RIGHT JOIN',
    'RETURNING',
    'PRIMARY KEY',
    'FOREIGN KEY',
    'REFERENCES',
    'DEFAULT',
    'UNIQUE',
    'CHECK',
    'NOT NULL',
    'TEXT',
    'INTEGER',
    'BLOB',
    'REAL',
    'NUMERIC',
    'DATETIME',
    'CURRENT_TIMESTAMP',
    'IF NOT EXISTS',
    'IF EXISTS',
    'CASE WHEN THEN ELSE END',
    'CASCADE',
    'RECURSIVE',
    'UNION ALL',
    'INTERSECT',
    'EXCEPT',
    'WITH',
    'EXPLAIN',
    'RAISE',
    'PRAGMA',
    'AUTOINCREMENT'
];

const sqliteFunctions = [
    {
        category: 'Aggregate Function',
        functions: ['avg(X)', 'count(*)', 'count(X)', 'group_concat(X)', 'group_concat(X,Y)', 'max(X)', 'min(X)', 'sum(X)', 'total(X)'],
    },
    {
        category: 'Mathematical Function',
        functions: ['abs(X)', 'round(X)', 'round(X,Y)', 'random()', 'mod(X,Y)', 'pow(X,Y)', 'sqrt(X)', 'ceil(X)', 'floor(X)', 'trunc(X)', 'sign(X)'],
    },
    {
        category: 'String Function',
        functions: [
            'length(X)',
            'lower(X)',
            'upper(X)',
            'trim(X)',
            'ltrim(X)',
            'rtrim(X)',
            'substr(X,Y,Z)',
            'instr(X,Y)',
            'replace(X,Y,Z)',
            'printf(FORMAT,...)',
            'char(X1,X2,...,XN)',
            'hex(X)',
            'quote(X)',
            'glob(X,Y)',
        ],
    },
    {
        category: 'Date and Time Function',
        functions: [
            'date(timestring, modifier, modifier, ...)',
            'time(timestring, modifier, modifier, ...)',
            'datetime(timestring, modifier, modifier, ...)',
            'julianday(timestring, modifier, modifier, ...)',
            'strftime(format, timestring, modifier, modifier, ...)',
            'unixepoch(timestring, modifier, modifier, ...)',
        ],
    },
    {
        category: 'Type Conversion Functions',
        functions: ['typeof(X)', 'coalesce(X,Y,...)', 'ifnull(X,Y)', 'nullif(X,Y)', 'cast(X AS type)'],
    },
    {
        category: 'Window Function',
        functions: [
            'row_number()',
            'rank()',
            'dense_rank()',
            'percent_rank()',
            'cume_dist()',
            'ntile(N)',
            'lag(X)',
            'lag(X,offset)',
            'lag(X,offset,default)',
            'lead(X)',
            'lead(X,offset)',
            'lead(X,offset,default)',
            'first_value(X)',
            'last_value(X)',
            'nth_value(X,N)',
        ],
    },
    {
        category: 'JSON Function',
        functions: [
            'json(X)',
            'json_array(X1,X2,...)',
            'json_object(X1,Y1,X2,Y2,...)',
            'json_extract(X,P1,P2,...)',
            'json_insert(X,P1,V1,P2,V2,...)',
            'json_replace(X,P1,V1,P2,V2,...)',
            'json_set(X,P1,V1,P2,V2,...)',
            'json_remove(X,P1,P2,...)',
            'json_type(X)',
            'json_valid(X)',
            'json_quote(X)',
            'json_group_array(X)',
            'json_group_object(N,V)',
            'json_each(X)',
            'json_tree(X)',
        ],
    },
    {
        category: 'Other Function',
        functions: [
            'last_insert_rowid()',
            'changes()',
            'total_changes()',
            'sqlite_version()',
            'sqlite_source_id()',
            'sqlite_compileoption_used(X)',
            'sqlite_compileoption_get(N)',
            'load_extension(X)',
            'zeroblob(N)',
            'index_list(T)',
            'table_info(T)',
        ],
    },
];

export type Schema = Record<string, string[]>;

export const addSqliteAutocomplete = (Monaco: typeof monaco, schema: Schema) => {
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
                    detail: 'Keyword',
                    range: wordRange,
                });
            }
            for (const {category, functions} of sqliteFunctions) {
                for (const func of functions) {
                    suggestions.push({
                        label: func,
                        kind: Monaco.languages.CompletionItemKind.Function,
                        insertText: func,
                        detail: category,
                        insertTextRules: Monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        range: wordRange,
                    });
                }
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
};
