import mongoose from "mongoose";

/**
 * This schema is the base for all the key-value pairs that will be stored in the database.
 * The keys are in the discriminator key, and the values are in the discriminator schema.
 */
export const crudSchema = new mongoose.Schema({});

/**
 * The base model for all the key-value pairs that will be stored in the database.
 */
export const Crud = mongoose.model('Crud', crudSchema);