import { MONGO_DB_URI } from '$env/static/private'
import mongoose from 'mongoose';

export default async function connect() {
    mongoose.set('toJSON', {
        virtuals: true,
        versionKey:false,
        transform: function (doc, ret) {   delete ret._id  }
    });
    mongoose.set('toObject', {
        virtuals: true,
        versionKey:false,
        transform: function (doc, ret) {   delete ret._id  }
    });
    return await mongoose.connect(MONGO_DB_URI);
}