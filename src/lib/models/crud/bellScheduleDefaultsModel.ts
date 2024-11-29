import mongoose, { Model } from "mongoose";
import { CrudSingleton } from "../globalCrudModel";
import type { IBellScheduleDefaults } from "$lib/types/crud/bellScheduleDefaults";

export const bellScheduleDefaultsSchema = new mongoose.Schema<IBellScheduleDefaults>({
    bellScheduleIDs: {
        type: [String],
        required: true
    }
}, {
    virtuals: {
        bellScheduleIds: {
            options: {
                ref: 'BellSchedule',
                localField: 'bellScheduleIDs',
                foreignField: '_id',
                justOne: true,
            }
        }
    }
});

/**
 * This is a key-value pair that stores the default bell schedules for the school, there will only be one of these.
 */
export const BellScheduleDefaults: Model<IBellScheduleDefaults> = mongoose.models.BellScheduleDefaults ?? CrudSingleton.discriminator('BellScheduleDefaults', bellScheduleDefaultsSchema);
