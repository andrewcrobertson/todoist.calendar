import { Task } from '@doist/todoist-api-typescript';
import { addMonths, format } from 'date-fns';
import { isNil, split, startsWith } from 'lodash';

export const dummyTaskText = 'Dummy Task';

type nilString = string | null | undefined;

export const parseDate = (dateTime: nilString) => {
  const dateTimeTokens = split(dateTime, 'T');
  const date = dateTimeTokens[0];
  const timeRaw = dateTimeTokens.length === 1 ? null : dateTimeTokens[1];

  const dateTokens = split(date, '-');
  const year = parseInt(dateTokens[0], 10);
  const month = parseInt(dateTokens[1], 10);
  const day = parseInt(dateTokens[2], 10);
  const time = timeRaw === null ? null : parseTime(timeRaw);

  return { year, month, day, date, time };
};

export const parseTime = (timeStr: string) => {
  const timeTokens = split(timeStr, ':');
  const time = `${timeTokens[0]}:${timeTokens[1]}`;
  return time;
};

export const getDateRange = (months: number) => {
  const today = new Date();
  const fromDateRaw = new Date(today.getFullYear(), today.getMonth(), 1);
  const toDateRaw = addMonths(fromDateRaw, months);
  const fromDate = format(fromDateRaw, 'yyyy-MM-dd');
  const toDate = format(toDateRaw, 'yyyy-MM-dd');
  return { fromDate, toDate };
};

export const isValidTask = (task: Task, fromDate: string, toDate: string) => {
  if (startsWith(task.content, dummyTaskText)) return false;
  if (task.description === dummyTaskText) return false;
  if (task.isCompleted) return false;
  if (isNil(task.due)) return false;
  if (task.due.date < fromDate) return false;
  if (task.due.date > toDate) return false;
  return true;
};
