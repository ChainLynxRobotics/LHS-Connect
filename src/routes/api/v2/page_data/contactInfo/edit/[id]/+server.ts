import { editIndividualItemEndpoints } from '#api/page_data/commonEditEndpoints.js';
import { linkCardValidator } from '#api/page_data/usefulLinks/validator.js';
import { ContactInfoLinkCard } from '../../model';
import type { RequestEvent } from './$types';

export const { GET, PATCH, DELETE } = editIndividualItemEndpoints<RequestEvent>(
	'orderedListValue',
	ContactInfoLinkCard,
	linkCardValidator
);
