import type { ICrudListType, ICrudOrderableType } from "$lib/types/crud/globalCrud";
import mongoose, { Model } from "mongoose";

/**
 * This schema is the base for all the key-value pairs that will be stored in the database.
 * The keys are in the discriminator key, and the values are in the discriminator schema.
 */
export const crudSingletonSchema = new mongoose.Schema({}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) { delete ret.__t; delete ret._id; }
    },
    toObject: {
        virtuals: true,
        transform: function (doc, ret) { delete ret.__t; delete ret._id; }
    }
});

/**
 * This schema is the base for all the lists of data that will be stored in the database.
 */
export const crudCollectionSchema = new mongoose.Schema<ICrudListType>({});

/**
 * This schema is the same as the {@link crudSingletonSchema} but with an added field "order" to make it reorderable.
 */
export const crudOrderableSchema = new mongoose.Schema<ICrudOrderableType>({
    order: {
        type: Number,
        required: true,
        select: false,
    },
}).add(crudCollectionSchema); // Extends the crudCollectionSchema

/**
 * The base model for all the single doc information that will be stored in the database.
 * 
 * This is its own model because the other types will use a discriminator to separate the different types of data.
 */
export const CrudSingleton = mongoose.models.CrudSingleton ?? mongoose.model('CrudSingleton', crudSingletonSchema);

