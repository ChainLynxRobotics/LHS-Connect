export interface IEditLogBase {
	operation: 'create' | 'update' | 'delete';
	editedBy: string;
	createdAt: Date;
}

export interface IEditLog<T> extends IEditLogBase {
	data: T;
}
