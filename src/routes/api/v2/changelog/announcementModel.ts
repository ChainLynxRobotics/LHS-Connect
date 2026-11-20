import mongoose from 'mongoose';
import { announcementSchema } from '$api/page_data/announcement/model';
import type { IAnnouncement } from '$api/page_data/announcement/types';
import type { IEditLog } from './types';
const announcementEditSchema = new mongoose.Schema<IEditLog<IAnnouncement>>(
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
			type: announcementSchema,
			required: true,
		},
	},
	{ timestamps: true }
);
export const announceEdit =
	mongoose.models.AnnounceEdit ||
	mongoose.model<IEditLog<IAnnouncement>>('AnnounceEdit', announcementEditSchema);
