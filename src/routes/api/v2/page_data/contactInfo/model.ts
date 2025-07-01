import mongoose from "mongoose";
import { linkCardSchema } from "../usefulLinks/model";

// We can reuse the linkCardSchema from the usefulLinks model because it is the same structure
export const ContactInfoLinkCard = mongoose.model('UsefulLinksLinkCard', linkCardSchema);