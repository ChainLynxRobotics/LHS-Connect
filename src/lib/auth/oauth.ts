import { Google } from "arctic";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } from "$env/static/private";
import { dev } from "$app/environment";

const callbackUrl = new URL("/admin/login/google/callback", dev ? "http://localhost:5173" : BASE_URL).toString();

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	callbackUrl.toString(),
);
