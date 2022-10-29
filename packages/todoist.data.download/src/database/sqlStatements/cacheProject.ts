export const cacheProjectUpdateActiveSql = `
UPDATE cacheProject
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const cacheProjectInsertSql = `
INSERT INTO cacheProject (
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

export const cacheProjectUpdateSql = `
UPDATE cacheProject
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
