import { editIndividualItemEndpoints } from '#api/page_data/commonEditEndpoints.ts';
import { BulletinBoardNote } from '../../model';
import { bulletinBoardNoteValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, PATCH, DELETE } = editIndividualItemEndpoints<RequestEvent>(
	'orderedListValue',
	BulletinBoardNote,
	bulletinBoardNoteValidator
);
