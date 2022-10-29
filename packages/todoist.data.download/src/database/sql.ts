export const projectSql = `CREATE TABLE IF NOT EXISTS cacheProject (
  [id] TEXT PRIMARY KEY,
  [parentId] TEXT NULL,
  [order] INTEGER NULL,
  [color] TEXT NULL,
  [name] TEXT NULL,
  [commentCount] INTEGER NULL,
  [isShared] INTEGER NULL,
  [isFavorite] INTEGER NULL,
  [isInboxProject] INTEGER NULL,
  [isTeamInbox] INTEGER NULL,
  [url] TEXT NULL,
  [viewStyle] TEXT NULL,
  [active] INTEGER NULL,
  [activeCheckAt] TEXT NULL
);`;

export const sectionSql = `CREATE TABLE IF NOT EXISTS cacheSection (
  [id] TEXT PRIMARY KEY,
  [projectId] TEXT NULL,
  [order] INTEGER NULL,
  [name] TEXT NULL,
  [active] INTEGER NULL,
  [activeCheckAt] TEXT NULL
);`;

export const taskSql = `CREATE TABLE IF NOT EXISTS cacheTask (
  [id] TEXT PRIMARY KEY,
  [assignerId] TEXT NULL,
  [assigneeId] TEXT NULL,
  [projectId] TEXT NULL,
  [sectionId] TEXT NULL,
  [parentId] TEXT NULL,
  [order] INTEGER NULL,
  [content] TEXT NULL,
  [description] TEXT NULL,
  [isCompleted] INTEGER NULL,
  [labels] TEXT NULL,
  [priority] INTEGER NULL,
  [commentCount] INTEGER NULL,
  [creatorId] TEXT NULL,
  [createdAt] TEXT NULL,
  [dueDate] TEXT NULL,
  [dueString] TEXT NULL,
  [dueLang] TEXT NULL,
  [dueIsRecurring] INTEGER NULL,
  [dueDatetime] TEXT NULL,
  [dueTimezone] TEXT NULL,
  [url] TEXT NULL,
  [active] INTEGER NULL,
  [activeCheckAt] TEXT NULL
);`;

export const commentSql = `CREATE TABLE IF NOT EXISTS cacheComment (
  [id] TEXT PRIMARY KEY,
  [content] TEXT NULL,
  [postedAt] TEXT NULL,
  [projectId] TEXT NULL,
  [taskId] TEXT NULL,
  [attachmentFileName] TEXT NULL,
  [attachmentFileType] TEXT NULL,
  [attachmentFileUrl] TEXT NULL,
  [attachmentResourceType] TEXT NULL,
  [active] INTEGER NULL,
  [activeCheckAt] TEXT NULL
);`;

export const labelSql = `CREATE TABLE IF NOT EXISTS cacheLabel (
  [id] TEXT PRIMARY KEY,
  [name] TEXT NULL,
  [color] TEXT NULL,
  [order] INTEGER NULL,
  [isFavorite] INTEGER NULL,
  [active] INTEGER NULL,
  [activeCheckAt] TEXT NULL
);`;
