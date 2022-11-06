import { WebClient } from '@slack/web-api';
import { addWeeks, format } from 'date-fns';
import type { DataAccess } from '../database/DataAccess';
import { UpcomingMapper } from './UpcomingMapper';

export interface IUpcomingServiceOptions {
  weeks: number;
  channelId: string;
  client: WebClient;
  dataAccess: DataAccess;
  mapper: UpcomingMapper;
}

export class UpcomingService {
  public constructor(private readonly options: IUpcomingServiceOptions) {}

  public async post() {
    const { weeks, channelId, dataAccess, mapper, client } = this.options;
    const { fromDate, toDate } = this.getDateRange(weeks);
    const rows = dataAccess.getEntries(fromDate, toDate);
    const text = mapper.toMessage(rows);
    const result = await client.chat.postMessage({ channel: channelId, text, mrkdwn: true });
    return result;
  }

  private getDateRange(weeks: number) {
    const today = new Date();
    const toDateRaw = addWeeks(today, weeks);
    const fromDate = format(today, 'yyyy-MM-dd');
    const toDate = format(toDateRaw, 'yyyy-MM-dd');
    return { fromDate, toDate };
  }
}
