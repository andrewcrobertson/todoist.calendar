import { filter, map, orderBy } from 'lodash';

export const toInitialData = (rows: any[]) => {
  const days = [];
  for (let i = 0; i <= rows.length; i++) {
    const entriesFiltered = filter(rows, (r) => r.day === i);
    if (entriesFiltered.length > 0) {
      const entriesMapped = map(entriesFiltered, ({ time, text }) => ({ time, text }));
      const entries = orderBy(entriesMapped, ['time', 'text']);
      days.push({ value: entriesFiltered[0].date, entries });
    }
  }

  return { days };
};
