// See https://kit.svelte.dev/docs/types#app

import type { ISession } from "$lib/types/session";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: ISession | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
