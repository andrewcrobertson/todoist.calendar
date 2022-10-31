import { Task, TodoistApi } from '@doist/todoist-api-typescript';

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

  public async addTask(task: Task) {
    const { api } = this.options;
    const rows = await api.addTask(task);
    return rows;
  }

  public async closeTask(id: string) {
    const { api } = this.options;
    const closed = await api.closeTask(id);
    return closed;
  }

  public async getTask(id: string) {
    const { api } = this.options;
    const task = await api.getTask(id);
    return task;
  }

  public async deleteTask(id: string) {
    const { api } = this.options;
    const deleted = await api.deleteTask(id);
    return deleted;
  }
}
