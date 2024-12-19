import { Permission } from "$lib/auth/permissions";
import type { IAdminUserUpdate } from "$lib/types/user";
import { number, object, ObjectSchema } from "yup";

export const userAdminUpdateValidator = object({
	permissions: number().required().integer().min(0).max(Permission.OWNER * 2 - 1),
}) as ObjectSchema<IAdminUserUpdate>;