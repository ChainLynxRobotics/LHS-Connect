import { object, string, type InferType } from 'yup';

const contactUsSchema = object({
	email: string().trim().required().email().max(256).label('Email'),
	type: string().trim().required().max(256).label('Type'),
	message: string().trim().required().max(1024).label('Message')
});

export default contactUsSchema;

export type ContactUsSchema = InferType<typeof contactUsSchema>;
