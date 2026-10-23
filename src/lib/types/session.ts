import type { ISessionUser } from '#api/users/types.js';

export interface ISession {
	id: Buffer;
	user: ISessionUser;
	expires: Date;
}
