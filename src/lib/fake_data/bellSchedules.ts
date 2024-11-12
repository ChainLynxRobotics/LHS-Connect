import type { BellScheduleData } from '$lib/types/HomePageData';
import knownSchedules from './knownSchedules';

const bellSchedules: BellScheduleData = {
	schedules: knownSchedules.schedules,
	defaults: [0, 0, 1, 2, 1, 0, 0],
	specials: [
		{
			date: 1725519600000,
			scheduleId: 0
		},
		{
			date: 1731398400000,
			scheduleId: 5
		}
	]
};

export default bellSchedules;
