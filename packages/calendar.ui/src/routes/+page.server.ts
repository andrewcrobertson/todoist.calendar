import { apiService } from '$lib/server.composition/RootPage';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async ({ params }) => {
	const state = apiService.getInitialData(2022, 10);
	return state;
};
