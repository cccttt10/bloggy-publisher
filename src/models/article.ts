/* eslint-disable max-lines */
import { notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { RequestResponse } from 'umi-request';

// import router from 'umi/router';
import {
    createArticle,
    CreateArticleRequestBody,
    CreateArticleResponseBody,
    deleteArticle,
    DeleteArticleRequestBody,
    DeleteArticleResponseBody,
    getArticleList,
    GetArticleListRequestBody,
    GetArticleListResponseBody,
    updateArticle,
    UpdateArticleRequestBody,
    UpdateArticleResponseBody
} from '@/services/article';
import {
    approveComment,
    ApproveCommentRequestBody,
    ApproveCommentResponseBody,
    deleteComment,
    DeleteCommentRequestBody,
    DeleteCommentResponseBody,
    getCommentList,
    GetCommentListRequestBody,
    GetCommentListResponseBody
} from '@/services/comment';

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

export interface IComment {
    _id: string;
    article: IArticle['_id'] | IArticle;
    content: string;
    isPinned?: boolean;
    user: IUser['_id'] | IUser;
    isApproved?: boolean;
    createdOn?: Date;
}

export interface VerboseComment extends Omit<IComment, 'user'> {
    user: IUser;
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
            {
                payload,
                callback
            }: {
                type: string;
                payload: CreateArticleRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) => Generator;
        getArticleList: (
            { payload }: { type: string; payload: GetArticleListRequestBody },
            { call, put }: { call: Function; put: Function }
        ) => Generator;
        updateArticle: (
            {
                payload,
                callback
            }: {
                type: string;
                payload: UpdateArticleRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) => Generator;
        deleteArticle: (
            {
                payload,
                callback
            }: {
                type: string;
                payload: DeleteArticleRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) => Generator;
        approveComment: (
            {
                payload,
                callback
            }: {
                type: string;
                payload: ApproveCommentRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) => Generator;
        deleteComment: (
            {
                payload,
                callback
            }: {
                type: string;
                payload: DeleteCommentRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) => Generator;
        getCommentList: (
            {
                payload,
                callback
            }: {
                type: string;
                payload: GetCommentListRequestBody;
                callback: (success: boolean, commentList?: VerboseComment[]) => void;
            },
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
            {
                payload,
                callback
            }: {
                type: string;
                payload: CreateArticleRequestBody;
                callback: (success: boolean) => void;
            },
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
                if (typeof callback === 'function') {
                    callback(true);
                }
            }
            if (typeof callback === 'function') {
                callback(false);
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
            {
                payload,
                callback
            }: {
                type: string;
                payload: UpdateArticleRequestBody;
                callback: (success: boolean) => void;
            },
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
                if (typeof callback === 'function') {
                    callback(true);
                }
            }
            if (typeof callback === 'function') {
                callback(false);
            }
        },

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *deleteArticle(
            {
                payload,
                callback
            }: {
                type: string;
                payload: DeleteArticleRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<DeleteArticleResponseBody> = (yield call(
                deleteArticle,
                payload
            )) as RequestResponse<DeleteArticleResponseBody>;

            if (response?.response?.ok === true) {
                notification.success({
                    message: formatMessage({ id: 'app.request.requestSuccess' })
                });
                if (typeof callback === 'function') {
                    callback(true);
                }
            }
            if (typeof callback === 'function') {
                callback(false);
            }
        },

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *approveComment(
            {
                payload,
                callback
            }: {
                type: string;
                payload: ApproveCommentRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<ApproveCommentResponseBody> = (yield call(
                approveComment,
                payload
            )) as RequestResponse<ApproveCommentResponseBody>;

            if (response?.response?.ok === true) {
                notification.success({
                    message: formatMessage({ id: 'app.request.requestSuccess' })
                });
                if (typeof callback === 'function') {
                    callback(true);
                }
            }
            if (typeof callback === 'function') {
                callback(false);
            }
        },

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *deleteComment(
            {
                payload,
                callback
            }: {
                type: string;
                payload: DeleteCommentRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<DeleteCommentResponseBody> = (yield call(
                deleteComment,
                payload
            )) as RequestResponse<DeleteCommentResponseBody>;

            if (response?.response?.ok === true) {
                notification.success({
                    message: formatMessage({ id: 'app.request.requestSuccess' })
                });
                if (typeof callback === 'function') {
                    callback(true);
                }
            }
            if (typeof callback === 'function') {
                callback(false);
            }
        },

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *getCommentList(
            {
                payload,
                callback
            }: {
                type: string;
                payload: GetCommentListRequestBody;
                callback: (success: boolean, commentList?: VerboseComment[]) => void;
            },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<GetCommentListResponseBody> = (yield call(
                getCommentList,
                payload
            )) as RequestResponse<GetCommentListResponseBody>;
            if (response?.response?.ok === true) {
                if (typeof callback === 'function') {
                    callback(true, response?.data.commentList);
                }
            }
            if (typeof callback === 'function') {
                callback(false);
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
