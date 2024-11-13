/**
 * Represents a club on the club page.
 */
export interface Club {
	id: number;
	name: string;
	day: string;
	time: string;
	location: string;
	advisor: string;
	instagram?: string; // No '@' symbol, just the username
	desc?: string;
}

/**
 * Represents the data for the club page, with a list of clubs below it.
 */
export interface ClubPageData {
	clubs: Club[];
}
