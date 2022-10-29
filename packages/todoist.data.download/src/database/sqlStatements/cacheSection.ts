export const cacheSectionUpdateActiveSql = `
UPDATE cacheSection
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const cacheSectionInsertSql = `
INSERT INTO cacheSection (
  [id],
  [projectId],
  [order],
  [name],
  [active],
  [activeCheckAt]
)
SELECT @id,
  @projectId,
  @order,
  @name,
  @active,
  @activeCheckAt;`;

export const cacheSectionUpdateSql = `
UPDATE cacheSection
SET [projectId] = @projectId,
  [order] = @order,
  [name] = @name,
  [active] = @active,
  [activeCheckAt] = @activeCheckAt
WHERE [id] = @id;`;
