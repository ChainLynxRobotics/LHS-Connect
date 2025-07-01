import { Permission } from '$lib/auth/permissions';
import { ShortLink } from '$lib/models/shortLinkModel';
import { idValidator } from '$lib/validation/objectId';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { error, json } from '@sveltejs/kit';
import { ValidationError } from 'yup';
import type { RequestHandler } from './$types';
import bcryptjs from 'bcryptjs';

export const POST: RequestHandler = async ({ locals, params }) => {
    if (!locals.permissions.has(Permission.MANAGE_SHORT_LINKS)) error(403, "You do not have permission to manage short links.");

    try {
        const id = idValidator.validateSync(params['id']);

        // Find and update doc in db
        const doc = await ShortLink.findById(id).exec();
        if (doc === null) return error(404, { message: "Not found" });

        // Generate new password
        const bytes = new Uint8Array(10);
        crypto.getRandomValues(bytes);
        const password = encodeBase32LowerCaseNoPadding(bytes);

        const hash = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
        doc.hash = hash;
        await doc.save();

        return json({
            password
        })
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};