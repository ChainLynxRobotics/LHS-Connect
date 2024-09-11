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
export interface DefinedScheduleList {
	schedules: BellSchedule[];
}

/**
 * Represents the bell schedules for a school year, with defaults and special schedules.
 */
export interface BellScheduleData {
	defaults: {
		daysOfWeek: [number, ...number[]]; // 0-6, 0 = Sunday, 6 = Saturday
		schedule: BellSchedule;
	}[];
	special: {
		date: number | number[]; // Epoch timestamp at midnight before the day, or an array of timestamps for multiple days
		schedule: BellSchedule;
	}[];
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
