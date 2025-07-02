import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BellScheduleDefaults, BellScheduleOverride } from './model';
import type { IBellSchedule, IPopulatedBellScheduleOverride } from './types';

export const GET: RequestHandler = async ({}) => {
	const defaultsDoc = await BellScheduleDefaults.findOne().populate('bellSchedules').exec();
	const defaults: IBellSchedule[] = defaultsDoc?.bellSchedules || [];

	const now = new Date();
	const startOfDay = new Date(now.setHours(0, 0, 0, 0));
	const oneWeekAhead = new Date(startOfDay.getTime() + 7 * 24 * 60 * 60 * 1000);
	const overridesDocs = await BellScheduleOverride.find({
		date: { $gte: startOfDay, $lt: oneWeekAhead },
	})
		.populate('schedule')
		.exec();
	const overrides = overridesDocs.map(
		(doc) => doc.toObject() as unknown as IPopulatedBellScheduleOverride
	);

	return json({
		defaults,
		overrides,
	});
};
