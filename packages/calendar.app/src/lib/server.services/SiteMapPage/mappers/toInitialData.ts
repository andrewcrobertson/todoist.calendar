import { addMonths } from 'date-fns';
import { first, padStart, split } from 'lodash-es';

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
  if (input === null) return [];

  const minDate = parseDate(input.minDate);
  const maxDate = parseDate(input.maxDate);

  const output = [];
  let midMonth = new Date(minDate.year, minDate.month - 1, 15);
  for (let i = 0; i < 1000; i++) {
    const year = midMonth.getFullYear();
    const month = midMonth.getMonth() + 1;
    const url = `/${year.toString()}/${padStart(month.toString(), 2, '0')}`;
    const text = `${year.toString()} ${(<any>monthMap)[month]}`;
    output.push({ url, text });
    midMonth = addMonths(midMonth, 1);
    if (midMonth.getFullYear() === maxDate.year && midMonth.getMonth() + 1 === maxDate.month) break;
  }

  return { items: output };
};

export const parseDate = (date: string) => {
  const tokens = split(first(split(date, 'T')), '-');
  const year = parseInt(tokens[0], 10);
  const month = parseInt(tokens[1], 10);
  const day = parseInt(tokens[2], 10);
  return { year, month, day };
};
