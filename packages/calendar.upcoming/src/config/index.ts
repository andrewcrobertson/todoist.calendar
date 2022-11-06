import path from 'path';

const dataPath = path.resolve(__dirname, '..', '..', '..', '__data');

export const config = {
  settings: {
    months: parseInt(process.env[`SETTINGS_WEEKS`], 10),
    channelId: process.env[`SETTINGS_CHANNEL_ID`],
  },
  slack: {
    token: process.env[`SLACK_TOKEN`],
  },
  database: {
    file: path.resolve(dataPath, 'todoist.db'),
  },
};
