import mongoose from 'mongoose';
import { scheduleOverrideSchema } from '$api/page_data/bellSchedule/model';
const scheduleOverrideEditSchema = new mongoose.Schema({
    operation: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete'],
    },
    data: {
        type: scheduleOverrideSchema,
        required: true,
    }

}, { timestamps: true} );
