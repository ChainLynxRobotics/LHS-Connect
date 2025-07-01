import mongoose from "mongoose";
import type { ILinkCard } from "./types";
import { getModelOrCached } from "$lib/models/modelUtil";

export const linkCardSchema = new mongoose.Schema<ILinkCard>({
    title: { type: String, required: true, maxlength: 64 },
    subtitle: { type: String, maxlength: 256 },
    links: [{
        title: { type: String, required: true, maxlength: 64 },
        url: { type: String, required: true, maxlength: 512 }
    }],
    order: {
        type: Number,
        required: true,
        select: false,
    },
}, {
    timestamps: true,
});

export const UsefulLinksLinkCard = getModelOrCached('UsefulLinksLinkCard', linkCardSchema);