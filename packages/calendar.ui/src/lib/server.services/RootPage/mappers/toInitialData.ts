import { getDaysInMonth } from 'date-fns';
import { filter, map, orderBy } from 'lodash';

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
	12: 'December'
};

export const toInitialData = (input: any) => {
	const { year, month, rows } = input;
	const monthName = (<any>monthMap)[month];
	const daysInMonth = getDaysInMonth(new Date(year, month - 1));

	const entries = [];
	for (let i = 1; i <= daysInMonth; i++) {
		const dayEntriesFiltered = filter(rows, (r) => r.day === i);
		const dayEntriesMapped = map(dayEntriesFiltered, ({ time, text }) => ({ time, text }));
		const dayEntries = orderBy(dayEntriesMapped, ['time', 'text']);
		entries.push({ day: i, entries: dayEntries });
	}

	return {
		title: {
			month: monthName,
			year: year.toString()
		},
		entries
	};
};
