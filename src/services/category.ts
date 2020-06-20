import { RequestResponse } from 'umi-request';

import { ICategory } from '@/models/category';
import { IUser } from '@/models/user';
import request from '@/utils/request';

export interface CreateCategoryRequestBody {
    name: string;
    description: string;
}

export type CreateCategoryResponseBody = ICategory;

export function createCategory(
    params: CreateCategoryRequestBody
): Promise<RequestResponse<CreateCategoryResponseBody>> {
    return request('http://localhost:3300/createCategory', {
        method: 'POST',
        data: params
    });
}

export interface DeleteCategoryRequestBody {
    name: string;
}

export interface DeleteCategoryResponseBody {}

export function deleteCategory(
    params: DeleteCategoryRequestBody
): Promise<RequestResponse<DeleteCategoryResponseBody>> {
    return request('http://localhost:3300/deleteCategory', {
        method: 'POST',
        data: params
    });
}

export interface GetCategoryListRequestBody {
    user: IUser['_id'];
}

export interface GetCategoryListResponseBody {
    count: number;
    categoryList: ICategory[];
}

export function getCategoryList(
    params: GetCategoryListRequestBody
): Promise<RequestResponse<GetCategoryListResponseBody>> {
    return request('http://localhost:3300/getCategoryList', {
        method: 'POST',
        data: params
    });
}
