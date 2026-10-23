import { editOrderEndpoints } from '#api/page_data/commonEditEndpoints.js';
import { BellSchedule } from '../../../model';
import { bellScheduleValidator } from '../../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editOrderEndpoints<RequestEvent>(
	'orderedListValue',
	BellSchedule,
	bellScheduleValidator
);
