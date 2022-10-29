import { Database } from 'better-sqlite3';
import { cacheComment, cacheLabel, cacheProject, cacheSection, cacheTask } from './sqlStatements/tables';

export interface DbAccessOptions {
  database: Database;
}

export class DbAccess {
  private dbCreated = false;

  public constructor(private readonly options: DbAccessOptions) {}

  public runMigrations() {
    this.ensureDb();
  }

  private ensureDb() {
    if (this.dbCreated) return;
    const { database } = this.options;
    database.prepare(cacheProject).run();
    database.prepare(cacheSection).run();
    database.prepare(cacheTask).run();
    database.prepare(cacheComment).run();
    database.prepare(cacheLabel).run();
    this.dbCreated = true;
  }
}
