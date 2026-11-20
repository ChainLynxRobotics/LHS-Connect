import mongoose from 'mongoose';
import { bulletinBoardNoteSchema } from '$api/page_data/bulletinBoard/model';
import type { IBulletinBoardNote } from '$api/page_data/bulletinBoard/types';
import type { IEditLog } from './types';
const bulletinSchema = new mongoose.Schema<IEditLog<IBulletinBoardNote>>({
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
export const bulletinEdit = mongoose.models.bulletinEdit || mongoose.model<IEditLog<IBulletinBoardNote>>('BulletinEdit', bulletinSchema);