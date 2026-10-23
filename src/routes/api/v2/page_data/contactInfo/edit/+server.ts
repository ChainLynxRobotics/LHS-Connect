import { editRootEndpoints } from '#api/page_data/commonEditEndpoints.ts';
import { linkCardValidator } from '#api/page_data/usefulLinks/validator.ts';
import { ContactInfoLinkCard } from '../model';
import type { RequestEvent } from './$types';

export const { GET, POST } = editRootEndpoints<RequestEvent>(
	'orderedListValue',
	ContactInfoLinkCard,
	linkCardValidator
);
