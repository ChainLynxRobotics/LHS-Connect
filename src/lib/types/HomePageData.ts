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
 * Represents the data for the homepage.
 */
export interface HomePageData {
	/**
	 * The bell schedules for the school year.
	 */
	bellSchedules: BellScheduleData;
}
