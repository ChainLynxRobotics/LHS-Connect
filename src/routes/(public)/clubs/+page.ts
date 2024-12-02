import type { ClubPageData } from '$lib/types/ClubPageData';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const clubData = await fetch('/api/v1/clubs');

    return await clubData.json() as ClubPageData;
}) satisfies PageLoad;