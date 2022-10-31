export const calendar = `CREATE TABLE IF NOT EXISTS calendar (
  [id] INTEGER PRIMARY KEY AUTOINCREMENT,
  [year] INTEGER NULL,
  [month] INTEGER NULL,
  [day] INTEGER NULL,
  [date] TEXT NULL,
  [time] TEXT NULL,
  [taskId] TEXT NULL,
  [text] TEXT NULL,
  [show] INTEGER NULL
);`;

export const memoRecurringTaskDate = `CREATE TABLE IF NOT EXISTS memoRecurringTaskDate (
  [id] INTEGER PRIMARY KEY AUTOINCREMENT,
  [taskId] TEXT NULL,
  [dueString] TEXT NULL,
  [currentDate] TEXT NULL,
  [nextDate] TEXT NULL
);`;

export const todoistProject = `CREATE TABLE IF NOT EXISTS todoistProject (
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

export const todoistSection = `CREATE TABLE IF NOT EXISTS todoistSection (
  [id] TEXT PRIMARY KEY,
  [projectId] TEXT NULL,
  [order] INTEGER NULL,
  [name] TEXT NULL,
  [active] INTEGER NULL,
  [activeCheckAt] TEXT NULL
);`;

export const todoistTask = `CREATE TABLE IF NOT EXISTS todoistTask (
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

export const todoistComment = `CREATE TABLE IF NOT EXISTS todoistComment (
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

export const todoistLabel = `CREATE TABLE IF NOT EXISTS todoistLabel (
  [id] TEXT PRIMARY KEY,
  [name] TEXT NULL,
  [color] TEXT NULL,
  [order] INTEGER NULL,
  [isFavorite] INTEGER NULL,
  [active] INTEGER NULL,
  [activeCheckAt] TEXT NULL
);`;
