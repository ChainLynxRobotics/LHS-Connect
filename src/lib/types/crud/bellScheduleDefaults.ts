import type { IBellSchedule } from "./bellSchedule";
import type { ICrudSingletonType } from "./globalCrud";

/**
 * Represents the default bell schedule ids for each day of the week.
 */
export interface IBellScheduleDefaults extends ICrudSingletonType {
    bellScheduleIDs: IBellSchedule['id'][];
}