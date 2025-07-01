import type { IListValue } from "$lib/types/basicTypes";

/**
 * Represents a club on the club page.
 */
export interface IClub extends IListValue {
    name: string;
    day: string;
    time: string;
    location: string;
    advisor: string;
    instagram?: string; // No '@' symbol, just the username
    desc?: string;
}