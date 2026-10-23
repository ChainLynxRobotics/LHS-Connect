import { editRootEndpoints } from '#api/page_data/commonEditEndpoints.ts';
import { BellScheduleDefaults } from '../../model';
import { bellScheduleDefaultsValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editRootEndpoints<RequestEvent>(
	'singleValue',
	BellScheduleDefaults,
	bellScheduleDefaultsValidator
);
