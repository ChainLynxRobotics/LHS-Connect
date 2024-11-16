import mongoose from "mongoose";
import { Crud } from "./globalCrudModel";

export const bellScheduleDefaultsSchema = new mongoose.Schema({
    bellScheduleIDs: {
        type: [String],
        required: true
    }
});

/**
 * This is a key-value pair that stores the default bell schedules for the school, there will only be one of these.
 */
export const bellScheduleDefaultsModel =  Crud.discriminator('BellScheduleDefaults', bellScheduleDefaultsSchema);