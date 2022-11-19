import { format } from 'date-fns';
import { filter, join, map, orderBy, split, uniq } from 'lodash';

export class UpcomingMapper {
  public toMessage(rows: any[]) {
    const dates = uniq(map(rows, ({ date }) => date));
    const days = [];
    for (let i = 0; i <= dates.length; i++) {
      const entriesFiltered = filter(rows, (r) => r.date === dates[i]);
      if (entriesFiltered.length > 0) {
        const entriesMapped = map(entriesFiltered, ({ time, text }) => ({ time, text }));
        const entries = orderBy(entriesMapped, ['time', 'text']);
        days.push({ value: entriesFiltered[0].date, entries });
      }
    }

    return this.mapDays(days);
  }

  private mapDays(days: any[]) {
    const lines = [];
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      lines.push(`*${this.formatDate(day.value)}*`);
      for (let j = 0; j < day.entries.length; j++) {
        const entry = day.entries[j];
        if (entry.time) {
          lines.push(`- ${entry.text} (_${this.formatTime(entry.time)}_)`);
        } else {
          lines.push(`- ${entry.text}`);
        }
      }
      lines.push(``);
    }

    const msg = join(lines, '\r\n');
    return msg;
  }

  private formatDate(date: string) {
    const tokens = split(date, '-');
    const year = parseInt(tokens[0]);
    const month = parseInt(tokens[1]) - 1;
    const day = parseInt(tokens[2]);
    const formattedDate = format(new Date(year, month, day), 'cccc MMM d');
    return formattedDate;
  }

  private formatTime(time: string) {
    const tokens = split(time, ':');
    const hoursRaw = parseInt(tokens[0]);
    const hours = hoursRaw > 12 ? hoursRaw - 12 : hoursRaw;
    const minutes = tokens[1];
    const suffix = hoursRaw >= 12 ? 'pm' : 'am';
    const formattedTime = `${hours}:${minutes}${suffix}`;
    return formattedTime;
  }
}
