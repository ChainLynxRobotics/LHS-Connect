import { deleteSessionTokenCookie, setSessionTokenCookie, validateAndRenewSession } from "$lib/auth/session";
import connect from "$lib/db/mongodb";
import type { Handle } from "@sveltejs/kit";

// Connect to MongoDB before starting the server
connect().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("session");
    const session = await validateAndRenewSession(token);
    event.locals.session = session;

    if (session) setSessionTokenCookie(event.cookies, token!, session.expires);
    else if (token) deleteSessionTokenCookie(event.cookies);

    return resolve(event);
};