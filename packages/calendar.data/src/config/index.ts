import path from 'path';

const dataPath = path.resolve(__dirname, '..', '..', '..', '__data');

export const config = {
  settings: {
    calendarLabel: process.env[`SETTINGS_CALENDAR_LABEL`],
    hideTimeLabel: process.env[`SETTINGS_HIDE_TIME_LABEL`],
    months: parseInt(process.env[`SETTINGS_MONTHS`], 10),
  },
  todoist: {
    authToken: process.env[`TODOIST_AUTH_TOKEN`],
  },
  database: {
    file: path.resolve(dataPath, 'todoist.db'),
  },
};
