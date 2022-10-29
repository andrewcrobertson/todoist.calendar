import { Database } from 'better-sqlite3';
import { cacheCommentInsertSql, cacheCommentUpdateActiveSql, cacheCommentUpdateSql } from './sqlStatements/cacheComment';
import { cacheLabelInsertSql, cacheLabelUpdateActiveSql, cacheLabelUpdateSql } from './sqlStatements/cacheLabel';
import { cacheProjectInsertSql, cacheProjectUpdateActiveSql, cacheProjectUpdateSql } from './sqlStatements/cacheProject';
import { cacheSectionInsertSql, cacheSectionUpdateActiveSql, cacheSectionUpdateSql } from './sqlStatements/cacheSection';
import { cacheTaskInsertSql, cacheTaskUpdateActiveSql, cacheTaskUpdateSql } from './sqlStatements/cacheTask';
import { cacheComment, cacheLabel, cacheProject, cacheSection, cacheTask } from './sqlStatements/tables';

export interface DbAccessOptions {
  database: Database;
}

export class DbAccess {
  private migrationsRun = false;

  public constructor(private readonly options: DbAccessOptions) {}

  public cacheCommentUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(cacheCommentUpdateActiveSql, project);
  }

  public cacheCommentUpsert(project: any) {
    this.runMigrations();
    this.upsert(cacheCommentUpdateSql, cacheCommentInsertSql, project);
  }

  public cacheLabelUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(cacheLabelUpdateActiveSql, project);
  }

  public cacheLabelUpsert(project: any) {
    this.runMigrations();
    this.upsert(cacheLabelUpdateSql, cacheLabelInsertSql, project);
  }

  public cacheProjectUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(cacheProjectUpdateActiveSql, project);
  }

  public cacheProjectUpsert(project: any) {
    this.runMigrations();
    this.upsert(cacheProjectUpdateSql, cacheProjectInsertSql, project);
  }

  public cacheSectionUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(cacheSectionUpdateActiveSql, project);
  }

  public cacheSectionUpsert(project: any) {
    this.runMigrations();
    this.upsert(cacheSectionUpdateSql, cacheSectionInsertSql, project);
  }

  public cacheTaskUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(cacheTaskUpdateActiveSql, project);
  }

  public cacheTaskUpsert(project: any) {
    this.runMigrations();
    this.upsert(cacheTaskUpdateSql, cacheTaskInsertSql, project);
  }

  public runMigrations() {
    if (this.migrationsRun) return;
    const { database } = this.options;
    database.prepare(cacheProject).run();
    database.prepare(cacheSection).run();
    database.prepare(cacheTask).run();
    database.prepare(cacheComment).run();
    database.prepare(cacheLabel).run();
    this.migrationsRun = true;
  }

  private updateActiveSql(updateSql: string, value: any) {
    const { database } = this.options;
    database.prepare(updateSql).run(value);
  }

  private upsert(updateSql: string, insertSql: string, value: any) {
    const { database } = this.options;
    const { changes } = database.prepare(updateSql).run(value);
    if (changes === 0) {
      database.prepare(insertSql).run(value);
    }
  }
}
