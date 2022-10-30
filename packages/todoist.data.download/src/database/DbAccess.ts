import { Database } from 'better-sqlite3';
import { todoistComment, todoistLabel, todoistProject, todoistSection, todoistTask } from './sqlStatements/tables';
import { todoistCommentInsertSql, todoistCommentUpdateActiveSql, todoistCommentUpdateSql } from './sqlStatements/todoistComment';
import { todoistLabelInsertSql, todoistLabelUpdateActiveSql, todoistLabelUpdateSql } from './sqlStatements/todoistLabel';
import { todoistProjectInsertSql, todoistProjectUpdateActiveSql, todoistProjectUpdateSql } from './sqlStatements/todoistProject';
import { todoistSectionInsertSql, todoistSectionUpdateActiveSql, todoistSectionUpdateSql } from './sqlStatements/todoistSection';
import { todoistTaskInsertSql, todoistTaskUpdateActiveSql, todoistTaskUpdateSql } from './sqlStatements/todoistTask';

export interface DbAccessOptions {
  database: Database;
}

export class DbAccess {
  private migrationsRun = false;

  public constructor(private readonly options: DbAccessOptions) {}

  public todoistCommentUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(todoistCommentUpdateActiveSql, project);
  }

  public todoistCommentUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistCommentUpdateSql, todoistCommentInsertSql, project);
  }

  public todoistLabelUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(todoistLabelUpdateActiveSql, project);
  }

  public todoistLabelUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistLabelUpdateSql, todoistLabelInsertSql, project);
  }

  public todoistProjectUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(todoistProjectUpdateActiveSql, project);
  }

  public todoistProjectUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistProjectUpdateSql, todoistProjectInsertSql, project);
  }

  public todoistSectionUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(todoistSectionUpdateActiveSql, project);
  }

  public todoistSectionUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistSectionUpdateSql, todoistSectionInsertSql, project);
  }

  public todoistTaskUpdateActiveSql(project: any) {
    this.runMigrations();
    this.updateActiveSql(todoistTaskUpdateActiveSql, project);
  }

  public todoistTaskUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistTaskUpdateSql, todoistTaskInsertSql, project);
  }

  public runMigrations() {
    if (this.migrationsRun) return;
    const { database } = this.options;
    database.prepare(todoistProject).run();
    database.prepare(todoistSection).run();
    database.prepare(todoistTask).run();
    database.prepare(todoistComment).run();
    database.prepare(todoistLabel).run();
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
