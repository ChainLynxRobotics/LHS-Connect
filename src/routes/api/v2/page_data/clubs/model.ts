import mongoose from "mongoose";
import type { IClub } from "./types";

export const clubSchema = new mongoose.Schema<IClub>({
    name: { type: String, required: true, maxlength: 250 },
    day: { type: String, required: true, maxlength: 250 },
    time: { type: String, required: true, maxlength: 250 },
    location: { type: String, required: true, maxlength: 250 },
    advisor: { type: String, required: true, maxlength: 250 },
    instagram: { type: String, maxlength: 250 },
    desc: { type: String, maxlength: 1000 }
}, {
    timestamps: true
});

export const Club = mongoose.model('Club', clubSchema);