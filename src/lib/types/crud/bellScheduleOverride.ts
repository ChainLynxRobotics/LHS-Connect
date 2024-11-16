import type { IBellSchedule } from "./bellSchedule";
import type { ICrudListType } from "./globalCrud";

/**
 * Reference to a schedule for a certain day
 */
export interface IBellScheduleOverride extends ICrudListType {
	date: number; // Epoch timestamp at midnight (seattle timezone) before the day
	scheduleId: IBellSchedule["id"];
}

export interface IPopulatedBellScheduleOverride extends IBellScheduleOverride {
    scheduleObj: IBellSchedule;
}