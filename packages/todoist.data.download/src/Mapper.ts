import { filter, map, orderBy, uniq } from 'lodash';

export interface MapperOptions {}

export class Mapper {
  public constructor(private readonly options: MapperOptions) {}

  public map(input: any[]) {
    const output: any[] = [];
    const yearAndMonthValues = uniq(map(input, ({ yearAndMonth }) => yearAndMonth)).sort();
    for (let i = 0; i < yearAndMonthValues.length; i++) {
      const yearAndMonthValue = yearAndMonthValues[i];
      const entriesValue = filter(input, (e) => e.yearAndMonth === yearAndMonthValue);
      const daysValue = uniq(map(entriesValue, (e) => e.day)).sort();
      const days: any[] = [];
      for (let j = 0; j < daysValue.length; j++) {
        const dayValue = daysValue[j];
        const itemsRaw = filter(input, (e) => e.yearAndMonth === yearAndMonthValue && e.day === dayValue);
        const itemsSorted = orderBy(itemsRaw, ['yearAndMonth', 'day', 'time', 'priority', 'name']);
        const items = map(itemsSorted, ({ name, time }) => ({ name, time }));
        days.push({ day: dayValue, items });
      }

      output.push({ yearAndMonth: yearAndMonthValue, days });
    }

    return output;
  }
}
