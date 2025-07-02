import type { RequestEvent } from './$types';
import { editRootEndpoints } from '$api/page_data/commonEditEndpoints';
import { Announcement } from '../model';
import { announcementValidator } from '../validator';

export const { GET, POST } = editRootEndpoints<RequestEvent>(
	'singleValue',
	Announcement,
	announcementValidator
);
