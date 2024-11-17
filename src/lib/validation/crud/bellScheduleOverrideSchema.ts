import { number, object, ObjectSchema, string } from "yup";
import { OBJECT_ID_REGEX } from "./globalCrudSchema";
import type { IBellScheduleOverride } from "$lib/types/crud/bellScheduleOverride";
import type { WithoutID } from "$lib/types/crud/globalCrud";

export const bellScheduleOverrideValidation: ObjectSchema<WithoutID<IBellScheduleOverride>> = object({
    date: number().required().label('Date'),
    scheduleId: string().required().matches(OBJECT_ID_REGEX, "Invalid ID").label('Schedule ID')
});
