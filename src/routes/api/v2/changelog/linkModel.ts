import mongoose from 'mongoose';
import { linkCardSchema } from '$api/page_data/usefulLinks/model';
import type { ILinkCard } from '$api/page_data/usefulLinks/types';
import type { IEditLog } from './types';
const linksEditSchema = new mongoose.Schema<IEditLog<ILinkCard>>({
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
        type: linkCardSchema,
        required: true,
    }

}, { timestamps: true} );
export const linksEdit = mongoose.models.linksEdit || mongoose.model<IEditLog<ILinkCard>>('linksEdit', linksEditSchema);
