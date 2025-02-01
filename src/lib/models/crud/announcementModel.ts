import mongoose, { Model } from "mongoose";
import { CrudSingleton } from "../globalCrudModel";
import type { IAnnouncement } from "$lib/types/crud/announcement";

export const announcementSchema = new mongoose.Schema<IAnnouncement>({
    text: {
        type: String,
        maxLength: 512
    }
});

/**
 * This is a key-value pair that stores the announcement, there will only be one of these.
 */
export const Announcement: Model<IAnnouncement, {}, {}, {}> = mongoose.models.Announcement ?? CrudSingleton.discriminator('Announcement', announcementSchema);
