import { RequestResponse } from 'umi-request';

import { IUser } from '@/models/user';
import request from '@/utils/request';

import API_URL from './apiUrl';

export interface GetCurrentUserResponseBody {
    user: IUser;
}

export function getCurrentUser(): Promise<
    RequestResponse<GetCurrentUserResponseBody>
> {
    return request(`${API_URL}/getCurrentUser`, { method: 'GET' });
}

export interface UpdateUserRequestBody {
    updatedFields: {
        name?: string;
        phone?: string;
        imgUrl?: string;
        bio?: string;
        avatar?: string;
        location?: string;
        password?: string;
        confirmPassword?: string;
    };
}

export interface UpdateUserResponseBody {
    user: IUser;
}

export function updateUser(
    params: UpdateUserRequestBody
): Promise<RequestResponse<UpdateUserResponseBody>> {
    return request(`${API_URL}/updateUser`, {
        method: 'POST',
        data: params
    });
}
