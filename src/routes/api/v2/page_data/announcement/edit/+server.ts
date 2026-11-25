import type { RequestEvent } from './$types';
import { editRootEndpoints } from '$api/page_data/commonEditEndpoints';
import { Announcement } from '../model';
import { announcementValidator } from '../validator';
import { AnnounceEdit } from '$api/changelog/announcementModel';

export const { GET, POST } = editRootEndpoints<RequestEvent>(
	'singleValue',
	Announcement,
	announcementValidator,
	AnnounceEdit
);
