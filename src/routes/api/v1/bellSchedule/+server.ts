import { BellScheduleDefaults } from '$lib/models/crud/bellScheduleDefaultsModel';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BellScheduleOverride } from '$lib/models/crud/bellScheduleOverrideModel';
import type { IBellSchedule } from '$lib/types/crud/bellSchedule';
import type { BellScheduleData } from '$lib/types/HomePageData';
import type { IPopulatedBellScheduleOverride } from '$lib/types/crud/bellScheduleOverride';

export const GET: RequestHandler = async ({ }) => {
    const defaultsDoc = await BellScheduleDefaults.findOne().populate('bellSchedules').exec();
    const defaults: IBellSchedule[] = defaultsDoc?.bellSchedules || [];

    const now = new Date();
    const oneWeekAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const overridesDocs = await BellScheduleOverride.find({ date: { $gte: now, $lt: oneWeekAhead } }).populate('schedule').exec();
    const overrides = overridesDocs.map((doc) => doc.toObject() as unknown as IPopulatedBellScheduleOverride);
    
    return json({
        defaults,
        overrides
    } satisfies BellScheduleData);
};