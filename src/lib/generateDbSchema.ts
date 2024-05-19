import type {DB, TableInfoColumn} from './sqlite/sqlite3';

export function getTableHeader(db: DB, tableName: string): TableInfoColumn[] | undefined {
    return db?.exec(`PRAGMA table_info('${tableName}');`, {rowMode: 'object'});
}

export function generateDbSchema(db: DB, includeData: boolean, tabSize = 4) {
    const tableNames = db
        .exec(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;`, {rowMode: 'object'})
        .map((row: {name: string}) => row.name)
        .filter((name: string) => name !== 'sqlite_sequence') as string[];
    let dbSchema = tableNames
        .map((tableName) => {
            const header = getTableHeader(db, tableName);
            if (!header) {
                return ``;
            }
            let tableSchema = `--- Create table ${tableName}\n`;
            tableSchema += `CREATE TABLE ${tableName} (\n`;
            tableSchema += header
                .map((column) =>
                    [
                        ' '.repeat(tabSize),
                        column.name, //
                        column.type,
                        column.pk === 1 ? 'PRIMARY KEY' : null, // TODO: find a way to add autoincrement
                        column.notnull ? 'NOT NULL' : null,
                        column.dflt_value !== null ? `DEFAULT ${column.dflt_value}` : null,
                    ]
                        .filter((c) => c !== null)
                        .join(' '),
                )
                .join(',\n');
            tableSchema += '\n);\n';
            return tableSchema;
        })
        .join('\n');
    if (includeData) {
        dbSchema +=
            '\n' +
            tableNames
                .map((tableName) => {
                    const rows = db.exec(`SELECT * from "${tableName}"`, {rowMode: 'object'}) as Record<string, unknown>[];
                    let insertSchema = `--- Add some data to ${tableName}\n`;
                    const columns = Object.keys(rows[0]);
                    insertSchema += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES\n`;
                    insertSchema += rows
                        .map(
                            (row) =>
                                `${' '.repeat(tabSize)}(${columns
                                    .map((col) => {
                                        const rowValue = row[col];
                                        return typeof rowValue === 'string' ? `'${rowValue}'` : rowValue;
                                    })
                                    .join(', ')})`,
                        )
                        .join(',\n');
                    insertSchema += ';\n';
                    return insertSchema;
                })
                .join('\n');
    }
    return dbSchema;
}
