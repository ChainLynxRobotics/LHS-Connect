import type { IClub } from "$lib/types/crud/club";

/**
 * Represents the data for the club page, with a list of clubs below it.
 */
export interface ClubPageData {
	clubs: IClub[];
}
