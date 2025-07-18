import mongoose from 'mongoose';
import type { IContactUsMessage } from './types';

export const contactUsMessageSchema = new mongoose.Schema<IContactUsMessage>({
	name: { type: String, required: false, maxlength: 256 },
	email: { type: String, required: false, maxlength: 256 },
	type: { type: String, required: true, maxlength: 256 },
	message: { type: String, required: true, maxlength: 1024 },
});

export const ContactUsMessage = mongoose.model('ContactMessage', contactUsMessageSchema);
