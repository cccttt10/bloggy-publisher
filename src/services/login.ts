import request from '@/utils/request';

export interface RegisterParamsType {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export async function register(params: RegisterParamsType) {
    return request('http://localhost:3300/register', {
        method: 'POST',
        data: params
    });
}

export interface LoginParamsType {
    email: string;
    password: string;
}

export async function login(params: RegisterParamsType) {
    return request('http://localhost:3300/login', {
        method: 'POST',
        data: params
    });
}
