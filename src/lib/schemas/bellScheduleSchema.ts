import mongoose from 'mongoose';
import { array, boolean, number, object, ObjectSchema, string, type InferType } from 'yup';

export interface BellSchedule {
	id: number;
	name: string;
	desc?: string;
	periods: {
		name: string;
		start: string;
		end: string;
		emphasis?: boolean;
	}[];
}

const timeStringRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const periodNameValidation = string().required().max(64).label('Name');
const periodTimeValidation = string()
	.required()
	.matches(timeStringRegex, 'Time must be in HH:MM format')
	.label('Time');

const periodValidation = object({
	name: periodNameValidation,
	start: periodTimeValidation,
	end: periodTimeValidation,
	emphasis: boolean().optional()
});

const validation: ObjectSchema<BellSchedule> = object({
	id: number().required(),
	name: string().required().max(64),
	desc: string().optional().max(512),
	periods: array().of(periodValidation).required().min(1).max(16)
});

const schema = new mongoose.Schema<BellSchedule>({
	name: { type: String, required: true, maxlength: 64 },
	desc: { type: String, maxlength: 512 },
	periods: [{
		name: { type: String, required: true, maxlength: 64 },
		start: { type: String, required: true, match: timeStringRegex },
		end: { type: String, required: true, match: timeStringRegex },
		emphasis: { type: Boolean }
	}]
});

const Model = mongoose.model('BellSchedule', schema);

export default {
	periodNameValidation,
	periodTimeValidation,
	periodValidation,
	validation,
	Model
};
