export const BASE_API_URL = '/api/v1';

export default async function apiRequest(method: string, url: string, data?: any): Promise<any> {
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