// https://developer.todoist.com/rest/v2#overview
import 'dotenv/config';

import { getDateRange } from './calendar/utils';
import { calendarService, dbAccess, syncService } from './composition';
import { config } from './config';

const run = async () => {
  const { fromDate, toDate } = getDateRange(config.settings.months);
  dbAccess.runMigrations();
  await syncService.sync();
  await calendarService.update(fromDate, toDate);
};

run().catch((err) => console.log(err));
