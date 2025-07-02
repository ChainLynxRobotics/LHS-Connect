import { editRootEndpoints } from '$api/page_data/commonEditEndpoints';
import { BellSchedule } from '../../model';
import { bellScheduleValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editRootEndpoints<RequestEvent>("orderedListValue", BellSchedule, bellScheduleValidator);