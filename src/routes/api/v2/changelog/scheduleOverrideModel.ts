import mongoose from 'mongoose';
import { scheduleOverrideSchema } from '$api/page_data/bellSchedule/model';
const bellScheduleEditSchema = new mongoose.Schema({
	operation: {
		type: String,
		required: true,
		enum: ['create', 'update', 'delete'],
	},
	data: {
		type: scheduleOverrideSchema,
		required: true,
	},
});
