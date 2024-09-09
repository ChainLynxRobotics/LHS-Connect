import type { PageServerLoad } from './$types';

// TODO: Replace this with actual data loading.
import usefulLinks from '$lib/fake_data/usefulLinks';

export const load = (async () => {
    return usefulLinks;
}) satisfies PageServerLoad;