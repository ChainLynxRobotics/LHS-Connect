import { number, ObjectSchema, string } from "yup";
import { crudValidation } from "./globalCrudSchema";
import type { IBellScheduleOverride } from "$lib/types/crud/bellScheduleOverride";

export const scheduleOverrideValidation: ObjectSchema<IBellScheduleOverride> = crudValidation.shape({
    date: number().required().label('Date'),
    scheduleId: string().required().label('Schedule ID')
});
