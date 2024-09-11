import type { DefinedScheduleList } from '$lib/types/HomePageData';

const knownSchedules: DefinedScheduleList = {
	schedules: [
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
					end: '11:15'
				},
				{
					name: 'Period 3',
					start: '11:20',
					end: '11:55'
				},
				{
					name: 'Lunch',
					start: '12:00',
					end: '12:30',
					emphasis: true
				},
				{
					name: 'Period 4',
					start: '12:30',
					end: '13:05'
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
		},
		{
			name: 'First Day',
			desc: 'Welcome back to school! Doors open for 9th graders at 8:30, and 12:40 for everybody else. Classes start at 1:15.',
			periods: [
				{
					name: '9th grade orientation',
					start: '08:50',
					end: '11:35'
				},
				{
					name: '9th grade on-campus lunch',
					start: '11:35',
					end: '12:20'
				},
				{
					name: '9th grade assembly',
					start: '12:20',
					end: '13:10'
				},
				{
					name: '10th/11th/12th Lunch',
					start: '12:40',
					end: '13:10'
				},
				{
					name: 'Period 1',
					start: '13:15',
					end: '13:35'
				},
				{
					name: 'Period 2',
					start: '13:40',
					end: '14:00'
				},
				{
					name: 'Period 3',
					start: '14:05',
					end: '14:25'
				},
				{
					name: 'Period 4',
					start: '14:30',
					end: '14:50'
				},
				{
					name: 'Period 5',
					start: '14:55',
					end: '15:15'
				},
				{
					name: 'Period 6',
					start: '15:20',
					end: '15:40'
				}
			]
		},
		{
			name: 'Assembly',
			desc: 'Assembly during mentorship time, still go to your mentorship class first for instructions',
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
					name: 'Assembly',
					start: '10:50',
					end: '11:25',
					emphasis: true
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
		}
	]
};

export default knownSchedules;
