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
