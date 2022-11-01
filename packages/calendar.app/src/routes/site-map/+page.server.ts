import { apiService } from '$lib/server.composition/SiteMapPage';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async () => {
  const data = apiService.getInitialData();
  return data;
};
