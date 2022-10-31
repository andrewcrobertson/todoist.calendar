import { TodoistApi } from '@doist/todoist-api-typescript';
import Database from 'better-sqlite3';
import { CalendarService } from '../calendar/CalendarService';
import { config } from '../config';
import { DbAccess } from '../database/DbAccess';
import { SyncMapper } from '../sync/SyncMapper';
import { SyncService } from '../sync/SyncService';
import { TodoistDataAccess } from '../todoist/TodoistDataAccess';

const api = new TodoistApi(config.todoist.authToken);
const database = new Database(config.database.file);
const dbAccess = new DbAccess({ database });
const todoistDataAccess = new TodoistDataAccess({ api });
const syncMapper = new SyncMapper();
const syncService = new SyncService({ syncMapper, dbAccess, todoistDataAccess });
const calendarService = new CalendarService({ dbAccess, todoistDataAccess });

export { dbAccess, calendarService, syncService };
