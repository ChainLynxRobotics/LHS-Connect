import { array, boolean, object, ObjectSchema, string } from 'yup';
import type { IBellSchedule } from '$lib/types/crud/bellSchedule';
import type { WithoutID } from '$lib/types/crud/globalCrud';

export const TIME_STRING_REGEX = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export const bellSchedulePeriodNameValidator = string().required().max(64).label('Name');
export const bellSchedulePeriodTimeValidator = string()
	.required()
	.matches(TIME_STRING_REGEX, 'Time must be in HH:MM format')
	.label('Time');

export const bellSchedulePeriodValidator = object({
	name: bellSchedulePeriodNameValidator,
	start: bellSchedulePeriodTimeValidator,
	end: bellSchedulePeriodTimeValidator,
	emphasis: boolean().optional()
});

export default object({
	name: string().required().max(64),
	desc: string().optional().max(512),
	periods: array().of(bellSchedulePeriodValidator).required().min(1).max(16)
}) as ObjectSchema<WithoutID<IBellSchedule>>;
