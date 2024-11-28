import type { IUser } from "./user";

export type ISession = {
    id: Buffer;
    user: IUser;
    expires: Date;
}