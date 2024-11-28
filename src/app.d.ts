// See https://kit.svelte.dev/docs/types#app

import type { ISession } from "$lib/types/session";
import { Permissions } from "$lib/auth/Permissions";

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
