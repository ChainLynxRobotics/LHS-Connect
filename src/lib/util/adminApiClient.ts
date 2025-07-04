import type { WithoutID } from '$lib/types/basicTypes';
import apiRequest from './apiClient';

export const baseApiRequest = apiRequest;

export interface GetAllResults<T> {
	results: T[];
}

export interface GetResult<T> {
	result: T;
}

export interface GetOrder<T extends { id: any }> {
	order: T['id'][];
}

async function getAll<T>(itemEndpoint: string): Promise<GetAllResults<T>> {
	return baseApiRequest('GET', `/${itemEndpoint}/edit`);
}

async function create<T>(itemEndpoint: string, data: WithoutID<T>): Promise<GetResult<T>> {
	return baseApiRequest('POST', `/${itemEndpoint}/edit`, data);
}

async function get<T extends { id: any }>(
	itemEndpoint: string,
	id: T['id']
): Promise<GetResult<T>> {
	return baseApiRequest('GET', `/${itemEndpoint}/edit/${id}`);
}

async function update<T extends { id: any }>(
	itemEndpoint: string,
	id: T['id'],
	data: Partial<WithoutID<T>>
): Promise<GetResult<T>> {
	return baseApiRequest('PATCH', `/${itemEndpoint}/edit/${id}`, data);
}

async function remove<T extends { id: any }>(itemEndpoint: string, id: T['id']): Promise<{}> {
	return baseApiRequest('DELETE', `/${itemEndpoint}/edit/${id}`);
}

async function getOrder<T extends { id: any }>(itemEndpoint: string): Promise<GetOrder<T>> {
	return baseApiRequest('GET', `/${itemEndpoint}/edit/order`);
}

async function reorder<T extends { id: any }>(
	itemEndpoint: string,
	order: T['id'][]
): Promise<GetOrder<T>> {
	return baseApiRequest('POST', `/${itemEndpoint}/edit/order`, order);
}

async function overwriteAll<T extends { id: any }>(
	itemEndpoint: string,
	data: WithoutID<T>[]
): Promise<GetAllResults<T>> {
	return baseApiRequest('POST', `/${itemEndpoint}/edit/all`, data);
}

export default {
	baseApiRequest,
	getAll,
	create,
	get,
	update,
	remove,
	getOrder,
	reorder,
	overwriteAll,
};
