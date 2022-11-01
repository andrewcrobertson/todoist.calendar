import { prerendering } from '$app/environment';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = prerendering ? path.resolve(process.cwd(), '..', '..') : path.resolve(__dirname, '..', '..', '..', '..', '..');
const dataPath = path.resolve(rootPath, '__data', 'todoist.db');

export const config = { db: { path: dataPath } };
