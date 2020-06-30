import { RequestResponse } from 'umi-request';

import { ICategory } from '@/models/category';
import { IUser } from '@/models/user';
import request from '@/utils/request';

import API_URL from './apiUrl';

export interface CreateCategoryRequestBody {
    name: string;
    description: string;
}

export type CreateCategoryResponseBody = ICategory;

export function createCategory(
    params: CreateCategoryRequestBody
): Promise<RequestResponse<CreateCategoryResponseBody>> {
    return request(`${API_URL}/createCategory`, {
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
    return request(`${API_URL}/deleteCategory`, {
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
    return request(`${API_URL}/getCategoryList`, {
        method: 'POST',
        data: params
    });
}
