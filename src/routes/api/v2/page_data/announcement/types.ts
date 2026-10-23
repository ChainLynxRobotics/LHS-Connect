import type { ISingleValue } from '#lib/types/basicTypes.js';

/**
 * The announcement at the top of all pages
 */
export interface IAnnouncement extends ISingleValue {
	text?: string;
}
