export const calendarSelectEntriesSql = `SELECT id,
  year,
  month,
  day,
  date,
  time,
  taskId,
  text
FROM calendar
WHERE show = @show
  AND year = @year
  AND month = @month
ORDER BY year, month, day;`;
