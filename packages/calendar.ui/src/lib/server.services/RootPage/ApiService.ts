import type { DataAccess } from './data/DataAccess';
import { toInitialData } from './mappers/toInitialData';

export interface IApiServiceOptions {
	dataAccess: DataAccess;
}

export class ApiService {
	public constructor(private readonly options: IApiServiceOptions) {}

	public getInitialData(year: number, month: number) {
		const rows = this.options.dataAccess.getEntries(year, month);
		const initialData = toInitialData({ year, month, rows });
		return initialData;
	}
}
