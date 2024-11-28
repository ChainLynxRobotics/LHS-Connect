import type { ISessionUser } from "./user";

export interface ISession {
    id: Buffer;
    user: ISessionUser;
    expires: Date;
}