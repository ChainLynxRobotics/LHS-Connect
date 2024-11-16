import type { ICrudListType } from "./globalCrud";

export interface IShortLinkCreate {
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

export interface IShortLink extends ICrudListType, IShortLinkCreate {
	/**
	 * The date the link was created in epoch time.
	 */
	createdAt: number;
	/**
	 * The number of times the link has been clicked.
	 */
	uses: number;
}
