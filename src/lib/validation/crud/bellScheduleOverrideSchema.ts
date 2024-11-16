import { number, ObjectSchema, string } from "yup";
import { crudListValidation, OBJECT_ID_REGEX } from "./globalCrudSchema";
import type { IBellScheduleOverride } from "$lib/types/crud/bellScheduleOverride";

export const scheduleOverrideValidation: ObjectSchema<IBellScheduleOverride> = crudListValidation.shape({
    date: number().required().label('Date'),
    scheduleId: string().required().matches(OBJECT_ID_REGEX, "Invalid ID").label('Schedule ID')
});
