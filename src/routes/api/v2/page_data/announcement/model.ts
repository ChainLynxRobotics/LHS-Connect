import mongoose from "mongoose";
import type { IAnnouncement } from "./types";
import { SingleValueModel } from "$lib/models/basicModels";

export const announcementSchema = new mongoose.Schema<IAnnouncement>({
    text: {
        type: String,
        maxLength: 512
    }
}, {
    timestamps: true,
});

/**
 * This is a key-value pair that stores the announcement, there will only be one of these.
 */
export const Announcement = SingleValueModel.discriminator('Announcement', announcementSchema);