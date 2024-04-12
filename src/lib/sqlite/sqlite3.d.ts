export declare class DB {
    constructor(filename: string, flags: string);
    exec(sql: string, options: {rowMode: string});
}

export interface SQLite3 {
    oo1: {
        DB: typeof DB;
    };
}

/**
 * Represent one row returned by `PRAGMA table_info('table');`
 */
export interface TableInfoColumn {
    cid: number;
    dflt_value?: string;
    name: string;
    notnull: 0 | 1;
    pk: 1 | 0;
    type: string;
}
