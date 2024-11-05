import type { PageServerLoad } from './$types';

// TODO: Replace this with actual data loading.
import contactInfo from '$lib/fake_data/contactInfo';

export const load = (async () => {
	return contactInfo;
}) satisfies PageServerLoad;
