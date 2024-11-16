import type { ICrudListType } from "./globalCrud";

/**
 * Represents a card with a title, subtitle, and a list of links.
 */
export interface ILinkCard extends ICrudListType {
	title: string;
	subtitle?: string;
	links: {
		title: string;
		url: string;
	}[];
}
