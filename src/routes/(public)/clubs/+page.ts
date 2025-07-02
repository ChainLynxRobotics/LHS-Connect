import type { ClubListData } from '$api/page_data/clubs/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const clubs = await (await fetch('/api/v2/page_data/clubs')).json() as ClubListData;

    return {
        clubs
    };
}) satisfies PageLoad;