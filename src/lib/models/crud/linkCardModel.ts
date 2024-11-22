import type { ILinkCard } from "$lib/types/crud/linkCard";
import mongoose from "mongoose";
import { crudOrderableSchema } from "../globalCrudModel";

export const linkCardSchema = new mongoose.Schema<ILinkCard>({
	title: { type: String, required: true, maxlength: 64 },
	subtitle: { type: String, maxlength: 256 },
	links: [{
		title: { type: String, required: true, maxlength: 64 },
		url: { type: String, required: true, maxlength: 512 }
	}]
}).add(crudOrderableSchema); // Extends the crudOrderableSchema

export const ContactInfoLinkCard = mongoose.model('ContactInfoLinkCard', linkCardSchema);
export const UsefulLinksLinkCard = mongoose.model('UsefulLinksLinkCard', linkCardSchema);
