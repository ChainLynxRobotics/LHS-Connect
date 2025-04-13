import type { IBulletinBoardNote } from "$lib/types/crud/bulletinBoard";
import urlRegex from "$lib/validation/url";
import mongoose, { Model } from "mongoose";
import { crudOrderableSchema } from "../globalCrudModel";

export const bulletinBoardNoteSchema = new mongoose.Schema<IBulletinBoardNote>({
	title: { type: String, required: true, minlength: 1, maxlength: 256 },
	content: { type: String, required: true, minlength: 1, maxlength: 2048 },
	link: { type: String, match: urlRegex, maxlength: 1024 }
}).add(crudOrderableSchema); // Extends the crudOrderableSchema

export const BulletinBoardNote: Model<IBulletinBoardNote> = mongoose.models.BulletinBoardNote ?? mongoose.model('BulletinBoardNote', bulletinBoardNoteSchema);
