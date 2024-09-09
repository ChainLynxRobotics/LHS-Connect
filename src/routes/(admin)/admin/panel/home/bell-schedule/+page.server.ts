import type { PageServerLoad } from './$types';

//TODO: Replace this with actual data loading.
import knownSchedules from '$lib/fake_data/knownSchedules';

export const load = (async () => {
    return knownSchedules;
}) satisfies PageServerLoad;