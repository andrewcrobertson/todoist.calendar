import { base } from '$app/paths';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { redirect } from '@sveltejs/kit';
import { padStart } from 'lodash-es';

export const load: PageServerLoad = async () => {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = padStart((today.getMonth() + 1).toString(), 2, '0');
  throw redirect(302, `${base}/${year}/${month}`);
};
