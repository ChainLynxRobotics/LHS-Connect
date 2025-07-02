import mongoose from 'mongoose';
import type { ILinkCard } from './types';

export const linkCardSchema = new mongoose.Schema<ILinkCard>(
	{
		title: { type: String, required: true, maxlength: 64 },
		subtitle: { type: String, maxlength: 256 },
		links: [
			{
				title: { type: String, required: true, maxlength: 64 },
				url: { type: String, required: true, maxlength: 512 },
			},
		],
		order: {
			type: Number,
			required: true,
			select: false,
		},
	},
	{
		timestamps: true,
	}
);

export const UsefulLinksLinkCard = mongoose.model('UsefulLinksLinkCard', linkCardSchema);
