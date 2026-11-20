import mongoose from 'mongoose';
import { bellScheduleSchema } from '$api/page_data/bellSchedule/model';
import type { IBellSchedule } from '$api/page_data/bellSchedule/types';
import type { IEditLog } from './types';
const bellScheduleEditSchema = new mongoose.Schema<IEditLog<IBellSchedule>>({
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
        type: bellScheduleSchema,
        required: true,
    }

}, { timestamps: true} );
export const BellScheduleEdit = mongoose.models.BellScheduleEdit || mongoose.model<IEditLog<IBellSchedule>>('BellScheduleEdit', bellScheduleEditSchema);