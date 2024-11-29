import { object, string } from 'yup';

export default object({
	email: string().trim().required().email().max(256).label('Email'),
	type: string().trim().required().max(256).label('Type'),
	message: string().trim().required().max(1024).label('Message')
});
