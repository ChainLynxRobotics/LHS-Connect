import urlRegex from "$lib/validation/url";
import mongoose from "mongoose";
import type { IBulletinBoardNote } from "./types";
import { getModelOrCached } from "$lib/models/modelUtil";

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

export const BulletinBoardNote = getModelOrCached('BulletinBoardNote', bulletinBoardNoteSchema);