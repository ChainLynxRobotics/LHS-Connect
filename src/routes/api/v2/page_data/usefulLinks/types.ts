import type { IOrderableListValue } from '$lib/types/basicTypes';

/**
 * Represents a card with a title, subtitle, and a list of links.
 */
export interface ILinkCard extends IOrderableListValue {
	title: string;
	subtitle?: string;
	links: {
		title: string;
		url: string;
	}[];
}

/**
 * Represents the data for a list of link cards, whats returned by the API.
 */
export interface LinkCardListData {
	cards: ILinkCard[];
}
