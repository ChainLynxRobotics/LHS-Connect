import { Google } from 'arctic';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$app/env/private';
import { dev } from '$app/env';
import { PUBLIC_BASE_URL } from '$app/env/public';

const callbackUrl = new URL(
	'/admin/login/google/callback',
	dev ? 'http://localhost:5173' : PUBLIC_BASE_URL
).toString();

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, callbackUrl.toString());
