export const todoistProjectUpdateActiveSql = `
UPDATE todoistProject
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const todoistProjectInsertSql = `
INSERT INTO todoistProject (
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

export const todoistProjectUpdateSql = `
UPDATE todoistProject
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
