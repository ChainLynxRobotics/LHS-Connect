import { object, string } from 'yup';

export default object({
	name: string().trim().max(256).label('Name'),
	type: string().trim().required().max(256).label('Type'),
	email: string().trim().email().max(256).label('Email'),
	message: string().trim().required().max(1024).label('Message')
});
