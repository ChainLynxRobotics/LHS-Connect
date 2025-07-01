import mongoose, { Schema, Model } from "mongoose";

/**
 * Helper function to create or get a cached model by name.
 * 
 * @param name - The name of the model to get or create.
 * @param schema - The schema to use for the model if it does not already exist.
 * @returns The model for the given name, either from the cache or a new model created with the given schema.
 */
export function getModelOrCached<TSchema extends Schema = any>(name: string, schema: TSchema): ReturnType<typeof mongoose.model<TSchema>> {
    return mongoose.models[name] ?? mongoose.model(name, schema);
}

/**
 * Helper function to create or get a cached model by name, using a [discriminator](https://mongoosejs.com/docs/discriminators.html).
 * 
 * @param model - The base model to use for the discriminator.
 * @param name - The name of the model to get or create.
 * @param schema - The schema to use for the model if it does not already exist.
 * @returns The model for the given name, either from the cache or a new model created with the given schema.
 */
export function getDiscriminatorOrCached<TSchema extends Schema = any>(model: Model<any>, name: string, schema: TSchema): ReturnType<typeof model.discriminator<TSchema>> {
    return mongoose.models[name] ?? model.discriminator(name, schema);
}