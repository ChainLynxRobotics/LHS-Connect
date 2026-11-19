import mongoose from 'mongoose';
import { clubSchema } from '$api/page_data/clubs/model.ts';
const clubEditSchema = new mongoose.Schema({
	operation: {
		type: String,
		required: true,
		enum: ['create', 'update', 'delete'],
	},
	data: {
		type: clubSchema,
		required: true,
	},
});
