import { DbAccess } from 'src/database/DbAccess';
import { TodoistDataAccess } from 'src/todoist/TodoistDataAccess';
import { SyncMapper } from './SyncMapper';
import { boolToNumber } from './util';

export interface SyncServiceOptions {
  dbAccess: DbAccess;
  syncMapper: SyncMapper;
  todoistDataAccess: TodoistDataAccess;
}

export class SyncService {
  public constructor(private readonly options: SyncServiceOptions) {}

  public async sync() {
    const today = new Date().toISOString();
    await this.setAllSyncItemsToInactive(today);
    await this.syncLabels(today);
    await this.syncProjects(today);
    await this.syncSections(today);
    await this.syncTasks(today);
  }

  private async setAllSyncItemsToInactive(activeCheckAt: string) {
    const { dbAccess } = this.options;
    const value = { active: boolToNumber(false), activeCheckAt };
    dbAccess.todoistCommentUpdateActiveSql(value);
    dbAccess.todoistLabelUpdateActiveSql(value);
    dbAccess.todoistProjectUpdateActiveSql(value);
    dbAccess.todoistSectionUpdateActiveSql(value);
    dbAccess.todoistTaskUpdateActiveSql(value);
  }

  private async syncComments(activeCheckAt: string, taskId: string) {
    const { dbAccess, syncMapper, todoistDataAccess } = this.options;
    const comments = await todoistDataAccess.getComments(taskId);
    for (let i = 0; i < comments.length; i++) {
      const commentRaw = syncMapper.mapComment(comments[i]);
      const comment = { ...commentRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistCommentUpsert(comment);
    }
  }

  private async syncLabels(activeCheckAt: string) {
    const { dbAccess, syncMapper, todoistDataAccess } = this.options;
    const labels = await todoistDataAccess.getLabels();
    for (let i = 0; i < labels.length; i++) {
      const labelRaw = syncMapper.mapLabel(labels[i]);
      const label = { ...labelRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistLabelUpsert(label);
    }
  }

  private async syncProjects(activeCheckAt: string) {
    const { dbAccess, syncMapper, todoistDataAccess } = this.options;
    const projects = await todoistDataAccess.getProjects();
    for (let i = 0; i < projects.length; i++) {
      const projectRaw = syncMapper.mapProject(projects[i]);
      const project = { ...projectRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistProjectUpsert(project);
    }
  }

  private async syncSections(activeCheckAt: string) {
    const { dbAccess, syncMapper, todoistDataAccess } = this.options;
    const sections = await todoistDataAccess.getSections();
    for (let i = 0; i < sections.length; i++) {
      const sectionRaw = syncMapper.mapProject(sections[i]);
      const section = { ...sectionRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistSectionUpsert(section);
    }
  }

  private async syncTasks(activeCheckAt: string) {
    const { dbAccess, syncMapper, todoistDataAccess } = this.options;
    const tasks = await todoistDataAccess.getTasks();
    for (let i = 0; i < tasks.length; i++) {
      const taskRaw = syncMapper.mapTask(tasks[i]);
      const task = { ...taskRaw, active: boolToNumber(true), activeCheckAt };
      dbAccess.todoistTaskUpsert(task);
      if (task.commentCount > 0) {
        this.syncComments(activeCheckAt, task.id);
      }
    }
  }
}
