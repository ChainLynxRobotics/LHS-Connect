import mongoose from 'mongoose';
import { clubSchema } from '$api/page_data/clubs/model';
import type { IClub } from '$api/page_data/clubs/types';
import type { IEditLog } from './types';
const  clubEditSchema = new mongoose.Schema<IEditLog<IClub>>({
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
        type: clubSchema,
        required: true,
    }

}, { timestamps: true} );
/* 
I believe this checks if it exists, but im not sure how the model would get made twice. 
Stole this from elsewhere in the codebase. 
*/
export const ClubEdit = mongoose.models.ClubEdit || mongoose.model<IEditLog<IClub>>('ClubEdit', clubEditSchema);