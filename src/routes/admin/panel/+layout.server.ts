import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { Permission } from "$lib/auth/permissions";

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.session || !locals.permissions.has(Permission.VIEW)) return redirect(302, "/admin/login");
    return {
        session: locals.session,
    }
};