import type { Snippet } from 'svelte';

export interface GenericEditLogProps {
	operation: 'create' | 'update' | 'delete';
	editedBy: string;
	editedOn: Date;
}
export interface EditLogProps extends GenericEditLogProps {
	children: Snippet;
}
