import { editIndividualItemEndpoints } from '$api/page_data/commonEditEndpoints';
import { BellSchedule } from '../../../model';
import { bellScheduleValidator } from '../../../validator';
import type { RequestEvent } from './$types';

export const { GET, PATCH, DELETE } = editIndividualItemEndpoints<RequestEvent>(
	'orderedListValue',
	BellSchedule,
	bellScheduleValidator
);
