import type { BellScheduleData } from '#api/page_data/bellSchedule/types.ts';
import type { BulletinBoardData } from '#api/page_data/bulletinBoard/types.ts';
import type { LinkCardListData } from '#api/page_data/usefulLinks/types.ts';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const bellSchedule = (await (
		await fetch('/api/v2/page_data/bellSchedule')
	).json()) as BellScheduleData;
	const bulletinBoard = (await (
		await fetch('/api/v2/page_data/bulletinBoard')
	).json()) as BulletinBoardData;
	const contactInfo = (await (
		await fetch('/api/v2/page_data/contactInfo')
	).json()) as LinkCardListData;

	return {
		bellSchedule,
		bulletinBoard,
		contactInfo,
	};
}) satisfies PageLoad;
