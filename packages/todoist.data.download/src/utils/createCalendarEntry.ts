import { parseDate } from './parseDate';
import { parseTime } from './parseTime';

type nilString = string | null | undefined;

export const createCalendarEntry = (name: string, date: nilString, dateTime: nilString, priority: number) => {
  const { yearAndMonth, day } = parseDate(date);
  const time = parseTime(dateTime);
  return { name, yearAndMonth, day, time, priority };
};
