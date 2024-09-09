import type { BellScheduleData } from '$lib/types/HomePageData';
import knownSchedules from './knownSchedules';

const bellSchedules: BellScheduleData = {
	defaults: [
		{
			daysOfWeek: [1, 3, 5],
			schedule: knownSchedules.schedules[0]
		},
		{
			daysOfWeek: [2, 4],
			schedule: knownSchedules.schedules[1]
		},
		{
			daysOfWeek: [3],
			schedule: knownSchedules.schedules[2]
		}
	],
	special: [
		{
			date: ['2024-9-5', '2024-9-7', '2024-9-8', '2024-9-9', '2024-9-10', '2024-9-12', '2024-9-13'],
			schedule: {
				...knownSchedules.schedules[0],
				name: 'Mon/Fri Everyday',
				desc: 'From 9/5 to 9/13 we will be using the Monday/Friday schedule everyday (EXCEPT WEDNESDAY) so we have mentorship.'
			}
		},
		{
			date: '2024-9-6',
			schedule: knownSchedules.schedules[4]
		}
	]
};

export default bellSchedules;
