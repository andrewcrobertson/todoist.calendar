import { LogLevel, WebClient } from '@slack/web-api';
import Database from 'better-sqlite3';
import { config } from '../config';
import { DataAccess } from '../database/DataAccess';
import { UpcomingMapper } from '../upcoming/UpcomingMapper';
import { UpcomingService } from '../upcoming/UpcomingService';

const weeks = config.settings.weeks;
const channelId = config.settings.channelId;
const database = new Database(config.database.file);
const dataAccess = new DataAccess({ database });
const mapper = new UpcomingMapper();
const client = new WebClient(config.slack.token, { logLevel: LogLevel.DEBUG });
const upcomingService = new UpcomingService({ weeks, channelId, dataAccess, mapper, client });

export { upcomingService };
