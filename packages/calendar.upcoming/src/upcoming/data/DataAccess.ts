import type { Database } from 'better-sqlite3';
import { calendarSelectEntriesSql } from './sql';

export interface IDataAccessOptions {
  database: Database;
}

export class DataAccess {
  public constructor(private readonly options: IDataAccessOptions) {}

  public getEntries(fromDate: string, toDate: string) {
    const show = 1;
    const statement = this.options.database.prepare(calendarSelectEntriesSql);
    return statement.all({ show, fromDate, toDate });
  }
}
