import { MONGO_DB_URI } from '$env/static/private'
import mongoose from 'mongoose';
import { dev } from '$app/environment';

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
    const db = dev ? 'dev' : 'prod';
    return await mongoose.connect(MONGO_DB_URI, { dbName: db });
}

export async function getFileBucket() {
    if (!mongoose.connection.db) await connect();
    if (!mongoose.connection.db) throw new Error('MongoDB connection failed');
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'files' });
}

export function startFileClearInterval() {
    setInterval(async () => {
        const bucket = await getFileBucket();
        const files = await bucket.find({}).toArray();
        const now = Date.now();
        files.forEach(async file => {
            if (file.uploadDate.getTime() < now - 15 * 60 * 1000) { // 15 minutes
                await bucket.delete(file._id);
            }
        });
    }, 60 * 1000); // Every minute
    console.log('File clear interval started');
}