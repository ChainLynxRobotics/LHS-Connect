import { getModelOrCached } from "$lib/models/modelUtil";
import { linkCardSchema } from "../usefulLinks/model";

// We can reuse the linkCardSchema from the usefulLinks model because it is the same structure
export const ContactInfoLinkCard = getModelOrCached('UsefulLinksLinkCard', linkCardSchema);