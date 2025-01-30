import mongoose from "mongoose";

export const contactMessageSchema = new mongoose.Schema({
    name: { type: String, required: false, maxlength: 256 },
    email: { type: String, required: false, maxlength: 256 },
    type: { type: String, required: true, maxlength: 256 },
    message: { type: String, required: true, maxlength: 1024 },
});

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);