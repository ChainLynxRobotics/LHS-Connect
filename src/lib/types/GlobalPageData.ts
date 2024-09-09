import type { LinkCardListData } from './HomePageData';

/**
 * Represents the data for the footer of the pages.
 */
export interface FooterData {
	usefulLinks: LinkCardListData;
}

/**
 * Represents the data for the global public layout and used .
 */
export interface GlobalPageData {
	footer: FooterData;
}
