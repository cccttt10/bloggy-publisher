import { RequestResponse } from 'umi-request';

import { IUser } from '@/models/user';
import request from '@/utils/request';

import API_URL from './apiUrl';

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
    return request(`${API_URL}/register`, {
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
    return request(`${API_URL}/login`, {
        method: 'POST',
        data: params
    });
}
