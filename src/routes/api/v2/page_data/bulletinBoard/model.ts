import urlRegex from "$lib/validation/url";
import mongoose from "mongoose";
import type { IBulletinBoardNote } from "./types";

export const bulletinBoardNoteSchema = new mongoose.Schema<IBulletinBoardNote>({
	title: { type: String, required: true, minlength: 1, maxlength: 256 },
	content: { type: String, required: true, minlength: 1, maxlength: 2048 },
	link: { type: String, match: urlRegex, maxlength: 1024 },
    order: {
        type: Number,
        required: true,
        select: false,
    },
}, {
	timestamps: true,
})

export const BulletinBoardNote = mongoose.model('BulletinBoardNote', bulletinBoardNoteSchema);