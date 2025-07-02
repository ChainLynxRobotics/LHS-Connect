import mongoose from "mongoose";
import type { IShortLink } from "./types";

export const shortLinkSchema = new mongoose.Schema<IShortLink>({
    url: { type: String, required: true, maxlength: 2048 },
    suffix: { type: String, required: true, maxlength: 32 },
    hash: { type: String, select: false },
    createdAt: { type: Number, required: true },
    uses: { type: Number, default: 0 }
}, {
    virtuals: {
        hasPassword: {
            get(this: IShortLink) {
                return this.hash !== undefined;
            }
        }
    }
});
shortLinkSchema.index({ suffix: "text", url: "text" });

export const ShortLink = mongoose.model('ShortLink', shortLinkSchema);