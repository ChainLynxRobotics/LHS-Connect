// See https://kit.svelte.dev/docs/types#app

import type { ISession } from '#lib/types/session.ts';
import { Permissions } from '#lib/auth/permissions.ts';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			permissions: Permissions;
			session: ISession | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
