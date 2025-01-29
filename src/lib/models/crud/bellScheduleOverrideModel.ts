import type { IBellScheduleOverride } from "$lib/types/crud/bellScheduleOverride";
import mongoose, { Model } from "mongoose";
import { BellSchedule } from "./bellScheduleModel";
import type { IBellSchedule } from "$lib/types/crud/bellSchedule";
import { crudCollectionSchema } from "../globalCrudModel";

export const scheduleOverrideSchema = new mongoose.Schema<IBellScheduleOverride>({
    date: { type: Number, required: true },
    scheduleId: { type: String, required: true }
}, {
    virtuals: {
        schedule: {
            options: {
                ref: BellSchedule.modelName,
                localField: 'scheduleId',
                foreignField: '_id',
                justOne: true,
            }
        }
    },
    timestamps: true
}).add(crudCollectionSchema); // Extends the crudCollectionSchema

export const BellScheduleOverride: Model<IBellScheduleOverride, {}, {}, { schedule: IBellSchedule }> = mongoose.models.BellScheduleOverride ?? mongoose.model('BellScheduleOverride', scheduleOverrideSchema);
