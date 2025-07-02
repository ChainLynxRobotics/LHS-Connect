import { editIndividualItemEndpoints } from '$api/page_data/commonEditEndpoints';
import { BellScheduleOverride } from '../../../model';
import { bellScheduleOverrideValidator } from '../../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editIndividualItemEndpoints<RequestEvent>("orderedListValue", BellScheduleOverride, bellScheduleOverrideValidator);