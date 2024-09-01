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
			date: '2024-8-8',
			schedule: {
				name: 'TESTING FOR SPECIAL SCHEDULES',
				desc: 'TESTING FOR SPECIAL SCHEDULES',
				periods: [
					{
						name: 'Period 1',
						start: '08:50',
						end: '09:45'
					},
					{
						name: 'Period 2',
						start: '09:50',
						end: '10:45'
					},
					{
						name: 'Period 3',
						start: '10:50',
						end: '11:50'
					},
					{
						name: 'Lunch',
						start: '11:55',
						end: '12:25',
						emphasis: true
					},
					{
						name: 'Period 4',
						start: '12:30',
						end: '13:30'
					},
					{
						name: 'Period 5',
						start: '13:35',
						end: '14:35'
					},
					{
						name: 'Period 6',
						start: '14:40',
						end: '15:40'
					}
				]
			}
		}
	]
};

export default bellSchedules;
