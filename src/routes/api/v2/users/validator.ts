import { object, number } from "yup";
import type { IAdminUserUpdate } from "./types";
import { Permission } from "$lib/auth/permissions";

export const userAdminUpdateValidator = object<IAdminUserUpdate>({
	permissions: number().required().integer().min(0).max(Permission.OWNER * 2 - 1),
});