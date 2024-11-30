import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { Permission } from "$lib/auth/permissions";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.permissions.has(Permission.VIEW)) return redirect(302, "/admin/panel");
};