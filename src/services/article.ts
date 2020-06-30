import { RequestResponse } from 'umi-request';

import { IArticle } from '@/models/article';
import { ICategory } from '@/models/category';
import { IUser } from '@/models/user';
import request from '@/utils/request';

import API_URL from './apiUrl';

export interface CreateArticleRequestBody {
    title: string;
    description: string;
    content: string;
    imgUrl: string;
    isDraft: boolean;
    categories: ICategory['_id'][];
    isAboutPage: boolean;
}

export type CreateArticleResponseBody = IArticle;

export function createArticle(
    params: CreateArticleRequestBody
): Promise<RequestResponse<CreateArticleResponseBody>> {
    return request(`${API_URL}/createArticle`, {
        method: 'POST',
        data: params
    });
}

export interface GetArticleListRequestBody {
    user: IUser['_id'];
    isVisitor: false;
}

export interface GetArticleListResponseBody {
    count: number;
    articleList: IArticle[];
}

export function getArticleList(
    params: GetArticleListRequestBody
): Promise<RequestResponse<GetArticleListResponseBody>> {
    return request(`${API_URL}/getArticleList`, {
        method: 'POST',
        data: params
    });
}

export interface UpdateArticleRequestBody {
    _id: IArticle['_id'];
    updatedFields: {
        title?: string;
        description?: string;
        content?: string;
        imgUrl?: string;
        isDraft?: boolean;
        categories?: ICategory['_id'][];
        isAboutPage?: boolean;
    };
}

export type UpdateArticleResponseBody = IArticle;

export function updateArticle(
    params: UpdateArticleRequestBody
): Promise<RequestResponse<UpdateArticleResponseBody>> {
    return request(`${API_URL}/updateArticle`, {
        method: 'POST',
        data: params
    });
}

export interface DeleteArticleRequestBody {
    _id: IArticle['_id'];
}

export interface DeleteArticleResponseBody {}

export function deleteArticle(
    params: DeleteArticleRequestBody
): Promise<RequestResponse<DeleteArticleResponseBody>> {
    return request(`${API_URL}/deleteArticle`, {
        method: 'POST',
        data: params
    });
}
