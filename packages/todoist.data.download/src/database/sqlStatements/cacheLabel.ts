export const cacheLabelUpdateActiveSql = `
UPDATE cacheLabel
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const cacheLabelInsertSql = `
INSERT INTO cacheLabel (
  [id],
  [order],
  [color],
  [name],
  [isFavorite],
  [active],
  [activeCheckAt]
)
SELECT @id,
  @order,
  @color,
  @name,
  @isFavorite,
  @active,
  @activeCheckAt;`;

export const cacheLabelUpdateSql = `
UPDATE cacheLabel
SET [order] = @order,
  [color] = @color,
  [name] = @name,
  [isFavorite] = @isFavorite,
  [active] = @active,
  [activeCheckAt] = @activeCheckAt
WHERE [id] = @id;`;
