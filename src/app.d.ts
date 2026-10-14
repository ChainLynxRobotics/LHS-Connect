// See https://kit.svelte.dev/docs/types#app

import type { ISession } from '#lib/types/session';
import { Permissions } from '#lib/auth/permissions';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			permissions: Permissions;
			session: ISession | null;
		}

		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
