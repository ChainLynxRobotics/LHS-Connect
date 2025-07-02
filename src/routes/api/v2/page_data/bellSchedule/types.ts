import type { IListValue, IOrderableListValue, ISingleValue } from "$lib/types/basicTypes";

/**
 * Declares the structure of a bell schedule
 */
export interface IBellSchedule extends IOrderableListValue {
    name: string;
    desc?: string;
    periods: {
        name: string;
        start: string;
        end: string;
        emphasis?: boolean;
    }[];
}

/**
 * Represents the default bell schedule ids for each day of the week.
 */
export interface IBellScheduleDefaults extends ISingleValue {
    bellScheduleIDs: IBellSchedule['id'][];
}

/**
 * Reference to a schedule for a certain day
 */
export interface IBellScheduleOverride extends IListValue {
    date: number; // Epoch timestamp at midnight (seattle timezone) before the day
    scheduleId: IBellSchedule["id"];
}

export interface IPopulatedBellScheduleOverride extends IBellScheduleOverride {
    schedule: IBellSchedule;
}

/**
 * Data structure for the bell schedule page, whats returned by the API
 */
export interface BellScheduleData {
	defaults: IBellSchedule[]; // For each day of the week
	overrides: IPopulatedBellScheduleOverride[];
}