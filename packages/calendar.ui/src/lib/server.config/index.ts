import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
//const rootPath = prerendering ? path.resolve(__dirname, '..', '..', '..', '..', '..', '..') : path.resolve(__dirname, '..', '..', '..', '..', '..');
const rootPath = path.resolve(__dirname, '..', '..', '..', '..', '..');
const dataPath = path.resolve(rootPath, '__data', 'todoist.db');
console.log(dataPath);

export const config = { db: { path: dataPath } };
