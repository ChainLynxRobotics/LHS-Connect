import mongoose from 'mongoose';
import { bulletinBoardNoteSchema } from '$api/page_data/bulletinBoard/model';
const bulletinSchema = new mongoose.Schema({
    operation: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete'],
    },
    data: {
        type: bulletinBoardNoteSchema,
        required: true,
    }

}, { timestamps: true} );
