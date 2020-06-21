import { RequestResponse } from 'umi-request';

import { IArticle } from '@/models/article';
import { ICategory } from '@/models/category';
import { IUser } from '@/models/user';
import request from '@/utils/request';

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
    return request('http://localhost:3300/createArticle', {
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
    return request('http://localhost:3300/getArticleList', {
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
    return request('http://localhost:3300/updateArticle', {
        method: 'POST',
        data: params
    });
}

export interface QueryArticleListRequestBody {
    _id: IUser['_id']; // author id
    filter?: {
        isAboutPage: IArticle['isAboutPage'];
        isDraft?: IArticle['isDraft'];
        keyword?: IArticle['title'] | IArticle['description']; // search in article title and description for the keyword
    };
    pagination?: {
        limit: number;
        offset: number;
    };
}

export interface QueryArticleListResponseBody {
    count: number;
    articleList: IArticle[];
}

export function queryArticleList(
    params: QueryArticleListRequestBody
): Promise<RequestResponse<UpdateArticleResponseBody>> {
    return request('http://localhost:3300/queryArticleList', {
        method: 'POST',
        data: params
    });
}
