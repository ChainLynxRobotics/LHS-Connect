import type { ISessionUser } from "$api/users/types";

export interface ISession {
    id: Buffer;
    user: ISessionUser;
    expires: Date;
}