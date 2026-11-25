import { ClubEdit } from '$api/changelog/clubModel';
import { editAllEndpoints } from '$api/page_data/commonEditEndpoints';
import { Club } from '../../model';
import { clubValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editAllEndpoints<RequestEvent>(
	'listValue',
	Club,
	clubValidator,
	ClubEdit
);
