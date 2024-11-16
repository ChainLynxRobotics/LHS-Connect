import type { ICrudType } from "./globalCrud";

/**
 * Represents a note on the bulletin board.
 */
export interface IBulletinBoardNote extends ICrudType {
	title: string;
	content: string;
	link?: string;
}