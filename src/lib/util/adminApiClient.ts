export const BASE_API_URL = '/api/v1';

export async function baseApiRequest(method: string, url: string, data?: any): Promise<any> {
    const response = await fetch(`${BASE_API_URL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    });
    const res = await response.json();
    if (response.ok) return res;
    else throw new Error(res.message);
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
    return baseApiRequest('GET', `/crud/${serviceId}`);
}

async function create<T extends {id: any}>(serviceId: string, data: Omit<T, 'id'>): Promise<GetAllResults<T>> {
    return baseApiRequest('POST', `/crud/${serviceId}`, data);
}

async function get<T extends {id: any}>(serviceId: string, id: T['id']): Promise<GetResult<T>> {
    return baseApiRequest('GET', `/crud/${serviceId}/${id}`);
}

async function update<T extends {id: any}>(serviceId: string, id: T['id'], data: Partial<Omit<T, 'id'>>): Promise<GetResult<T>> {
    return baseApiRequest('PATCH', `/crud/${serviceId}/${id}`, data);
}

async function remove<T extends {id: any}>(serviceId: string, id: T['id']): Promise<GetAllResults<T>> {
    return baseApiRequest('DELETE', `/crud/${serviceId}/${id}`);
}

async function getOrder<T extends {id: any}>(serviceId: string): Promise<GetOrder<T>> {
    return baseApiRequest('GET', `/crud/${serviceId}/order`);
}

async function reorder<T extends {id: any}>(serviceId: string, order: T['id'][]): Promise<GetOrder<T>> {
    return baseApiRequest('POST', `/crud/${serviceId}/order`, order);
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