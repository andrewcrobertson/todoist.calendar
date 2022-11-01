import type { Database } from 'better-sqlite3';
import { calendarSelectDateRangeSql } from './sql';

export interface IDataAccessOptions {
  database: Database;
}

export class DataAccess {
  public constructor(private readonly options: IDataAccessOptions) {}

  public getDateRange() {
    const statement = this.options.database.prepare(calendarSelectDateRangeSql);
    const rows = statement.all();
    return rows.length === 1 ? rows[0] : null;
  }
}
