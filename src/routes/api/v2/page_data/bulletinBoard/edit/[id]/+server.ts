import { editIndividualItemEndpoints } from '$api/page_data/commonEditEndpoints';
import { BulletinBoardNote } from '../../model';
import { bulletinBoardNoteValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editIndividualItemEndpoints<RequestEvent>(
	'orderedListValue',
	BulletinBoardNote,
	bulletinBoardNoteValidator
);
