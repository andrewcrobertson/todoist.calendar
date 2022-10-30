export const todoistSectionUpdateActiveSql = `
UPDATE todoistSection
SET [active] = @active,
  [activeCheckAt] = @activeCheckAt;`;

export const todoistSectionInsertSql = `
INSERT INTO todoistSection (
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

export const todoistSectionUpdateSql = `
UPDATE todoistSection
SET [projectId] = @projectId,
  [order] = @order,
  [name] = @name,
  [active] = @active,
  [activeCheckAt] = @activeCheckAt
WHERE [id] = @id;`;
