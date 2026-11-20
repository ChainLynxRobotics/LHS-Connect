import mongoose from 'mongoose';
import { bellScheduleDefaultsSchema } from '$api/page_data/bellSchedule/model';
import type { IBellScheduleDefaults } from '$api/page_data/bellSchedule/types';
import type { IEditLog } from './types';
const scheduleDefaultEditSchema = new mongoose.Schema<IEditLog<IBellScheduleDefaults>>(
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
			type: bellScheduleDefaultsSchema,
			required: true,
		},
	},
	{ timestamps: true }
);
export const BellScheduleDefaultsEdit =
	mongoose.models.BellScheduleDefaultsEdit ||
	mongoose.model<IEditLog<IBellScheduleDefaults>>(
		'BellScheduleDefaultsEdit',
		scheduleDefaultEditSchema
	);
