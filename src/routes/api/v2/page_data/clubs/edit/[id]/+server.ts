import { editIndividualItemEndpoints } from '$api/page_data/commonEditEndpoints';
import { Club } from '../../model';
import { clubValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editIndividualItemEndpoints<RequestEvent>(
	'listValue',
	Club,
	clubValidator
);
