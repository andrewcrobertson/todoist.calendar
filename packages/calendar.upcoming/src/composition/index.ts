import Database from 'better-sqlite3';
import { config } from '../config';
import { ApiService } from '../upcoming/ApiService';
import { DataAccess } from '../upcoming/data/DataAccess';

const database = new Database(config.database.file);
const dataAccess = new DataAccess({ database });

const apiService = new ApiService({ dataAccess });

export { apiService };
