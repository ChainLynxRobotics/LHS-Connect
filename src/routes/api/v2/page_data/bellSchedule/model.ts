import mongoose from "mongoose";
import type { IBellSchedule, IBellScheduleDefaults, IBellScheduleOverride } from "./types";
import { getDiscriminatorOrCached, getModelOrCached } from "$lib/models/modelUtil";
import { SingleValueModel } from "$lib/models/basicModels";
import { TIME_STRING_REGEX } from "./validator";

// List of bell schedules

export const bellScheduleSchema = new mongoose.Schema<IBellSchedule>({
    name: { type: String, required: true, maxlength: 64 },
    desc: { type: String, maxlength: 512 },
    periods: [{
        name: { type: String, required: true, maxlength: 64 },
        start: { type: String, required: true, match: TIME_STRING_REGEX },
        end: { type: String, required: true, match: TIME_STRING_REGEX },
        emphasis: { type: Boolean }
    }],
    order: {
        type: Number,
        required: true,
        select: false,
    },
}, {
    timestamps: true,
});
export const BellSchedule = getModelOrCached('BellSchedule', bellScheduleSchema);

// Default bell schedule IDs for each day of the week (array from sun to sat)

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
    },
    timestamps: true
});
export const BellScheduleDefaults = getDiscriminatorOrCached(SingleValueModel, 'BellScheduleDefaults', bellScheduleDefaultsSchema); // There is only one document of this so we use the SingleValueModel as the base

// Overrides for bell schedules

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
});
export const BellScheduleOverride = getModelOrCached('BellScheduleOverride', scheduleOverrideSchema); // Overrides for bell schedules