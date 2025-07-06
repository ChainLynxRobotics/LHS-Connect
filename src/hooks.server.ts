import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateAndRenewSession,
} from '$lib/auth/session';
import connect from '$lib/db/mongodb';
import type { Handle } from '@sveltejs/kit';
import { Permissions } from '$lib/auth/permissions';
import { startFileClearInterval } from '$lib/db/s3';
import { dev } from '$app/environment';

// Ensure correct time zone
process.env.TZ = 'America/Los_Angeles';

// Connect to MongoDB
connect()
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Failed to connect to MongoDB', err);
	});

// Start file clear interval (only in development)
if (dev) startFileClearInterval();
// In production, the files are cleared whenever a new file is uploaded to work in a serverless environment.

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session');
	const session = await validateAndRenewSession(token);
	event.locals.session = session;

	event.locals.permissions = new Permissions(session ? session : 0);

	if (session) setSessionTokenCookie(event.cookies, token!, session.expires);
	else if (token) deleteSessionTokenCookie(event.cookies);

	return resolve(event);
};
