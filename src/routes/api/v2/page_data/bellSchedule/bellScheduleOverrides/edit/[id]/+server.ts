import { editIndividualItemEndpoints } from '$api/page_data/commonEditEndpoints';
import { BellScheduleOverride } from '../../../model';
import { bellScheduleOverrideValidator } from '../../../validator';
import type { RequestEvent } from './$types';

export const { GET, PATCH, DELETE } = editIndividualItemEndpoints<RequestEvent>(
	'listValue',
	BellScheduleOverride,
	bellScheduleOverrideValidator
);
