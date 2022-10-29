import { TodoistApi } from '@doist/todoist-api-typescript';

export interface TodoistDataAccessOptions {
  api: TodoistApi;
}

export class TodoistDataAccess {
  public constructor(private readonly options: TodoistDataAccessOptions) {}

  public async getComments(taskId: string) {
    const { api } = this.options;
    const rows = await api.getComments({ taskId });
    return rows;
  }

  public async getLabels() {
    const { api } = this.options;
    const rows = await api.getLabels();
    return rows;
  }

  public async getProjects() {
    const { api } = this.options;
    const rows = await api.getProjects();
    return rows;
  }

  public async getSections() {
    const { api } = this.options;
    const rows = await api.getSections();
    return rows;
  }

  public async getTasks() {
    const { api } = this.options;
    const rows = await api.getTasks();
    return rows;
  }
}
