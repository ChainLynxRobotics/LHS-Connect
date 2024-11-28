import type { ISession } from "$lib/types/session";
import type { ISessionUser } from "$lib/types/user";

export const enum Permission {
    /**
     * The owner of the website, has all permissions and can give anybody all permissions
     */
    OWNER = 1 << 30, // Overrides all permissions
    /**
     * Can manage other users, and their permissions (except OWNER)
     */
    MANAGE_USERS = 1 << 29,
    /**
     * Can edit and delete short links
     */
    MANAGE_SHORT_LINKS = 1 << 20,
    /**
     * Can make edits to the website data via the admin panel
     */
    EDIT = 1 << 1,
    /**
     * Can view the admin panel
     */
    VIEW = 1 << 0,
}

export class Permissions {

    private permissions: number;

    constructor(obj?: ISession|ISessionUser|number) {
        if (obj === undefined) {
            this.permissions = 0;
        } else if (typeof obj === "number") {
            this.permissions = obj;
        } else if ('permissions' in obj) {
            this.permissions = obj.permissions;
        } else if ('user' in obj) {
            this.permissions = obj.user.permissions;
        } else {
            this.permissions = 0;
        }
    }
    

    /**
     * @param permission The permission to check
     * @returns If the permission is set
     */
    public has(permission: Permission): boolean {
        return (this.permissions & permission) === permission || (this.permissions & Permission.OWNER) === Permission.OWNER;
    }

    /**
     * Sets the permission to true
     * @param permission The permission to add
     * @returns this, for chaining
     */
    public add(permission: Permission): Permissions {
        this.permissions |= permission;
        return this;
    }

    /**
     * Sets the permission to false
     * @param permission The permission to remove
     * @returns this, for chaining
     */
    public remove(permission: Permission): Permissions {
        this.permissions &= ~permission;
        return this;
    }

    /**
     * Updates the permission to the value
     * @param permission The permission to set
     * @param value The value to set the permission to
     * @returns this, for chaining
     */
    public set(permission: Permission, value: boolean): Permissions {
        if (value) {
            this.add(permission);
        } else {
            this.remove(permission);
        }
        return this;
    }

    /**
     * @returns The permissions as a number
     */
    public get(): number {
        return this.permissions;
    }

    /**
     * @param permissions The permissions as a number to set, effectively overwriting the current instance
     */
    public setPermissions(permissions: number): void {
        this.permissions = permissions;
    }

    /**
     * Creates a new Permissions instance from a number, equivalent to `new Permissions(permissions)`
     * @param permissions The permissions as a number to convert to a Permissions instance
     * @returns The Permissions instance
     */
    public static from(permissions: number): Permissions {
        return new Permissions(permissions);
    }

    /**
     * Checks the permissions of an object
     * @param obj Value to check permissions on, can be a session, user, or permissions number
     * @param permission The permission to check
     * @returns true if the permission is set, false otherwise
     */
    public static has(obj: ISession|ISessionUser|number, permission: Permission): boolean {
        if (typeof obj === "number") {
            return (obj & permission) === permission || (obj & Permission.OWNER) === Permission.OWNER;
        } else if ('permissions' in obj) {
            return this.has(obj.permissions, permission);
        } else if ('user' in obj) {
            return this.has(obj.user.permissions, permission);
        } else {
            return false;
        }
    }
}