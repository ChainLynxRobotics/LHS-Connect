import { editAllEndpoints } from '#api/page_data/commonEditEndpoints.ts';
import { Club } from '../../model';
import { clubValidator } from '../../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editAllEndpoints<RequestEvent>('listValue', Club, clubValidator);
