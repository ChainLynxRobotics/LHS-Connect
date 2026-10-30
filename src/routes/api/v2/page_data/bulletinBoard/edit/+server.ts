import { editRootEndpoints } from '#api/page_data/commonEditEndpoints.ts';
import { BulletinBoardNote } from '../model';
import { bulletinBoardNoteValidator } from '../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editRootEndpoints<RequestEvent>(
	'orderedListValue',
	BulletinBoardNote,
	bulletinBoardNoteValidator
);
