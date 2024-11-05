import bellSchedules from '$lib/fake_data/bellSchedules';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return bellSchedules;
}) satisfies PageServerLoad;