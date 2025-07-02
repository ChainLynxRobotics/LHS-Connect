import { editRootEndpoints } from '$api/page_data/commonEditEndpoints';
import { Club } from '../model';
import { clubValidator } from '../validator';
import type { RequestEvent } from './$types';

export const { GET, POST } = editRootEndpoints<RequestEvent>("listValue", Club, clubValidator);