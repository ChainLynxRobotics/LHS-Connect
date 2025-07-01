import { error, json } from '@sveltejs/kit';
import { ValidationError } from 'yup';
import type { RequestHandler } from './$types';
import { ShortLink } from './model';
import { shortLinkCreateValidator, shortLinkSuffixValidator, shortLinkUrlUpdateValidator } from './validator';
import bcryptjs from "bcryptjs";

// When generating a new short link
export const POST: RequestHandler = async ({ request }) => {
    try {
        const req = await request.json();
        const validatedReq = await shortLinkCreateValidator.validate(req, { stripUnknown: true });

        const existing = await ShortLink.findOne({ suffix: validatedReq.suffix });
        if (existing) return error(409, { message: 'Short link already in use' });

        const shortLink = new ShortLink({
            suffix: validatedReq.suffix,
            url: validatedReq.url,
            createdAt: Date.now(),
            uses: 0,
        });

        if (validatedReq.password) {
            const hash = await bcryptjs.hash(validatedReq.password, await bcryptjs.genSalt(10));
            shortLink.hash = hash;
        }

        await shortLink.save();
        
        return json({});
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};

// When "verifying" the link
export const GET: RequestHandler = async ({ url }) => {
    try {
        const suffix = await shortLinkSuffixValidator.validate(url.searchParams.get('suffix'));
        const password = await shortLinkSuffixValidator.validate(url.searchParams.get('password'));

        const found = await ShortLink.findOne({ suffix: suffix }).select('+hash');
        if (!found) return error(404, { message: 'Short link not found' });

        if (!found.hash) return error(401, { message: 'Short link has no password, and cannot be viewed. If you would still like to view/edit the info, contact us on the about page.' });

        // Compare the password
        const match = await bcryptjs.compare(password, found.hash);
        if (!match) return error(401, { message: 'Incorrect password' });

        return json({
            result: {
                ...found.toObject(),
                hash: undefined
            }
        });

    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};

// When updating the link
export const PATCH: RequestHandler = async ({ request, url }) => {
    try {
        const suffix = await shortLinkSuffixValidator.validate(url.searchParams.get('suffix'));
        const password = await shortLinkSuffixValidator.validate(url.searchParams.get('password'));

        const req = await request.json();
        const validatedReq = await shortLinkUrlUpdateValidator.validate(req, { stripUnknown: true });

        const found = await ShortLink.findOne({ suffix: suffix }).select('+hash');
        if (!found) return error(404, { message: 'Short link not found' });

        if (!found.hash) return error(401, { message: 'Short link has no password, and cannot be edited' });

        // Compare the password
        const match = await bcryptjs.compare(password, found.hash);
        if (!match) return error(401, { message: 'Incorrect password' });

        found.url = validatedReq.url;
        await found.save();

        return json({
            result: {
                ...found.toObject(),
                hash: undefined
            }
        });

    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};

// When deleting
export const DELETE: RequestHandler = async ({ url }) => {
    try {
        const suffix = await shortLinkSuffixValidator.validate(url.searchParams.get('suffix'));
        const password = await shortLinkSuffixValidator.validate(url.searchParams.get('password'));

        const found = await ShortLink.findOne({ suffix: suffix }).select('+hash');
        if (!found) return error(404, { message: 'Short link not found' });

        if (!found.hash) return error(401, { message: 'Short link has no password, and cannot be deleting' });

        // Compare the password
        const match = await bcryptjs.compare(password, found.hash);
        if (!match) return error(401, { message: 'Incorrect password' });

        await found.deleteOne();

        return json({});
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};