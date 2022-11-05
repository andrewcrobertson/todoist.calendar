import { apiService } from '$lib/server.composition/RootPage';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { filter } from 'lodash-es';

export const load: PageServerLoad = async ({ params }) => {
  const { year, month } = <any>params;
  const data = apiService.getInitialData(parseInt(year, 10), parseInt(month, 10));
  const day = 14;
  const days1 = filter(data.days, (d) => d.value <= day);
  const days2 = filter(data.days, (d) => d.value > day);
  return { ...data, days1, days2 };
};
