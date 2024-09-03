import { array, boolean, object, string, type InferType } from 'yup';

export const timeStringRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export const bellSchedulePeriodSchemaName = string().required().max(64).label('Name');
export const bellSchedulePeriodSchemaTime = string()
	.required()
	.matches(timeStringRegex, 'Time must be in HH:MM format')
	.label('Time');

export const bellSchedulePeriodSchema = object({
	name: bellSchedulePeriodSchemaName,
	start: bellSchedulePeriodSchemaTime,
	end: bellSchedulePeriodSchemaTime,
	emphasis: boolean().optional()
});

const bellScheduleSchema = object({
	name: string().required().max(64),
	desc: string().optional().max(512),
	periods: array().of(bellSchedulePeriodSchema).required().min(1).max(16)
});

export default bellScheduleSchema;

export type BellScheduleSchema = InferType<typeof bellScheduleSchema>;
