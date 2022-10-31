export const calendarDeleteSql = `
DELETE FROM calendar
WHERE [date] >= @afterDate;`;

export const calendarInsertSql = `
INSERT INTO calendar (
  [year],
  [month],
  [day],
  [date],
  [time],
  [taskId],
  [text]
)
SELECT @year,
  @month,
  @day,
  @date,
  @time,
  @taskId,
  @text;`;
