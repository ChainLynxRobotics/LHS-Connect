import { array, boolean, object, ObjectSchema, string } from 'yup';
import type { IBellSchedule } from '$lib/types/crud/bellSchedule';
import type { WithoutID } from '$lib/types/crud/globalCrud';

export const TIME_STRING_REGEX = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export const bellSchedulePeriodNameValidation = string().required().max(64).label('Name');
export const bellSchedulePeriodTimeValidation = string()
	.required()
	.matches(TIME_STRING_REGEX, 'Time must be in HH:MM format')
	.label('Time');

export const bellSchedulePeriodValidation = object({
	name: bellSchedulePeriodNameValidation,
	start: bellSchedulePeriodTimeValidation,
	end: bellSchedulePeriodTimeValidation,
	emphasis: boolean().optional()
});

export const bellScheduleValidation: ObjectSchema<WithoutID<IBellSchedule>> = object({
	name: string().required().max(64),
	desc: string().optional().max(512),
	periods: array().of(bellSchedulePeriodValidation).required().min(1).max(16)
});
