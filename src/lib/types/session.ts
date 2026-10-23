import type { ISessionUser } from '#api/users/types.ts';

export interface ISession {
	id: Buffer;
	user: ISessionUser;
	expires: Date;
}
