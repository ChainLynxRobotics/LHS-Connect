import type { PageServerLoad } from './$types';

// TODO: Replace this with actual data loading.
import shortLinks from '$lib/fake_data/shortLinks';

export const load = (async () => {
	return shortLinks;
}) satisfies PageServerLoad;
