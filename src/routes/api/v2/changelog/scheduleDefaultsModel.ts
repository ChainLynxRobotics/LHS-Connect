import mongoose from 'mongoose';
import { bellScheduleDefaultsSchema } from '$api/page_data/bellSchedule/model';
const scheduleDefaultEditSchema = new mongoose.Schema({
    operation: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete'],
    },
    data: {
        type: bellScheduleDefaultsSchema,
        required: true,
    }

}, { timestamps: true} );
