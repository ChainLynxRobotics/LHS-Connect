import type { ICrudType } from "$lib/types/crud/globalCrud";
import { object, ObjectSchema, string } from "yup";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const crudValidation: ObjectSchema<ICrudType> = object({
    id: string()
        .required()
        .matches(OBJECT_ID_REGEX, "Invalid ID"),
});

