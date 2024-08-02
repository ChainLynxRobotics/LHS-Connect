import type { BellScheduleData } from '$lib/types/HomePageData';

const bellSchedules: BellScheduleData = {
	defaults: [
		{
			daysOfWeek: [1, 3, 5],
			schedule: {
				name: 'Monday & Friday',
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
		},
		{
			daysOfWeek: [2, 4],
			schedule: {
				name: 'Tuesday & Thursday',
				desc: 'This is the schedule for Tuesday and Thursday.',
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
	],
	special: [
		{
			date: '2024-8-2',
			schedule: {
				name: 'Special thingy',
				desc: 'This is the schedule for Tuesday and Thursday.',
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
		},
		{
			date: '2024-8-9',
			schedule: {
				name: 'Special thingy 2',
				desc: 'Electric boogaloo',
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
