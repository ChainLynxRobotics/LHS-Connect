import type { IBellScheduleOverride } from "$lib/types/crud/bellScheduleOverride";
import mongoose from "mongoose";
import { crudCollectionSchema } from "../globalCrudModel";

export const scheduleOverrideSchema = new mongoose.Schema<IBellScheduleOverride>({
    date: { type: Number, required: true },
    scheduleId: { type: String, required: true }
}).add(crudCollectionSchema); // Extends the crudCollectionSchema
scheduleOverrideSchema.virtual('scheduleObj', {
    ref: 'BellSchedule',
    localField: 'scheduleId',
    foreignField: '_id',
    justOne: true
});

export const BellScheduleOverride = mongoose.model('BellScheduleOverride', scheduleOverrideSchema);