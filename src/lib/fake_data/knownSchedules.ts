import type { BellSchedule } from '$lib/types/HomePageData';

const knownSchedules: BellSchedule[] = [
	{
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
				name: 'Mentorship',
				start: '10:50',
				end: '11:25'
			},
			{
				name: 'Period 3',
				start: '11:30',
				end: '12:20'
			},
			{
				name: 'Lunch',
				start: '12:25',
				end: '12:55',
				emphasis: true
			},
			{
				name: 'Period 4',
				start: '13:00',
				end: '13:50'
			},
			{
				name: 'Period 5',
				start: '13:55',
				end: '14:45'
			},
			{
				name: 'Period 6',
				start: '14:50',
				end: '15:40'
			}
		]
	},
	{
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
	},
	{
		name: 'Wednesday',
		periods: [
			{
				name: 'Period 1',
				start: '08:50',
				end: '09:25'
			},
			{
				name: 'Period 2',
				start: '09:30',
				end: '10:05'
			},
			{
				name: 'Mentorship',
				start: '10:10',
				end: '11:10'
			},
			{
				name: 'Period 3',
				start: '11:15',
				end: '11:50'
			},
			{
				name: 'Lunch',
				start: '11:25',
				end: '12:25',
				emphasis: true
			},
			{
				name: 'Period 4',
				start: '12:30',
				end: '10:05'
			},
			{
				name: 'Period 5',
				start: '13:10',
				end: '13:45'
			},
			{
				name: 'Period 6',
				start: '13:50',
				end: '14:25'
			}
		]
	}
];

export default knownSchedules;
