import { addWeeks, format } from 'date-fns';
import type { DataAccess } from './data/DataAccess';
import { toInitialData } from './mappers/toInitialData';

export interface IApiServiceOptions {
  dataAccess: DataAccess;
}

export class ApiService {
  public constructor(private readonly options: IApiServiceOptions) {}

  public getInitialData() {
    const { fromDate, toDate } = this.getDateRange(2);
    const rows = this.options.dataAccess.getEntries(fromDate, toDate);
    const initialData = toInitialData(rows);
    return initialData;
  }

  getDateRange(weeks: number) {
    const today = new Date();
    const toDateRaw = addWeeks(today, weeks);
    const fromDate = format(today, 'yyyy-MM-dd');
    const toDate = format(toDateRaw, 'yyyy-MM-dd');
    return { fromDate, toDate };
  }
}
