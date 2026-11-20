import mongoose from 'mongoose';
import { scheduleOverrideSchema } from '$api/page_data/bellSchedule/model';
import type { IBellScheduleOverride } from '$api/page_data/bellSchedule/types';
import type { IEditLog } from './types';
const scheduleOverrideEditSchema = new mongoose.Schema<IEditLog<IBellScheduleOverride>>({
    operation: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete'],
    },
    editedBy: {
        type: String,
        required: true
    },
    data: {
        type: scheduleOverrideSchema,
        required: true,
    }

}, { timestamps: true} );
export const BellScheduleOverrideEdit = mongoose.models.BellScheduleOverrideEdit || mongoose.model<IEditLog<IBellScheduleOverride>>('BellScheduleOverrideEdit', scheduleOverrideEditSchema);