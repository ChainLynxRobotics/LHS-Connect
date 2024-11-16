import type { IBellScheduleDefaults } from "$lib/types/crud/bellScheduleDefaults";
import { array, object, string, type ObjectSchema } from "yup";
import { OBJECT_ID_REGEX } from "./globalCrudSchema";

const bellScheduleDefaultsValidation: ObjectSchema<IBellScheduleDefaults> = object({
    bellScheduleIDs: array()
        .of(
            string()
                .required()
                .matches(OBJECT_ID_REGEX, "Invalid ID")
        )
        .required()
        .label('Bell Schedule IDs')
});