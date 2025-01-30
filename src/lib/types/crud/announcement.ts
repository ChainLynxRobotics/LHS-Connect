import type { ICrudSingletonType } from "./globalCrud";

/**
 * The announcement at the top of all pages
 */
export interface IAnnouncement extends ICrudSingletonType {
    text: string;
}