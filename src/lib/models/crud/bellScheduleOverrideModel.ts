import type { IBellScheduleOverride } from "$lib/types/crud/bellScheduleOverride";
import mongoose from "mongoose";

export const scheduleOverrideSchema = new mongoose.Schema<IBellScheduleOverride>({
    date: { type: Number, required: true },
    scheduleId: { type: String, required: true }
});
scheduleOverrideSchema.virtual('scheduleObj', {
    ref: 'BellSchedule',
    localField: 'scheduleId',
    foreignField: '_id',
    justOne: true
});

export const BellScheduleOverride = mongoose.model('BellScheduleOverride', scheduleOverrideSchema);