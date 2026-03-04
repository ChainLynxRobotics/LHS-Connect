import { ValidationError } from 'yup';
import { feedbackTypes } from '../../../(public)/about/ContactForm.svelte';
import type { RequestHandler } from './$types';
import { contactUsValidator } from './validator';
import { ContactUsMessage } from './model';
import { DISCORD_WEBHOOK_URL } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const req = await request.json();
        
        // Validate the incoming data against your Yup schema
        const validatedReq = await contactUsValidator.validate(req, { stripUnknown: true });

        const typeName = feedbackTypes.find((type) => type.value === validatedReq.type)?.name;
        if (!typeName) throw new ValidationError(`Invalid type: ${validatedReq.type}`);

        // Save to your database (model.ts)
        const message = new ContactUsMessage({
            name: validatedReq.name,
            email: validatedReq.email,
            type: validatedReq.type,
            message: validatedReq.message,
        });

        await message.save();

        // Send to Discord
        if (DISCORD_WEBHOOK_URL) {
            const webhook_body = {
                content: null,
                embeds: [
                    {
                        title: typeName,
                        description: validatedReq.message,
                        color: 16734296, // A nice shade of orange/red
                        author: {
                            name: validatedReq.name || 'No name provided',
                        },
                        footer: {
                            text: validatedReq.email || 'No email provided',
                        },
                        timestamp: new Date().toISOString(),
                    },
                ],
                username: 'LHS Connect Feedback',
                attachments: [],
                allowed_mentions: { parse: [] },
            };

            const res = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(webhook_body),
            });

            if (!res.ok) {
                console.error('Discord Webhook failed:', await res.json());
            }
        }

        return json({ success: true });
    } catch (e) {
        if (e instanceof ValidationError) {
            return error(400, { message: e.message });
        }
        // Handle unexpected server errors
        console.error("Server Error:", e);
        throw e;
    }
};