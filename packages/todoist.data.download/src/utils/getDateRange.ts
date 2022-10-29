import { addMonths, format } from 'date-fns';

export const getDateRange = (months: number) => {
  const today = new Date();
  const fromDateRaw = new Date(today.getFullYear(), today.getMonth(), 1);
  const toDateRaw = addMonths(fromDateRaw, months);
  const fromDate = format(fromDateRaw, 'yyyy-MM-dd');
  const toDate = format(toDateRaw, 'yyyy-MM-dd');
  return { fromDate, toDate };
};
