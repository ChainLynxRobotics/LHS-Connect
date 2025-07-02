import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	return redirect(301, '/file-transfer' + url.search);
}) satisfies PageLoad;
