import mongoose from 'mongoose';
import type { IEditLog } from './types';

export interface IChange<T = string> {
	old?: T;
	new?: T;
}

export interface IShortLinkEditData {
	url?: IChange<string>;
	suffix?: IChange<string>;
	pwHash?: IChange<string>;
}

const changeSchema = new mongoose.Schema(
	{
		old: { type: String, trim: true },
		new: { type: String, trim: true },
	},
	{ _id: false }
);
// I didn't use the short link schema because we need different data.
// possibly find a way to incorporate without redundant information.
const shortLinkDataSchema = new mongoose.Schema<IShortLinkEditData>(
	{
		url: changeSchema,
		suffix: changeSchema,
		pwHash: changeSchema,
	},
	{ _id: false }
);

const shortLinkEditSchema = new mongoose.Schema<IEditLog<IShortLinkEditData>>(
	{
		operation: {
			type: String,
			required: true,
			enum: ['create', 'update', 'delete'],
		},
		editedBy: {
			type: String,
			required: true,
		},
		data: {
			type: shortLinkDataSchema,
			required: true,
		},
	},
	{ timestamps: true, capped: 5000000 }
);

export const ShortLinkEdit =
	mongoose.models.ShortLinkEdit ||
	mongoose.model<IEditLog<IShortLinkEditData>>('ShortLinkEdit', shortLinkEditSchema);
