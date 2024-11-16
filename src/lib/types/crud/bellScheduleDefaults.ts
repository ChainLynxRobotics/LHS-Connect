import type { IBellSchedule } from "./bellSchedule";

/**
 * Represents the default bell schedule ids for each day of the week.
 */
export interface IBellScheduleDefaults {
    bellScheduleIDs: IBellSchedule['id'][];
}