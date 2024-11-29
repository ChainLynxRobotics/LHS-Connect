import type { IBellScheduleOverride } from "$lib/types/crud/bellScheduleOverride";
import mongoose, { Model } from "mongoose";
import { crudCollectionSchema } from "../globalCrudModel";

export const scheduleOverrideSchema = new mongoose.Schema<IBellScheduleOverride>({
    date: { type: Number, required: true },
    scheduleId: { type: String, required: true }
}, {
    virtuals: {
        bellScheduleIds: {
            options: {
                ref: 'BellSchedule',
                localField: 'scheduleId',
                foreignField: '_id',
                justOne: true,
            }
        }
    }
});

export const BellScheduleOverride: Model<IBellScheduleOverride> = mongoose.models.BellScheduleOverride ?? mongoose.model('BellScheduleOverride', scheduleOverrideSchema);