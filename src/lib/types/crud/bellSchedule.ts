import type { ICrudListType } from "./globalCrud";

/**
 * Declares the structure of a bell schedule
 */
export interface IBellSchedule extends ICrudListType {
	name: string;
	desc?: string;
	periods: {
		name: string;
		start: string;
		end: string;
		emphasis?: boolean;
	}[];
}