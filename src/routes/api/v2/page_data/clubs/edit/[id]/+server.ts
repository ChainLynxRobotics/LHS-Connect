import { editIndividualItemEndpoints } from '$api/page_data/commonEditEndpoints';
import { Club } from '../../model';
import { clubValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, PATCH, DELETE } = editIndividualItemEndpoints<RequestEvent>(
	'listValue',
	Club,
	clubValidator
);
