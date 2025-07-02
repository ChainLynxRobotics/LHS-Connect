import { editRootEndpoints } from '$api/page_data/commonEditEndpoints';
import { linkCardValidator } from '$api/page_data/usefulLinks/validator';
import { ContactInfoLinkCard } from '../model';
import type { RequestEvent } from './$types';

export const { GET, POST } = editRootEndpoints<RequestEvent>(
	'orderedListValue',
	ContactInfoLinkCard,
	linkCardValidator
);
