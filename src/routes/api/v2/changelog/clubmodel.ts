const mongoose = require('mongoose');
import bulletinBoardNoteSchema from '$routes/api/v2/page_data/bulletinBoard/model.ts';
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

});