import type { ICrudListType } from "./globalCrud";

/**
 * Represents a note on the bulletin board.
 */
export interface IBulletinBoardNote extends ICrudListType {
	title: string;
	content: string;
	link?: string;
}