export interface IEditLog<T> {
	operation: 'create' | 'update' | 'delete';
	data: T;
	editedBy: string;
	createdAt: Date;
}
