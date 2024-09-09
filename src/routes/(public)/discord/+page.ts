import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	redirect(301, 'https://discord.gg/7Sn4e3CjtD');
}) satisfies PageLoad;
