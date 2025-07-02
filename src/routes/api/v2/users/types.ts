export interface IUser extends ISessionUser {
	id: string;
	googleId: string;
	name: string;
	email: string;
	pfp: string;
	permissions: number;
	firstLogin: Date;
	lastLogin: Date;
}

export interface ISerializedUser extends ISessionUser {
	firstLogin: string;
	lastLogin: string;
}

export interface ISessionUser {
	id: string;
	name: string;
	email: string;
	pfp: string;
	permissions: number;
}

export interface IAdminUserUpdate {
	permissions: number;
}
