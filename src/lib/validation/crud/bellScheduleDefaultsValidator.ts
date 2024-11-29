import type { IBellScheduleDefaults } from "$lib/types/crud/bellScheduleDefaults";
import { array, object, ObjectSchema, string } from "yup";
import { OBJECT_ID_REGEX } from "./globalCrudValidator";

export default object({
    bellScheduleIDs: array()
        .of(
            string()
                .required()
                .matches(OBJECT_ID_REGEX, "Invalid ID")
        )
        .required()
        .label('Bell Schedule IDs')
}) as ObjectSchema<IBellScheduleDefaults>;