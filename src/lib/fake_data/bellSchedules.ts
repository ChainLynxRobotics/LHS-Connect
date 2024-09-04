import type { BellScheduleData } from '$lib/types/HomePageData';
import knownSchedules from './knownSchedules';

const bellSchedules: BellScheduleData = {
	defaults: [
		{
			daysOfWeek: [1, 3, 5],
			schedule: knownSchedules[0]
		},
		{
			daysOfWeek: [2, 4],
			schedule: knownSchedules[1]
		},
		{
			daysOfWeek: [3],
			schedule: knownSchedules[2]
		}
	],
	special: [
		{
			date: '2024-9-4',
			schedule: knownSchedules[3]
		}
	]
};

export default bellSchedules;
