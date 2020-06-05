import { notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { RequestResponse } from 'umi-request';
import router from 'umi/router';

import {
    createArticle,
    CreateArticleRequestBody,
    CreateArticleResponseBody,
    getArticleList,
    GetArticleListRequestBody,
    GetArticleListResponseBody,
    updateArticle,
    UpdateArticleRequestBody,
    UpdateArticleResponseBody
} from '@/services/article';

import { ICategory } from './category';
import { IUser } from './user';

export interface IArticle {
    title: string;
    author: IUser['_id'];
    description: string;
    content: string;
    wordCount: number;
    imgUrl: string;
    isDraft: boolean;
    comments: string[];
    categories: ICategory[];
    likedBy: IUser['_id'][];
    meta: {
        numViews: number;
        numLikes: number;
        numComments: number;
    };
    isAboutPage: boolean;
    createdOn: Date;
    updatedOn: Date;
    _id: string;
}

export const emptyArticle: IArticle = {
    title: '',
    author: '',
    description: '',
    content: '',
    wordCount: 0,
    imgUrl: '',
    isDraft: true,
    comments: [],
    categories: [],
    likedBy: [],
    meta: {
        numViews: 0,
        numLikes: 0,
        numComments: 0
    },
    isAboutPage: false,
    createdOn: new Date(),
    updatedOn: new Date(),
    _id: ''
};

export interface ArticleModelState {
    articleList: IArticle[];
}

export interface ArticleModelType {
    namespace: 'article';
    state: ArticleModelState;
    effects: {
        createArticle: (
            { payload }: { type: string; payload: CreateArticleRequestBody },
            { call }: { call: Function }
        ) => Generator;
        getArticleList: (
            { payload }: { type: string; payload: GetArticleListRequestBody },
            { call, put }: { call: Function; put: Function }
        ) => Generator;
        updateArticle: (
            { payload }: { type: string; payload: UpdateArticleRequestBody },
            { call }: { call: Function }
        ) => Generator;
    };
    reducers: {
        saveArticleList: (
            state: ArticleModelState,
            { payload }: { type: string; payload: IArticle[] }
        ) => ArticleModelState;
    };
}

const ArticleModel: ArticleModelType = {
    namespace: 'article',

    state: {
        articleList: []
    },

    effects: {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *createArticle(
            { payload }: { type: string; payload: CreateArticleRequestBody },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<CreateArticleResponseBody> = (yield call(
                createArticle,
                payload
            )) as RequestResponse<CreateArticleResponseBody>;
            const createArticleResponseBody: CreateArticleResponseBody =
                response?.data;
            if (createArticleResponseBody) {
                notification.success({
                    message: formatMessage({ id: 'app.request.requestSuccess' })
                });
                router.push('/');
                router.push('/articles');
            }
        },

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *getArticleList(
            { payload }: { type: string; payload: GetArticleListRequestBody },
            { call, put }: { call: Function; put: Function }
        ) {
            const response: RequestResponse<GetArticleListResponseBody> = (yield call(
                getArticleList,
                payload
            )) as RequestResponse<GetArticleListResponseBody>;
            const getArticleListResponseBody: GetArticleListResponseBody =
                response?.data;
            if (getArticleListResponseBody) {
                yield put({
                    type: 'saveArticleList',
                    payload: getArticleListResponseBody.articleList as IArticle[]
                });
            }
        },

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *updateArticle(
            { payload }: { type: string; payload: UpdateArticleRequestBody },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<UpdateArticleResponseBody> = (yield call(
                updateArticle,
                payload
            )) as RequestResponse<UpdateArticleResponseBody>;
            const updateArticleResponseBody: UpdateArticleResponseBody =
                response?.data;
            if (updateArticleResponseBody) {
                notification.success({
                    message: formatMessage({ id: 'app.request.requestSuccess' })
                });
                router.push('/articles');
                router.push('/');
            }
        }
    },

    reducers: {
        saveArticleList(
            state: ArticleModelState,
            { payload }: { type: string; payload: IArticle[] }
        ): ArticleModelState {
            return {
                ...state,
                articleList: payload
            };
        }
    }
};

export default ArticleModel;
