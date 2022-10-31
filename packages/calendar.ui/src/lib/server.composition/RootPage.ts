import { config } from '$lib/server.config';
import { ApiService } from '$lib/server.services/RootPage/ApiService';
import { DataAccess } from '$lib/server.services/RootPage/data/DataAccess';
import Database from 'better-sqlite3';

const database = new Database(config.db.path);
const dataAccess = new DataAccess({ database });

export const apiService = new ApiService({ dataAccess });
