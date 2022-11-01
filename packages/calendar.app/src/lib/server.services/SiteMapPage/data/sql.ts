export const calendarSelectDateRangeSql = `SELECT MIN(date) minDate,
  MAX(date) maxDate
FROM calendar;`;
