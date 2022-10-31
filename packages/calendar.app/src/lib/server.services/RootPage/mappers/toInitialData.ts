import { addMonths, getDaysInMonth } from 'date-fns';
import { filter, map, orderBy, padStart } from 'lodash';

const monthMap = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const toInitialData = (input: any) => {
  const { year, month, rows } = input;
  const monthName = (<any>monthMap)[month];
  const midMonth = new Date(year, month - 1, 15);
  const daysInMonth = getDaysInMonth(midMonth);

  const prevMonth = addMonths(midMonth, -1);
  const nextMonth = addMonths(midMonth, 1);

  const previous = {
    year: prevMonth.getFullYear(),
    month: padStart((prevMonth.getMonth() + 1).toString(), 2, '0'),
  };
  const next = {
    year: nextMonth.getFullYear(),
    month: padStart((nextMonth.getMonth() + 1).toString(), 2, '0'),
  };

  const days = [];
  for (let value = 1; value <= daysInMonth; value++) {
    const entriesFiltered = filter(rows, (r) => r.day === value);
    const entriesMapped = map(entriesFiltered, ({ time, text }) => ({ time, text }));
    const entries = orderBy(entriesMapped, ['time', 'text']);
    days.push({ value, entries });
  }

  return { title: { month: monthName, year: year.toString() }, previous, next, days };
};
