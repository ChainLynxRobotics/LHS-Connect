import { BellSchedule } from '$lib/models/crud/bellScheduleModel';
import { bellScheduleValidation } from '$lib/validation/crud/bellScheduleSchema';
import { getCrudHandlersAtSlug } from '../../globalCrud';

const { GET, PATCH, DELETE } = getCrudHandlersAtSlug(BellSchedule, bellScheduleValidation);
export { GET, PATCH, DELETE }