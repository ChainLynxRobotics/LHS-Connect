import { editIndividualItemEndpoints } from '$api/page_data/commonEditEndpoints';
import { UsefulLinksLinkCard } from '../../model';
import { linkCardValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editIndividualItemEndpoints<RequestEvent>(
	'orderedListValue',
	UsefulLinksLinkCard,
	linkCardValidator
);
