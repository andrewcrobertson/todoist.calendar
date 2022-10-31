import { apiService } from '$lib/server.composition/RootPage';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async ({ params }) => {
	const { year, month } = <any>params;
	const data = apiService.getInitialData(parseInt(year, 10), parseInt(month, 10));
	return data;
};
