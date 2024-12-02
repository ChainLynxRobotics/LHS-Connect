import mongoose, { Model } from "mongoose";
import { CrudSingleton } from "../globalCrudModel";
import type { IBellScheduleDefaults } from "$lib/types/crud/bellScheduleDefaults";
import { BellSchedule } from "./bellScheduleModel";
import type { IBellSchedule } from "$lib/types/crud/bellSchedule";

export const bellScheduleDefaultsSchema = new mongoose.Schema<IBellScheduleDefaults>({
    bellScheduleIDs: {
        type: [String],
        required: true
    }
}, {
    virtuals: {
        bellSchedules: {
            options: {
                ref: BellSchedule.modelName,
                localField: 'bellScheduleIDs',
                foreignField: '_id',
            }
        }
    }
});

/**
 * This is a key-value pair that stores the default bell schedules for the school, there will only be one of these.
 */
export const BellScheduleDefaults: Model<IBellScheduleDefaults, {}, {}, { bellSchedules: IBellSchedule[] }> = mongoose.models.BellScheduleDefaults ?? CrudSingleton.discriminator('BellScheduleDefaults', bellScheduleDefaultsSchema);
