/**
 * Shared interface for CRUD lists, which need to have an ID field.
 */
export interface ICrudListType {
    /**
     * The unique identifier for the document, which is a hex string from MongoDB.
     */
    id: string;
}

/**
 * Removes the ID field from a type.
 */
export type WithoutID<T> = Omit<T, "id">;