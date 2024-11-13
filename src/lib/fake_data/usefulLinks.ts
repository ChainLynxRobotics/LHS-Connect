import type { LinkCardListData } from '$lib/types/HomePageData';

const usefulLinks: LinkCardListData = {
	cards: [
		{
			id: 1,
			title: 'Lincoln Media',
			links: [
				{
					title: 'Instagram',
					url: 'https://www.instagram.com/lincolnseattle/'
				},
				{
					title: 'YouTube Channel',
					url: 'https://www.youtube.com/channel/UCiZiET6faxUxf9tD6bc6CJQ'
				},
				{
					title: 'Lincoln Newspaper',
					url: 'https://lhslog.com/'
				},
				{
					title: 'Offical Spotify',
					url: 'https://open.spotify.com/user/tuuc4uk3wa8ktt8kqfnrzj1tz'
				},
				{
					title: 'Lincoln Alumni',
					url: 'https://lincolnhighlynx.org/'
				}
			]
		},
		{
			id: 2,
			title: 'Athletics',
			links: [
				{
					title: 'Game Tickets',
					url: 'https://gofan.co/app/school/WA86276'
				},
				{
					title: 'Althetics Page',
					url: 'https://lincolnhs.seattleschools.org/student_life/athletics'
				},
				{
					title: 'Live Stream',
					url: 'https://justagamelive.com/clients/lincoln-high-school-wa'
				},
				{
					title: 'PE Waiver Form',
					url: 'https://www.seattleschools.org/wp-content/uploads/2021/07/PE-Waiver.pdf'
				}
			]
		},
		{
			id: 3,
			title: 'Merch & Fundraisers',
			links: [
				{
					title: 'ChainLynx Robotics',
					url: 'https://secure.givelively.org/donate/washington-first-robotics/frc-chainlynx-8248'
				}
			]
		},
		{
			id: 4,
			title: 'Other',
			links: [
				{
					title: 'Service Hours Form',
					url: 'https://www.seattleschools.org/wp-content/uploads/2021/07/DistrictServiceLearningForm.pdf'
				},
				{
					title: 'Free/Reduced Lunch',
					url: 'https://www.seattleschools.org/departments/culinary-services/free-and-reduced-price-meals/'
				},
				{
					title: 'Culture Guide',
					url: 'https://lincolnhs.seattleschools.org/student-life/culture-guide/'
				},
				{
					title: 'Native Land Map',
					url: 'https://native-land.ca/'
				}
			]
		}
	]
};

export default usefulLinks;
