import clubs from '$lib/fake_data/clubs';
import type { ClubPageData } from '$lib/types/ClubPageData';
import type { PageServerLoad } from './$types';

export const load = (async (): Promise<ClubPageData> => {
	return {
		clubs: clubs
	};
}) satisfies PageServerLoad;
