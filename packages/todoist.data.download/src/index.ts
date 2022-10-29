import 'dotenv/config';

import { TodoistApi } from '@doist/todoist-api-typescript';
import { DataAccess } from './DataAccess';
import { Mapper } from './Mapper';
import { getDateRange } from './utils/getDateRange';

const calendarLabel = 'calendar';
const months = 2;

const config = {
  todoist: {
    authToken: process.env[`TODOIST_AUTH_TOKEN`],
  },
};

const run = async () => {
  const api = new TodoistApi(config.todoist.authToken);
  const dataAccess = new DataAccess({ api });
  const mapper = new Mapper({});

  const { fromDate, toDate } = getDateRange(months);
  const data: any[] = await dataAccess.getData(calendarLabel, fromDate, toDate);
  console.log(data);

  const calendarEntries = mapper.map(data);
  console.log(JSON.stringify(calendarEntries, null, 2));
};

run().catch((err) => console.log(err));
