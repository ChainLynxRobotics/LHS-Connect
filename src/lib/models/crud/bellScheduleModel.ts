import { type IBellSchedule } from "$lib/types/crud/bellSchedule";
import { TIME_STRING_REGEX } from "$lib/validation/crud/bellScheduleSchema";
import mongoose from "mongoose";
import { crudOrderableSchema } from "../globalCrudModel";

export const bellScheduleSchema = new mongoose.Schema<IBellSchedule>({
	name: { type: String, required: true, maxlength: 64 },
	desc: { type: String, maxlength: 512 },
	periods: [{
		name: { type: String, required: true, maxlength: 64 },
		start: { type: String, required: true, match: TIME_STRING_REGEX },
		end: { type: String, required: true, match: TIME_STRING_REGEX },
		emphasis: { type: Boolean }
	}]
}).add(crudOrderableSchema); // Extends the crudOrderableSchema

export const BellSchedule = mongoose.model('BellSchedule', bellScheduleSchema); // List of bell schedules