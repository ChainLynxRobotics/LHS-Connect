import { object, string } from "yup";
import type { IAnnouncement } from "./types";
import type { WithoutID } from "$lib/types/basicTypes";

export const announcementValidator = object<WithoutID<IAnnouncement>>({
    text: string().optional().max(512).label('Announcement Text'),
});