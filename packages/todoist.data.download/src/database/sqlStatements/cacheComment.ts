export const cacheCommentUpdateActiveSql = `
UPDATE cacheComment
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const cacheCommentInsertSql = `
INSERT INTO cacheComment (
  [id],
  [parentId],
  [order],
  [color],
  [name],
  [commentCount],
  [isShared],
  [isFavorite],
  [isInboxProject],
  [isTeamInbox],
  [url],
  [viewStyle],
  [active],
  [activeCheckAt]
)
SELECT @id,
  @parentId,
  @order,
  @color,
  @name,
  @commentCount,
  @isShared,
  @isFavorite,
  @isInboxProject,
  @isTeamInbox,
  @url,
  @viewStyle,
  @active,
  @activeCheckAt;`;

export const cacheCommentUpdateSql = `
UPDATE cacheComment
SET [parentId] = @parentId,
  [order] = @order,
  [color] = @color,
  [name] = @name,
  [commentCount] = @commentCount,
  [isShared] = @isShared,
  [isFavorite] = @isFavorite,
  [isInboxProject] = @isInboxProject,
  [isTeamInbox] = @isTeamInbox,
  [url] = @url,
  [viewStyle] = @viewStyle,
  [active] = @active,
  [activeCheckAt] = @activeCheckAt
WHERE [id] = @id;`;
