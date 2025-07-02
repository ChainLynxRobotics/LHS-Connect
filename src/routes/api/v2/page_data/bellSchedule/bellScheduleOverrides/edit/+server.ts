import { editRootEndpoints } from '$api/page_data/commonEditEndpoints';
import { BellScheduleOverride } from '../../model';
import { bellScheduleOverrideValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editRootEndpoints<RequestEvent>(
	'listValue',
	BellScheduleOverride,
	bellScheduleOverrideValidator
);
