import mongoose from 'mongoose';
import bulletinBoardNoteSchema from '$api/page_data/clubs/model.ts';
const { clubSchema } = new mongoose.Schema({
    operation: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete'],
    },
    data: {
        type: bulletinBoardNoteSchema,
        required: true,
    }

});
