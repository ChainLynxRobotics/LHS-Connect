import type { BellScheduleData } from '$lib/types/HomePageData';
import knownSchedules from './knownSchedules';

const bellSchedules: BellScheduleData = {
	schedules: knownSchedules.schedules,
	defaults: [0, 0, 1, 2, 1, 0, 0],
	special: [
		{
			date: 1725519600000,
			scheduleId: 0
		},
		{
			date: 1728198000000,
			scheduleId: 4
		}
	]
};

export default bellSchedules;
