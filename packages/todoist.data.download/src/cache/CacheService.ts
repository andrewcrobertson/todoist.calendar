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
    // await this.cacheComments(today);
    await this.cacheLabels(today);
    await this.cacheProjects(today);
    await this.cacheSections(today);
    await this.cacheTasks(today);
  }

  private async updateActive(activeCheckAt: string) {
    const { dbAccess } = this.options;
    const value = { active: boolToNumber(false), activeCheckAt };
    dbAccess.cacheCommentUpdateActiveSql(value);
    dbAccess.cacheLabelUpdateActiveSql(value);
    dbAccess.cacheProjectUpdateActiveSql(value);
    dbAccess.cacheSectionUpdateActiveSql(value);
    dbAccess.cacheTaskUpdateActiveSql(value);
  }

  private async cacheComments(activeCheckAt: string, taskId: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const comments = await todoistDataAccess.getComments(taskId);
    for (let i = 0; i < comments.length; i++) {
      const commentRaw = cacheMapper.mapComment(comments[i]);
      const comment = { ...commentRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.cacheCommentUpsert(comment);
    }
  }

  private async cacheLabels(activeCheckAt: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const labels = await todoistDataAccess.getLabels();
    for (let i = 0; i < labels.length; i++) {
      const labelRaw = cacheMapper.mapLabel(labels[i]);
      const label = { ...labelRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.cacheLabelUpsert(label);
    }
  }

  private async cacheProjects(activeCheckAt: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const projects = await todoistDataAccess.getProjects();
    for (let i = 0; i < projects.length; i++) {
      const projectRaw = cacheMapper.mapProject(projects[i]);
      const project = { ...projectRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.cacheProjectUpsert(project);
    }
  }

  private async cacheSections(activeCheckAt: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const sections = await todoistDataAccess.getSections();
    for (let i = 0; i < sections.length; i++) {
      const sectionRaw = cacheMapper.mapProject(sections[i]);
      const section = { ...sectionRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.cacheSectionUpsert(section);
    }
  }

  private async cacheTasks(activeCheckAt: string) {
    const { dbAccess, cacheMapper, todoistDataAccess } = this.options;
    const tasks = await todoistDataAccess.getTasks();
    for (let i = 0; i < tasks.length; i++) {
      const taskRaw = cacheMapper.mapTask(tasks[i]);
      const task = { ...taskRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.cacheTaskUpsert(task);
      if (task.commentCount > 0) {
        this.cacheComments(activeCheckAt, task.id);
      }
    }
  }
}
