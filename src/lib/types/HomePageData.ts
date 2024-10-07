/**
 * A string representing a time in the format "HH:MM"
 */
export type TimeString = `${number}:${number}`;

/**
 * A string representing a single day of the year in the format "YYYY-MM-DD". Same as the first past of an ISO 8601 date string.
 * Not to be confused with the js Date object.
 */
export type DateString = `${number}-${number}-${number}`;

/**
 * Represents a single bell schedule, with a name, description, and a list of periods.
 */
export interface BellSchedule {
	id: number;
	name: string;
	desc?: string;
	periods: {
		name: string;
		start: TimeString;
		end: TimeString;
		emphasis?: boolean;
	}[];
}

/**
 * Represents a list of defined bell schedules.
 */
export interface SavedScheduleData {
	schedules: BellSchedule[];
}

/**
 * ID of a bell schedule, referencing an id in the SavedScheduleList.
 */
export type ScheduleId = number;

export interface ScheduleOverride {
	date: number; // Epoch timestamp at midnight (seattle timezone) before the day
	scheduleId: ScheduleId;
}

/**
 * Represents the bell schedules for a school year, with defaults and special schedules.
 */
export interface BellScheduleData {
	readonly schedules: BellSchedule[];
	defaults: ScheduleId[]; // For each day of the week
	specials: ScheduleOverride[];
}

/**
 * Represents a note on the bulletin board.
 */
export interface Note {
	title: string;
	content: string;
	link?: string;
}

/**
 * Represents the data for the bulletin board, with a list of notes below it.
 */
export interface BulletinBoardData {
	notes: Note[];
}

/**
 * Represents a card with a title, subtitle, and a list of links.
 */
export interface LinkCard {
	title: string;
	subtitle?: string;
	links: {
		title: string;
		url: string;
	}[];
}

/**
 * Represents the data for a list of link cards.
 */
export interface LinkCardListData {
	cards: LinkCard[];
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
	/**
	 * A list of useful links.
	 */
	usefulLinks: LinkCardListData;
}
