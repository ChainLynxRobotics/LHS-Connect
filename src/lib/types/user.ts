export type IUser = {
    id: string;
    googleId: string;
    name: string;
    email: string;
    pfp: string;
    permissions: number;
    firstLogin: Date;
    lastLogin: Date;
}