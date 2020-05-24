import request from '@/utils/request';
import { RequestResponse } from 'umi-request';

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

export async function getCurrentUser(): Promise<
    RequestResponse<GetCurrentUserResponseBody>
> {
    return request('http://localhost:3300/getCurrentUser', { method: 'GET' });
}
