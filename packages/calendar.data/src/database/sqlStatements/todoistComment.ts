export const todoistCommentUpdateActiveSql = `
UPDATE todoistComment
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const todoistCommentInsertSql = `
INSERT INTO todoistComment (
  [id],
  [content],
  [postedAt],
  [projectId],
  [taskId],
  [attachmentFileName],
  [attachmentFileType],
  [attachmentFileUrl],
  [attachmentResourceType],
  [active],
  [activeCheckAt]
)
SELECT @id,
  @content,
  @postedAt,
  @projectId,
  @taskId,
  @attachmentFileName,
  @attachmentFileType,
  @attachmentFileUrl,
  @attachmentResourceType,
  @active,
  @activeCheckAt;`;

export const todoistCommentUpdateSql = `
UPDATE todoistComment
SET [content] = @content,
  [postedAt] = @postedAt,
  [projectId] = @projectId,
  [taskId] = @taskId,
  [attachmentFileName] = @attachmentFileName,
  [attachmentFileType] = @attachmentFileType,
  [attachmentFileUrl] = @attachmentFileUrl,
  [attachmentResourceType] = @attachmentResourceType,
  [active] = @active,
  [activeCheckAt] = @activeCheckAt
WHERE [id] = @id;`;
