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
 * Represents the bell schedules for a school year, with defaults and special schedules.
 */
export interface BellScheduleData {
	defaults: {
		daysOfWeek: [number, ...number[]]; // 0-6, 0 = Sunday, 6 = Saturday
		schedule: BellSchedule;
	}[];
	special: {
		date: DateString;
		schedule: BellSchedule;
	}[];
}

/**
 * Represents a color for a sticky note out of a set of predefined colors.
 */
export enum StickyNoteColor {
	Yellow = "#feff9c",
	Blue = "#7afcff",
	Green = "#7cff7a",
	Pink = "#ff7eb9",
}

/**
 * Represents a sticky note on the bulletin board.
 */
export interface StickyNote {
	content: string;
	color: StickyNoteColor;
	rotation: number;
}

/**
 * Represents the data for the bulletin board, with text content and a list of sticky notes below it.
 */
export interface BulletinBoardData {
	content: string;
	notes: StickyNote[];
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
}
