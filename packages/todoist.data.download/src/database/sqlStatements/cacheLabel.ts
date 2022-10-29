export const cacheLabelUpdateActiveSql = `
UPDATE cacheLabel
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const cacheLabelInsertSql = `
INSERT INTO cacheLabel (
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

export const cacheLabelUpdateSql = `
UPDATE cacheLabel
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
