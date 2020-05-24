import request from '@/utils/request';

export async function query(): Promise<any> {
    return request('/api/users');
}

export interface QueryCurrentParams {
    _id: string;
}

export async function queryCurrent(params: QueryCurrentParams): Promise<any> {
    console.log(params);
    return request('http://localhost:3300/getUser', {
        method: 'POST',
        data: params
    });
}

export async function queryNotices(): Promise<any> {
    return request('/api/notices');
}
