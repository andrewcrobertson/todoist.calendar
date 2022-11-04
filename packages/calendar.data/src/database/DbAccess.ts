import { Database } from 'better-sqlite3';
import { calendarDeleteSql, calendarInsertSql, calendarUpdateSql } from './sqlStatements/calendar';
import {
  memoRecurringTaskDateDeleteSql,
  memoRecurringTaskDateInsertSql,
  memoRecurringTaskDateSelectSql,
  memoRecurringTaskDateUpdateSql,
} from './sqlStatements/memoRecurringTaskDate';
import { calendar, memoRecurringTaskDate, todoistComment, todoistLabel, todoistProject, todoistSection, todoistTask } from './sqlStatements/tables';
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

  public calendarDelete(afterDate: string) {
    this.runMigrations();
    this.runSql(calendarDeleteSql, { afterDate });
  }

  public calendarUpsert(value: any) {
    this.runMigrations();
    this.upsert(calendarUpdateSql, calendarInsertSql, value);
  }

  public memoRecurringTaskDateDelete(value: any) {
    this.runMigrations();
    this.runSql(memoRecurringTaskDateDeleteSql, value);
  }

  public memoRecurringTaskDateSelect(value: any) {
    this.runMigrations();
    const rows = this.allSql(memoRecurringTaskDateSelectSql, value);
    return rows.length === 0 ? null : rows[0];
  }

  public memoRecurringTaskDateUpsert(value: any) {
    this.runMigrations();
    this.upsert(memoRecurringTaskDateUpdateSql, memoRecurringTaskDateInsertSql, value);
  }

  public todoistCommentUpdateActiveSql(project: any) {
    this.runMigrations();
    this.runSql(todoistCommentUpdateActiveSql, project);
  }

  public todoistCommentUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistCommentUpdateSql, todoistCommentInsertSql, project);
  }

  public todoistLabelUpdateActiveSql(project: any) {
    this.runMigrations();
    this.runSql(todoistLabelUpdateActiveSql, project);
  }

  public todoistLabelUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistLabelUpdateSql, todoistLabelInsertSql, project);
  }

  public todoistProjectUpdateActiveSql(project: any) {
    this.runMigrations();
    this.runSql(todoistProjectUpdateActiveSql, project);
  }

  public todoistProjectUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistProjectUpdateSql, todoistProjectInsertSql, project);
  }

  public todoistSectionUpdateActiveSql(project: any) {
    this.runMigrations();
    this.runSql(todoistSectionUpdateActiveSql, project);
  }

  public todoistSectionUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistSectionUpdateSql, todoistSectionInsertSql, project);
  }

  public todoistTaskUpdateActiveSql(project: any) {
    this.runMigrations();
    this.runSql(todoistTaskUpdateActiveSql, project);
  }

  public todoistTaskUpsert(project: any) {
    this.runMigrations();
    this.upsert(todoistTaskUpdateSql, todoistTaskInsertSql, project);
  }

  public runMigrations() {
    if (this.migrationsRun) return;
    const { database } = this.options;
    database.prepare(memoRecurringTaskDate).run();
    database.prepare(calendar).run();
    database.prepare(todoistProject).run();
    database.prepare(todoistSection).run();
    database.prepare(todoistTask).run();
    database.prepare(todoistComment).run();
    database.prepare(todoistLabel).run();
    this.migrationsRun = true;
  }

  private runSql(sql: string, value: any) {
    const { database } = this.options;
    const result = database.prepare(sql).run(value);
    return result;
  }

  private allSql(sql: string, value: any) {
    const { database } = this.options;
    const result = database.prepare(sql).all(value);
    return result;
  }

  private upsert(updateSql: string, insertSql: string, value: any) {
    const { changes } = this.runSql(updateSql, value);
    if (changes === 0) {
      this.runSql(insertSql, value);
    }
  }
}
