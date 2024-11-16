/**
 * Shared interface for all CRUD data types.
 */
export interface ICrudType {
    /**
     * The unique identifier for the document, which is a hex string from MongoDB.
     */
    id: string;
}

export type WithoutID<T> = Omit<T, "id">;