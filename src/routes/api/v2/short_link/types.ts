import type { IListValue } from '$lib/types/basicTypes';

export interface IShortLink extends IListValue, Omit<IShortLinkCreate, 'password'> {
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
}

// How the short link will be displayed in the list
// This is used to hide the password hash
export interface IPublicShortLink extends Omit<IShortLink, 'hash'> {
	hasPassword: boolean;
}

// Actions that can be performed on a short link

export interface IShortLinkCreate {
	/**
	 * The short id of the link, $BASE_SHORT_URL/[suffix] will redirect to the URL.
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
