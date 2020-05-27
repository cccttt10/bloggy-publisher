import { RequestResponse } from 'umi-request';

import request from '@/utils/request';

export interface RegisterRequestBody {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export interface RegisterResponseBody {
    user: {
        name: string;
        phone: string;
        imgUrl: string;
        email: string;
        bio: string;
        avatar: string;
        location: string;
        createdOn: Date;
        updatedOn: Date;
        _id: string;
    };
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
    user: {
        name: string;
        phone: string;
        imgUrl: string;
        email: string;
        bio: string;
        avatar: string;
        location: string;
        createdOn: Date;
        updatedOn: Date;
        _id: string;
    };
}

export function login(
    params: LoginRequestBody
): Promise<RequestResponse<LoginResponseBody>> {
    return request('http://localhost:3300/login', {
        method: 'POST',
        data: params
    });
}
