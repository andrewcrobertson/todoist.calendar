export const memoRecurringTaskDateDeleteSql = `
DELETE FROM memoRecurringTaskDate
WHERE [currentDate] < @beforeDate;`;

export const memoRecurringTaskDateUpdateSql = `
UPDATE memoRecurringTaskDate
SET [nextDate] = @nextDate
WHERE [taskId] = @taskId
  AND [dueString] = @dueString
  AND [currentDate] = @currentDate;`;

export const memoRecurringTaskDateInsertSql = `
INSERT INTO memoRecurringTaskDate (
  [taskId],
  [dueString],
  [currentDate],
  [nextDate]
)
SELECT @taskId,
  @dueString,
  @currentDate,
  @nextDate;`;

export const memoRecurringTaskDateSelectSql = `
SELECT [nextDate]
FROM memoRecurringTaskDate
WHERE [taskId] = @taskId
  AND [dueString] = @dueString
  AND [currentDate] = @currentDate;`;
