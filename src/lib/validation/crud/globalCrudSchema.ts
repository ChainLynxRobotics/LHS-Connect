import type { ICrudListType } from "$lib/types/crud/globalCrud";
import { object, ObjectSchema, string } from "yup";

export const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const crudListValidation: ObjectSchema<ICrudListType> = object({
    id: string()
        .required()
        .matches(OBJECT_ID_REGEX, "Invalid ID"),
});

