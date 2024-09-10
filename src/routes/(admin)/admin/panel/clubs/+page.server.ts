import type { PageServerLoad } from './$types';

//TODO: Replace this with actual data loading.
import clubs from '$lib/fake_data/clubs';

export const load = (async () => {
	return clubs;
}) satisfies PageServerLoad;
