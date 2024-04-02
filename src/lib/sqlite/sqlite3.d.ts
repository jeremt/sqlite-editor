declare class DB {
  constructor(filename: string, flags: string);
  exec(sql: string, options: { rowMode: string });
}
export interface SQLite3 {
  capi: {
    sqlite3_js_kvvfs_clear(): void;
  };
  oo1: {
    DB: typeof DB;
  };
}
function sqlite3InitModule(): Promise<SQLite3>;
export default sqlite3InitModule;
