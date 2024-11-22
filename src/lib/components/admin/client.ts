export const BASE_API_URL = '/api/v1';

export async function baseApiRequest(method: string, url: string, data?: any): Promise<any> {
    const response = await fetch(`${BASE_API_URL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    });
    return await response.json();
}

interface GetAllResults<T extends {id: any}> extends GetOrder<T> {
    results: T[];
}

interface GetResult<T> {
    result: T;
}

interface GetOrder<T extends {id: any}> {
    order: T['id'][];
}

async function getAll<T extends {id: any}>(serviceId: string): Promise<GetAllResults<T>> {
    return baseApiRequest('GET', `/${serviceId}`);
}

async function create<T extends {id: any}>(serviceId: string, data: Omit<T, 'id'>): Promise<GetAllResults<T>> {
    return baseApiRequest('POST', `/${serviceId}`, data);
}

async function get<T extends {id: any}>(serviceId: string, id: T['id']): Promise<GetResult<T>> {
    return baseApiRequest('GET', `/${serviceId}/${id}`);
}

async function update<T extends {id: any}>(serviceId: string, id: T['id'], data: Partial<Omit<T, 'id'>>): Promise<GetResult<T>> {
    return baseApiRequest('PATCH', `/${serviceId}/${id}`, data);
}

async function remove<T extends {id: any}>(serviceId: string, id: T['id']): Promise<GetAllResults<T>> {
    return baseApiRequest('DELETE', `/${serviceId}/${id}`);
}

async function getOrder<T extends {id: any}>(serviceId: string): Promise<GetOrder<T>> {
    return baseApiRequest('GET', `/${serviceId}/order`);
}

async function reorder<T extends {id: any}>(serviceId: string, order: T['id'][]): Promise<GetOrder<T>> {
    return baseApiRequest('POST', `/${serviceId}/order`, order);
}

export default {
    getAll,
    create,
    get,
    update,
    remove,
    getOrder,
    reorder,
};