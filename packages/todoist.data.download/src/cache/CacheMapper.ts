import { Label, Project, Section } from '@doist/todoist-api-typescript';
import { boolToNumber } from './util';

export class CacheMapper {
  public mapComment(project: Project) {
    return {
      id: project.id,
      parentId: project.parentId,
      order: project.order,
      color: project.color,
      name: project.name,
      commentCount: project.commentCount,
      isShared: boolToNumber(project.isShared),
      isFavorite: boolToNumber(project.isFavorite),
      isInboxProject: boolToNumber(project.isInboxProject),
      isTeamInbox: boolToNumber(project.isTeamInbox),
      url: project.url,
      viewStyle: project.viewStyle,
    };
  }

  public mapLabel(label: Label) {
    return {
      id: label.id,
      order: label.order,
      color: label.color,
      name: label.name,
      isFavorite: boolToNumber(label.isFavorite),
    };
  }

  public mapProject(project: Project) {
    return {
      id: project.id,
      parentId: project.parentId,
      order: project.order,
      color: project.color,
      name: project.name,
      commentCount: project.commentCount,
      isShared: boolToNumber(project.isShared),
      isFavorite: boolToNumber(project.isFavorite),
      isInboxProject: boolToNumber(project.isInboxProject),
      isTeamInbox: boolToNumber(project.isTeamInbox),
      url: project.url,
      viewStyle: project.viewStyle,
    };
  }

  public mapSection(project: Section) {
    return {
      id: project.id,
      projectId: project.projectId,
      order: project.order,
      name: project.name,
    };
  }

  public mapTask(project: Project) {
    return {
      id: project.id,
      parentId: project.parentId,
      order: project.order,
      color: project.color,
      name: project.name,
      commentCount: project.commentCount,
      isShared: boolToNumber(project.isShared),
      isFavorite: boolToNumber(project.isFavorite),
      isInboxProject: boolToNumber(project.isInboxProject),
      isTeamInbox: boolToNumber(project.isTeamInbox),
      url: project.url,
      viewStyle: project.viewStyle,
    };
  }
}
