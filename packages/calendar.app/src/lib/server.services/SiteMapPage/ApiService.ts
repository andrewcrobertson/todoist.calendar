import type { DataAccess } from './data/DataAccess';
import { toInitialData } from './mappers/toInitialData';

export interface IApiServiceOptions {
  dataAccess: DataAccess;
}

export class ApiService {
  public constructor(private readonly options: IApiServiceOptions) {}

  public getInitialData() {
    const row = this.options.dataAccess.getDateRange();
    const initialData = toInitialData(row);
    return initialData;
  }
}
