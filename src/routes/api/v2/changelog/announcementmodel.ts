import mongoose from 'mongoose';
import { announcementSchema } from '$api/page_data/announcement/model';
import { announcementSchema } from '../page_data/announcement/model';
const announcementEditSchema = new mongoose.Schema({
	operation: {
		type: String,
		required: true,
		enum: ['create', 'update', 'delete'],
	},
	data: {
		type: announcementSchema,
		required: true,
	},
});
