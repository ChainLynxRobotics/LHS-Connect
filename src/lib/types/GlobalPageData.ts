import type { IAnnouncement } from './crud/announcement';
import type { LinkCardListData } from './HomePageData';

/**
 * Represents the data for the global public layout and used .
 */
export interface GlobalPageData {
	announcement: IAnnouncement;
	usefulLinks: LinkCardListData;
}
