import { Task } from '@doist/todoist-api-typescript';
import { includes, isNil } from 'lodash';

export const taskFilter = (task: Task, calendarLabel: string, fromDate: string, toDate: string) => {
  if (task.isCompleted) return false;
  if (isNil(task.due)) return false;
  if (task.due.date < fromDate) return false;
  if (task.due.date > toDate) return false;
  if (!includes(task.labels, calendarLabel)) return false;
  return true;
};
