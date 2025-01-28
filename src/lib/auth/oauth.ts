import { Google } from "arctic";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { dev } from "$app/environment";
import { PUBLIC_BASE_URL } from "$env/static/public";

const callbackUrl = new URL("/admin/login/google/callback", dev ? "http://localhost:5173" : PUBLIC_BASE_URL).toString();

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	callbackUrl.toString(),
);
