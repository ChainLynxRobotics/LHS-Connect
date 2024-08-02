import type { HomePageData } from '$lib/types/HomePageData';
import type { PageServerLoad } from './$types';

import bellSchedules from '$lib/fake_data/bellSchedules';

export const load = (async (): Promise<HomePageData> => {

    // This is a mock of the data that would be loaded from a database.
    return {
        bellSchedules: bellSchedules
    };
}) satisfies PageServerLoad;