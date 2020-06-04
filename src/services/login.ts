import { RequestResponse } from 'umi-request';

import { User } from '@/models/user';
import request from '@/utils/request';

export interface RegisterRequestBody {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export interface RegisterResponseBody {
    user: User;
}

export function register(
    params: RegisterRequestBody
): Promise<RequestResponse<RegisterResponseBody>> {
    return request('http://localhost:3300/register', {
        method: 'POST',
        data: params
    });
}

export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface LoginResponseBody {
    user: User;
}

export function login(
    params: LoginRequestBody
): Promise<RequestResponse<LoginResponseBody>> {
    return request('http://localhost:3300/login', {
        method: 'POST',
        data: params
    });
}
