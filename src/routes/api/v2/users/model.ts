import mongoose from 'mongoose';
import type { IUser } from './types';

export const userSchema = new mongoose.Schema<IUser>({
	googleId: { type: String, required: true, unique: true, select: false },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	pfp: { type: String, required: true },
	permissions: { type: Number, required: true },
	firstLogin: { type: Date, required: true, immutable: true, select: false },
	lastLogin: { type: Date, select: false },
});
userSchema.index({ name: 'text', email: 'text' });
userSchema.index({ permissions: 1 });

export const User = mongoose.model('User', userSchema);
