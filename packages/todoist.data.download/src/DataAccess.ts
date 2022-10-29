import { TodoistApi } from '@doist/todoist-api-typescript';
import { filter, get } from 'lodash';
import { createCalendarEntry } from './utils/createCalendarEntry';
import { taskFilter } from './utils/taskFilter';

export interface DataAccessOptions {
  api: TodoistApi;
}

export class DataAccess {
  public constructor(private readonly options: DataAccessOptions) {}

  public async getData(calendarLabel: string, fromDate: string, toDate: string) {
    const { api } = this.options;
    const tasksRaw = await api.getTasks();
    const tasksFiltered = filter(tasksRaw, (t) => taskFilter(t, calendarLabel, fromDate, toDate));

    const output: any[] = [];
    for (let i = 0; i < tasksFiltered.length; i++) {
      const task = tasksFiltered[i];
      output.push(createCalendarEntry(task.content, task.due?.date, task.due?.datetime, task.priority));
      if (task.due?.isRecurring) {
        let dummyTask = await api.addTask({
          content: `- ${task.content}`,
          description: 'Dummy Task',
          dueString: task.due?.string,
          dueLang: get(task, ['due', 'lang'], 'en'),
          dueDate: task.due?.date,
          dueDatetime: task.due?.datetime ?? undefined,
        });

        for (let j = 0; j <= 31; j++) {
          await api.closeTask(dummyTask.id);
          dummyTask = await api.getTask(dummyTask.id);
          if ((dummyTask.due?.date ?? '') < toDate) {
            output.push(createCalendarEntry(task.content, dummyTask.due?.date, dummyTask.due?.datetime, task.priority));
          } else {
            await api.deleteTask(dummyTask.id);
            break;
          }
        }
      }
    }

    return output;
  }
}
