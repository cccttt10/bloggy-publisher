import { RequestResponse } from 'umi-request';

import { IUser } from '@/models/user';
import request from '@/utils/request';

export interface RegisterRequestBody {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
}

export interface RegisterResponseBody {
    user: IUser;
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
    user: IUser;
}

export function login(
    params: LoginRequestBody
): Promise<RequestResponse<LoginResponseBody>> {
    return request('http://localhost:3300/login', {
        method: 'POST',
        data: params
    });
}
