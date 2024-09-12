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
			date: [ 1725519600000, 1725692400000, 1725778800000, 1725865200000, 1725951600000, 1726124400000, 1726210800000 ],
			schedule: {
				...knownSchedules.schedules[0],
				name: 'Mon/Fri Everyday',
				desc: 'From 9/5 to 9/13 we will be using the Monday/Friday schedule everyday (EXCEPT WEDNESDAY) so we have mentorship.'
			}
		},
		{
			date: [ 1725606000000 ],
			schedule: knownSchedules.schedules[4]
		}
	]
};

export default bellSchedules;
