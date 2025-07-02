import type { IOrderableListValue } from '$lib/types/basicTypes';

/**
 * Represents a note on the bulletin board.
 */
export interface IBulletinBoardNote extends IOrderableListValue {
	title: string;
	content: string;
	link?: string;
}

/**
 * Represents the data for the bulletin board, whats returned by the API.
 */
export interface BulletinBoardData {
	notes: IBulletinBoardNote[];
}
