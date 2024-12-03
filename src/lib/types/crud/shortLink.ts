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
	/**
	 * The hash of the password, as stored in the database.
	 */
	hash: string;
	password: undefined;
}

export interface IPublicShortLink extends Omit<IShortLink, "hash"> {}

export interface IShortLinkLogin {
	suffix: string;
	password: string;
}

export interface IShortLinkUrlUpdate {
	url: string;
}

export interface IShortLinkAdminUpdate {
	url: string;
	suffix: string;
}
