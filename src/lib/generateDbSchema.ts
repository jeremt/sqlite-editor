import type {DB, TableInfoColumn} from './sqlite/sqlite3';

export const getTableHeader = (db: DB, tableName: string): TableInfoColumn[] | undefined => {
    return db.exec(
        `WITH RECURSIVE
  fk_info(id, seq, table_name, from_col, to_table, to_col) AS (
    SELECT id, seq, "table", "from", "table", "to"
    FROM pragma_foreign_key_list('${tableName}')
  )
SELECT 
    c.*,
    fk.to_table AS fk_table,
    fk.to_col AS fk_column
FROM 
    pragma_table_info('${tableName}') c
LEFT JOIN 
    fk_info fk ON c.name = fk.from_col
ORDER BY 
    c.cid;`,
        {rowMode: 'object'},
    );
};

const getUniqueContrains = (db: DB, tableName: string) => {
    return db
        .exec(
            `SELECT
    ii.name AS column
FROM 
    sqlite_master AS m, 
    pragma_index_list(m.name) AS il, 
    pragma_index_info(il.name) AS ii 
WHERE 
    m.type = 'table' AND 
    il.origin = 'u' AND
    m.tbl_name = '${tableName}';`,
            {rowMode: 'object'},
        )
        .map((row: {column: string}) => row.column) as string[];
};

export const generateDbDump = (db: DB, includeData: boolean, tabSize = 4) => {
    const tableNames = db
        .exec(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;`, {rowMode: 'object'})
        .map((row: {name: string}) => row.name)
        .filter((name: string) => name !== 'sqlite_sequence') as string[];
    let dbSchema = tableNames
        .map((tableName) => {
            const uniques = getUniqueContrains(db, tableName);
            const header = getTableHeader(db, tableName)?.map((col) => ({
                ...col,
                unique: uniques.includes(col.name),
            }));
            if (!header) {
                return ``;
            }
            let tableSchema = `--- Create table ${tableName}\n`;
            tableSchema += `CREATE TABLE ${tableName} (\n`;
            tableSchema += header
                .map((column) =>
                    [
                        `${' '.repeat(tabSize)}${column.name}`, //
                        column.type,
                        column.pk === 1 ? 'PRIMARY KEY' : null, // TODO: find a way to add autoincrement
                        column.notnull ? 'NOT NULL' : null,
                        column.unique ? 'UNIQUE' : null,
                        column.dflt_value !== null ? `DEFAULT ${column.dflt_value}` : null,
                        column.fk_table && column.fk_column ? `REFERENCES ${column.fk_table}(${column.fk_column})` : null,
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
                    if (!rows[0]) {
                        return '';
                    }
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
};
