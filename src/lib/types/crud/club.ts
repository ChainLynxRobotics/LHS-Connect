import type { ICrudType } from "./globalCrud";

/**
 * Represents a club on the club page.
 */
export interface IClub extends ICrudType {
	name: string;
	day: string;
	time: string;
	location: string;
	advisor: string;
	instagram?: string; // No '@' symbol, just the username
	desc?: string;
}
