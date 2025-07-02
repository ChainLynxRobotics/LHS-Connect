import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	return redirect(302, `/link/${params.link}`);
}) satisfies PageLoad;
