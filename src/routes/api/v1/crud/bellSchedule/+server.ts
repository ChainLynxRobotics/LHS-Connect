import { BellSchedule } from '$lib/models/crud/bellScheduleModel';
import { bellScheduleValidation } from '$lib/validation/crud/bellScheduleSchema';
import { getCrudHandlersAtIndex } from '../globalCrud';

const { GET, POST } = getCrudHandlersAtIndex(BellSchedule, bellScheduleValidation);
export { GET, POST }