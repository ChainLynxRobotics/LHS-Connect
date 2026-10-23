import { editOrderEndpoints } from '#api/page_data/commonEditEndpoints.js';
import { linkCardValidator } from '#api/page_data/usefulLinks/validator.js';
import { ContactInfoLinkCard } from '../../model';
import type { RequestEvent } from './$types';

export const { GET, POST } = editOrderEndpoints<RequestEvent>(
	'orderedListValue',
	ContactInfoLinkCard,
	linkCardValidator
);
