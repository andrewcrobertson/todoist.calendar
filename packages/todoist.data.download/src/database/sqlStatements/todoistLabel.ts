export const todoistLabelUpdateActiveSql = `
UPDATE todoistLabel
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const todoistLabelInsertSql = `
INSERT INTO todoistLabel (
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

export const todoistLabelUpdateSql = `
UPDATE todoistLabel
SET [order] = @order,
  [color] = @color,
  [name] = @name,
  [isFavorite] = @isFavorite,
  [active] = @active,
  [activeCheckAt] = @activeCheckAt
WHERE [id] = @id;`;
