import type { IOrderableListValue } from "$lib/types/basicTypes";

/**
 * Represents a note on the bulletin board.
 */
export interface IBulletinBoardNote extends IOrderableListValue {
    title: string;
    content: string;
    link?: string;
}