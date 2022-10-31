import { Comment, Label, Project, Section, Task } from '@doist/todoist-api-typescript';
import { boolToNumber } from '../utils';

export class SyncMapper {
  public mapComment(comment: Comment) {
    return {
      id: comment.id,
      content: comment.content,
      postedAt: comment.postedAt,
      projectId: comment.projectId,
      taskId: comment.taskId,
      attachmentFileName: comment.attachment?.fileName,
      attachmentFileType: comment.attachment?.fileType,
      attachmentFileUrl: comment.attachment?.fileUrl,
      attachmentResourceType: comment.attachment?.resourceType,
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

  public mapSection(section: Section) {
    return {
      id: section.id,
      projectId: section.projectId,
      order: section.order,
      name: section.name,
    };
  }

  public mapTask(task: Task) {
    return {
      id: task.id,
      assignerId: task.assignerId,
      assigneeId: task.assigneeId,
      projectId: task.projectId,
      sectionId: task.sectionId,
      parentId: task.parentId,
      order: task.order,
      content: task.content,
      description: task.description,
      isCompleted: boolToNumber(task.isCompleted),
      labels: JSON.stringify(task.labels),
      priority: task.priority,
      commentCount: task.commentCount,
      creatorId: task.creatorId,
      createdAt: task.createdAt,
      dueDate: task.due?.date ?? null,
      dueString: task.due?.string ?? null,
      dueLang: task.due?.lang ?? null,
      dueIsRecurring: boolToNumber(task.due?.isRecurring ?? false),
      dueDatetime: task.due?.datetime ?? null,
      dueTimezone: task.due?.timezone ?? null,
      url: task.url,
    };
  }
}
