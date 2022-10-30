export const cacheCommentUpdateActiveSql = `
UPDATE cacheComment
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const cacheCommentInsertSql = `
INSERT INTO cacheComment (
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

export const cacheCommentUpdateSql = `
UPDATE cacheComment
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
