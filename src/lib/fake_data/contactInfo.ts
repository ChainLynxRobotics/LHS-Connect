import type { LinkCardListData } from '$lib/types/HomePageData';

const contactInfo: LinkCardListData = {
	cards: [
		{
			title: 'Attendance Office',
			subtitle: 'Room 142, Across from the main office',
			links: [
				{
					title: 'Attendance Information',
					url: 'https://lincolnhs.seattleschools.org/resources/attendance/'
				},
				{
					title: 'lincolnhs.attendance@seattleschools.org',
					url: 'mailto:lincolnhs.attendance@seattleschools.org'
				}
			]
		},
		{
			title: 'Counseling Office',
			subtitle: 'Room 245, Towards the library',
			links: [
				{
					title: 'Counseling Page',
					url: 'https://lincolnhs.seattleschools.org/resources/counseling/'
				},
				{
					title: 'Book an Appointment',
					url: 'https://districtlms.seattleschools.org/course/6885031021/materials?f=746547515'
				},
				{
					title: 'lincolncounseling@seattleschools.org',
					url: 'mailto:lincolncounseling@seattleschools.org'
				}
			]
		}
	]
};

export default contactInfo;
