import { editIndividualItemEndpoints } from '$api/page_data/commonEditEndpoints';
import { linkCardValidator } from '$api/page_data/usefulLinks/validator';
import { ContactInfoLinkCard } from '../../model';
import type { RequestEvent } from './$types';

export const { GET, PATCH, DELETE } = editIndividualItemEndpoints<RequestEvent>(
	'orderedListValue',
	ContactInfoLinkCard,
	linkCardValidator
);
