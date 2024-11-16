import type { AdminShortLinkPageData } from '$lib/types/AdminShortLinkPageData';
import type { IShortLink } from '$lib/types/crud/shortLink';

const shortLinks: IShortLink[] = [
	{
		id: '1',
		suffix: 'lhs',
		url: 'https://lhs.cx',
		createdAt: 1631990400,
		uses: 0
	},
	{
		id: '2',
		suffix: 'lhslog',
		url: 'https://lhslog.com',
		createdAt: 1631990400,
		uses: 0
	},
	{
		id: '3',
		suffix: 'laptopform',
		url: 'https://example.com',
		password: 'password123',
		createdAt: 1631990400,
		uses: 12352
	}
];

export default { links: shortLinks } as AdminShortLinkPageData;
