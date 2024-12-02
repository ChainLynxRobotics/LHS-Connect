import type { BellScheduleData, BulletinBoardData, HomePageData, LinkCardListData } from '$lib/types/HomePageData';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const bellScheduleData = await fetch('/api/v1/bellSchedule');
    const bulletinBoardData = await fetch('/api/v1/bulletinBoard');
    const contactInfoData = await fetch('/api/v1/contactInfo');
    
    return {
        bellSchedules: await bellScheduleData.json() as BellScheduleData,
        bulletinBoard: await bulletinBoardData.json() as BulletinBoardData,
        contactInfo: await contactInfoData.json() as LinkCardListData
    } satisfies HomePageData;
}) satisfies PageLoad;