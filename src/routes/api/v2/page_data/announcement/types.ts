import type { ISingleValue } from '$lib/types/basicTypes';

/**
 * The announcement at the top of all pages
 */
export interface IAnnouncement extends ISingleValue {
	text?: string;
}
