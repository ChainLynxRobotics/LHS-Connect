export interface ShortLinkData {
	/**
	 * The short id of the link, https://lhs.cx/[suffix] will redirect to the URL.
	 */
	suffix: string;
	/**
	 * The URL of the link.
	 */
	url: string;
	/**
	 * The password of the link, if it exists.
	 */
	password?: string;
}

export interface AdminShortLinkData extends ShortLinkData {
	/**
	 * The internal id of the link.
	 */
	id: number;
	/**
	 * The date the link was created in epoch time.
	 */
	readonly createdAt: number;
	/**
	 * The number of times the link has been clicked.
	 */
	readonly uses: number;
}

export interface AdminShortLinkListData {
	links: AdminShortLinkData[];
}
