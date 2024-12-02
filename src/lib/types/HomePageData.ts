import type { IPopulatedBellScheduleOverride } from "$lib/types/crud/bellScheduleOverride";
import type { IBellSchedule } from "$lib/types/crud/bellSchedule";
import type { ILinkCard } from "$lib/types/crud/linkCard";
import type { IBulletinBoardNote } from "$lib/types/crud/bulletinBoard";

/**
 * Represents a list of defined bell schedules.
 */
export interface SavedScheduleData {
	schedules: IBellSchedule[];
}

/**
 * Represents the bell schedules for a school year, with defaults and special schedules.
 */
export interface BellScheduleData {
	defaults: IBellSchedule[]; // For each day of the week
	overrides: IPopulatedBellScheduleOverride[];
}

/**
 * Represents the data for the bulletin board, with a list of notes below it.
 */
export interface BulletinBoardData {
	notes: IBulletinBoardNote[];
}

/**
 * Represents the data for a list of link cards.
 */
export interface LinkCardListData {
	cards: ILinkCard[];
}

/**
 * Represents the data for the homepage.
 */
export interface HomePageData {
	/**
	 * The bell schedules for the school year.
	 */
	bellSchedules: BellScheduleData;
	/**
	 * The bulletin board data.
	 */
	bulletinBoard: BulletinBoardData;
	/**
	 * The contact information for the school.
	 */
	contactInfo: LinkCardListData;
}
