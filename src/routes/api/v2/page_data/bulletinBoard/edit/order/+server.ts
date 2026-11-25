import { BulletinEdit } from '$api/changelog/bulletinModel';
import { editOrderEndpoints } from '$api/page_data/commonEditEndpoints';
import { BulletinBoardNote } from '../../model';
import { bulletinBoardNoteValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editOrderEndpoints<RequestEvent>(
	'orderedListValue',
	BulletinBoardNote,
	bulletinBoardNoteValidator,
	BulletinEdit
);
