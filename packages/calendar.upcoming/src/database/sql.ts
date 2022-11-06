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
  AND date >=  @fromDate
  AND date <= @toDate
ORDER BY year, month, day;`;
