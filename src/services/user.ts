import { RequestResponse } from 'umi-request';

import request from '@/utils/request';

export interface GetCurrentUserResponseBody {
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

export function getCurrentUser(): Promise<
    RequestResponse<GetCurrentUserResponseBody>
> {
    return request('http://localhost:3300/getCurrentUser', { method: 'GET' });
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

export function updateUser(
    params: UpdateUserRequestBody
): Promise<RequestResponse<UpdateUserResponseBody>> {
    return request('http://localhost:3300/updateUser', {
        method: 'POST',
        data: params
    });
}
