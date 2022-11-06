import 'dotenv/config';

import { LogLevel, WebClient } from '@slack/web-api';
import { join } from 'lodash';
import { apiService } from './composition';
import { config } from './config';

const run = async () => {
  const data = apiService.getInitialData();

  const lines = [];
  for (let i = 0; i < data.days.length; i++) {
    const day = data.days[i];
    lines.push(`*${day.value}*`);
    for (let j = 0; j < day.entries.length; j++) {
      const entry = day.entries[j];
      if (entry.time) {
        lines.push(`- ${entry.text} (_${entry.time}_)`);
      } else {
        lines.push(`- ${entry.text}`);
      }
    }
    lines.push(``);
  }

  const msg = join(lines, '\r\n');
  const client = new WebClient(config.slack.token, { logLevel: LogLevel.DEBUG });
  const channelId = config.settings.channelId;

  try {
    const result = await client.chat.postMessage({ channel: channelId, text: msg, mrkdwn: true });
    console.log(result.ok);
  } catch (error) {
    console.error(error);
  }
};

run();
