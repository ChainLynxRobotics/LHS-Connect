import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth();

    if (!session?.user?.id) {
        redirect(302, "/admin/login");
    }
   
    return {
        session,
    }
}