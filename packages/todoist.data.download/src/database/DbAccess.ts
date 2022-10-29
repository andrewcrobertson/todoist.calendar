import { Database } from 'better-sqlite3';
import { commentSql, labelSql, projectSql, sectionSql, taskSql } from './sql';

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
    database.prepare(projectSql).run();
    database.prepare(sectionSql).run();
    database.prepare(taskSql).run();
    database.prepare(commentSql).run();
    database.prepare(labelSql).run();
    this.dbCreated = true;
  }
}
