import { PUBLIC_ANALYTICS_URL } from '$env/static/public';
import { Permission } from '$lib/auth/permissions';
import {
	ChartPieOutline,
	HomeOutline,
	TableRowOutline,
	LinkOutline,
	ChartMixedOutline,
} from 'flowbite-svelte-icons';

interface AdminPage {
	label: string;
	href?: string;
	publicHref?: string;
	icon?: any;
	children?: {
		label: string;
		href: string;
	}[];
	permission?: Permission;
	hidden?: boolean;
}

const pages: AdminPage[] = [
	{
		label: 'Dashboard',
		href: '/admin/panel',
		icon: ChartPieOutline,
	},
	{
		label: 'Analytics',
		publicHref: PUBLIC_ANALYTICS_URL || '',
		icon: ChartMixedOutline,
		hidden: !PUBLIC_ANALYTICS_URL, // Hide the link if the analytics URL is not set
	},
	{
		label: 'Home Page',
		publicHref: '/',
		icon: HomeOutline,
		children: [
			{
				label: 'Bulletin Board',
				href: '/admin/panel/home/bulletin-board',
			},
			{
				label: 'Bell Schedule',
				href: '/admin/panel/home/bell-schedule',
			},
			{
				label: 'Saved Schedules',
				href: '/admin/panel/home/saved-schedules',
			},
			{
				label: 'Contact Info',
				href: '/admin/panel/home/contact-info',
			},
			{
				label: 'Useful Links',
				href: '/admin/panel/home/useful-links',
			},
		],
	},
	{
		label: 'Clubs',
		icon: TableRowOutline,
		href: '/admin/panel/clubs',
		publicHref: '/clubs',
	},
	{
		label: 'Short Links',
		icon: LinkOutline,
		href: '/admin/panel/links',
		publicHref: '/link-generator',
		permission: Permission.MANAGE_SHORT_LINKS,
	},
];

export default pages;
