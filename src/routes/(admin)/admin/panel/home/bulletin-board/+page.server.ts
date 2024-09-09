import type { PageServerLoad } from './$types';

//TODO: Replace this with actual data loading.
import bulletinBoard from '$lib/fake_data/bulletinBoard';

export const load = (async () => {
	return bulletinBoard;
}) satisfies PageServerLoad;
