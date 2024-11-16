import type { IBulletinBoardNote } from "$lib/types/crud/bulletinBoard";
import urlRegex from "$lib/validation/url";
import mongoose from "mongoose";

export const bulletinBoardNoteSchema = new mongoose.Schema<IBulletinBoardNote>({
	title: { type: String, required: true, minlength: 1, maxlength: 64 },
	content: { type: String, required: true, minlength: 1, maxlength: 512 },
	link: { type: String, match: urlRegex, maxlength: 1024 }
});

export const BulletinBoardNote = mongoose.model('BulletinBoardNote', bulletinBoardNoteSchema);
