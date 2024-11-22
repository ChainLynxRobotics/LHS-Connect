import mongoose from "mongoose";
import { CrudSingleton } from "../globalCrudModel";

export const bellScheduleDefaultsSchema = new mongoose.Schema({
    bellScheduleIDs: {
        type: [String],
        required: true
    }
});

/**
 * This is a key-value pair that stores the default bell schedules for the school, there will only be one of these.
 */
export const BellScheduleDefaults =  CrudSingleton.discriminator('BellScheduleDefaults', bellScheduleDefaultsSchema);