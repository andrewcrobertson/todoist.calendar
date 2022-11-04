export const calendarDeleteSql = `
DELETE FROM calendar
WHERE [date] >= @afterDate;`;

export const calendarInsertSql = `
INSERT INTO calendar (
  [priority],
  [year],
  [month],
  [day],
  [date],
  [time],
  [taskId],
  [text],
  [show]
)
SELECT @priority,
  @year,
  @month,
  @day,
  @date,
  @time,
  @taskId,
  @text,
  @show;`;

export const calendarUpdateSql = `
UPDATE calendar
SET [priority] = @priority,
  [year] = @year,
  [month] = @month,
  [day] = @day,
  [time] = @time,
  [text] = @text,
  [show] = @show
WHERE [taskId] = @taskId
  AND [date] = @date`;
