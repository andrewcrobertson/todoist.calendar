import { DbAccess } from 'src/database/DbAccess';
import { TodoistDataAccess } from 'src/todoist/TodoistDataAccess';
import { CacheMapper } from './CacheMapper';
import { boolToNumber } from './util';

export interface CacheServiceOptions {
  dbAccess: DbAccess;
  cacheMapper: CacheMapper;
  todoistDataAccess: TodoistDataAccess;
}

export class CacheService {
  public constructor(private readonly options: CacheServiceOptions) {}

  public async cache() {
    const today = new Date().toISOString();
    await this.updateActive(today);
    // await this.todoistComments(today);
    await this.todoistLabels(today);
    await this.todoistProjects(today);
    await this.todoistSections(today);
    await this.todoistTasks(today);
  }

  private async updateActive(activeCheckAt: string) {
    const { dbAccess } = this.options;
    const value = { active: boolToNumber(false), activeCheckAt };
    dbAccess.todoistCommentUpdateActiveSql(value);
    dbAccess.todoistLabelUpdateActiveSql(value);
    dbAccess.todoistProjectUpdateActiveSql(value);
    dbAccess.todoistSectionUpdateActiveSql(value);
    dbAccess.todoistTaskUpdateActiveSql(value);
  }

  private async todoistComments(activeCheckAt: string, taskId: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const comments = await todoistDataAccess.getComments(taskId);
    for (let i = 0; i < comments.length; i++) {
      const commentRaw = cacheMapper.mapComment(comments[i]);
      const comment = { ...commentRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistCommentUpsert(comment);
    }
  }

  private async todoistLabels(activeCheckAt: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const labels = await todoistDataAccess.getLabels();
    for (let i = 0; i < labels.length; i++) {
      const labelRaw = cacheMapper.mapLabel(labels[i]);
      const label = { ...labelRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistLabelUpsert(label);
    }
  }

  private async todoistProjects(activeCheckAt: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const projects = await todoistDataAccess.getProjects();
    for (let i = 0; i < projects.length; i++) {
      const projectRaw = cacheMapper.mapProject(projects[i]);
      const project = { ...projectRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistProjectUpsert(project);
    }
  }

  private async todoistSections(activeCheckAt: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const sections = await todoistDataAccess.getSections();
    for (let i = 0; i < sections.length; i++) {
      const sectionRaw = cacheMapper.mapProject(sections[i]);
      const section = { ...sectionRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistSectionUpsert(section);
    }
  }

  private async todoistTasks(activeCheckAt: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const tasks = await todoistDataAccess.getTasks();
    for (let i = 0; i < tasks.length; i++) {
      const taskRaw = cacheMapper.mapTask(tasks[i]);
      const task = { ...taskRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistTaskUpsert(task);
      if (task.commentCount > 0) {
        this.todoistComments(activeCheckAt, task.id);
      }
    }
  }
}
