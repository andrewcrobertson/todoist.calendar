import { Task } from '@doist/todoist-api-typescript';
import { compact, first, get, includes, isNil, last, split } from 'lodash';
import { DbAccess } from '../database/DbAccess';
import { TodoistDataAccess } from '../todoist/TodoistDataAccess';
import { boolToNumber } from '../utils';
import { isValidTask, parseDate } from './utils';

export interface CalendarServiceOptions {
  calendarLabel: string;
  todoistDataAccess: TodoistDataAccess;
  dbAccess: DbAccess;
}

export class CalendarService {
  public constructor(private readonly options: CalendarServiceOptions) {}

  public async update(fromDate: string, toDate: string) {
    await this.removeFutureEvents(fromDate);
    await this.processTasks(fromDate, toDate);
  }

  private async removeFutureEvents(fromDate: string) {
    const { dbAccess } = this.options;
    dbAccess.calendarDelete(fromDate);
  }

  private async processTasks(fromDate: string, toDate: string) {
    const { todoistDataAccess } = this.options;
    const tasks = await todoistDataAccess.getTasks();
    for (let i = 0; i < tasks.length; i++) {
      await this.processTask(tasks[i], fromDate, toDate);
    }
  }

  private async processTask(task: Task, fromDate: string, toDate: string) {
    const { dbAccess, calendarLabel } = this.options;

    if (!isValidTask(task, fromDate, toDate)) return;
    const taskDates = await this.getTaskDates(task, toDate);
    for (let i = 0; i < taskDates.length; i++) {
      const { year, month, day, date, time } = parseDate(taskDates[i]);
      const show = boolToNumber(includes(task.labels, calendarLabel));
      const entry = { year, month, day, date, time, taskId: task.id, text: task.content, show };
      dbAccess.calendarInsert(entry);
    }
  }

  private async getTaskDates(task: Task, toDate: string) {
    const date = task.due?.datetime ?? task.due?.date ?? null;
    if (date === null) return [];
    if (task.due?.isRecurring) {
      const dates = await this.getTaskDatesRecurring(task, toDate);
      return dates;
    } else {
      return [date];
    }
  }

  private async getTaskDatesRecurring(task: Task, toDate: string) {
    const { dbAccess, todoistDataAccess } = this.options;

    const taskId = task.id;
    const dueString = task.due?.string;

    const dates = await this.getTaskDatesRecurringFromMemo(task);
    const currentDate = last(dates);
    if (currentDate !== null && currentDate < toDate) {
      let dummyTask = await this.createDummyTask(task, currentDate);
      for (let j = 0; j <= 100; j++) {
        await todoistDataAccess.closeTask(dummyTask.id);
        dummyTask = await todoistDataAccess.getTask(dummyTask.id);
        const hasDate = !isNil(dummyTask.due?.date);
        const currentDate = last(dates);
        const nextDate = dummyTask.due?.datetime ?? dummyTask.due?.date ?? null;
        dbAccess.memoRecurringTaskDateUpsert({ taskId, dueString, currentDate, nextDate });

        if (hasDate && (dummyTask.due?.date ?? '') < toDate) {
          dates.push(nextDate);
        } else {
          await todoistDataAccess.deleteTask(dummyTask.id);
          break;
        }
      }
    }

    return compact(dates);
  }

  private async getTaskDatesRecurringFromMemo(task: Task) {
    const { dbAccess } = this.options;

    const date = task.due?.datetime ?? task.due?.date ?? null;
    const taskId = task.id;
    const dueString = task.due?.string;

    const dates: string[] = [date];
    for (let j = 0; j <= 100; j++) {
      const currentDate = last(dates);
      const memo = dbAccess.memoRecurringTaskDateSelect({ taskId, dueString, currentDate });
      if (memo === null) {
        return dates;
      } else {
        dates.push(memo.nextDate);
      }
    }
  }

  private async createDummyTask(task: Task, currentDate: string) {
    const { todoistDataAccess } = this.options;

    const includesTime = includes(currentDate, 'T');
    const dummyTask = await todoistDataAccess.addTask({
      content: `Dummy Task - ${task.content}`,
      description: 'Dummy Task',
      dueString: task.due?.string,
      dueLang: get(task, ['due', 'lang'], 'en'),
      dueDate: first(split(currentDate, 'T')),
      dueDatetime: includesTime ? currentDate : undefined,
    });

    return dummyTask;
  }
}
