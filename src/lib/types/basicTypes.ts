/**
 * Shared interface for CRUD lists, which need to have an ID field.
 */
export interface IListValue {
    /**
     * The unique identifier for the document, which is a hex string from MongoDB.
     */
    id: string;
    /**
     * The date and time the document was last updated. (ISO 8601 format)
     */
    updatedAt: string;
}

/**
 * Shared interface for CRUD orderable lists, which need to have an ID field and an order field.
 * 
 * The order field is the current index of the document in the list.
 */
export interface IOrderableListValue extends IListValue {
    /**
     * The index of the document in the list.
     */
    order?: number;
}

/**
 * Shared interface for CRUD singleton types, which don't have an ID field because only one instance of the type exists.
 */
export interface ISingleValue {
    /**
     * The date and time the document was last updated. (ISO 8601 format)
     */
    updatedAt: string;
}

/**
 * Removes the "id" field and "updatedAt" field from a type.
 */
export type WithoutID<T> = Omit<Omit<Omit<T, "id">, "updatedAt">, "order">;