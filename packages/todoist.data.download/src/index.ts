// https://developer.todoist.com/rest/v2#overview
import 'dotenv/config';

import { TodoistApi } from '@doist/todoist-api-typescript';
import Database from 'better-sqlite3';
import path from 'path';
import { DataAccess } from './DataAccess';
import { DbAccess } from './database/DbAccess';
import { Mapper } from './Mapper';
import { getDateRange } from './utils/getDateRange';

const dataPath = path.resolve(__dirname, '..', '..', '..', '__data');

const config = {
  settings: {
    calendarLabel: process.env[`SETINGS_CALENDAR_LABEL`],
    months: parseInt(process.env[`SETTINGS_MONTHS`], 10),
  },
  todoist: {
    authToken: process.env[`TODOIST_AUTH_TOKEN`],
  },
  database: {
    file: path.resolve(dataPath, 'todoist.db'),
  },
};

const run = async () => {
  const api = new TodoistApi(config.todoist.authToken);
  const dataAccess = new DataAccess({ api });
  const mapper = new Mapper({});
  console.log(config.database.file);
  const database = new Database(config.database.file);
  const dbAccess = new DbAccess({ database });
  dbAccess.runMigrations();
  return;
  const { fromDate, toDate } = getDateRange(config.settings.months);
  const data: any[] = await dataAccess.getData(config.settings.calendarLabel, fromDate, toDate);

  const calendarEntries = mapper.map(data);
  console.log(JSON.stringify(calendarEntries, null, 2));
};

run().catch((err) => console.log(err));
