import { notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { RequestResponse } from 'umi-request';

import {
    createCategory,
    CreateCategoryRequestBody,
    CreateCategoryResponseBody,
    deleteCategory,
    DeleteCategoryRequestBody,
    DeleteCategoryResponseBody,
    getCategoryList,
    GetCategoryListRequestBody,
    GetCategoryListResponseBody
} from '@/services/category';

import { IUser } from './user';

export interface ICategory {
    name: string;
    description: string;
    user: IUser['_id'];
    createdOn: Date;
    updatedOn: Date;
    _id: string;
}

export interface CategoryModelState {
    categoryList: ICategory[];
}

export interface CategoryModelType {
    namespace: 'category';
    state: CategoryModelState;
    effects: {
        createCategory: (
            {
                payload,
                callback
            }: {
                type: string;
                payload: CreateCategoryRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) => Generator;
        deleteCategory: (
            {
                payload,
                callback
            }: {
                type: string;
                payload: DeleteCategoryRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) => Generator;
        getCategoryList: (
            { payload }: { type: string; payload: GetCategoryListRequestBody },
            { call, put }: { call: Function; put: Function }
        ) => Generator;
    };
    reducers: {
        saveCategoryList: (
            state: CategoryModelState,
            { payload }: { type: string; payload: ICategory[] }
        ) => CategoryModelState;
    };
}

const categoryModel: CategoryModelType = {
    namespace: 'category',

    state: {
        categoryList: []
    },

    effects: {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *createCategory(
            {
                payload,
                callback
            }: {
                type: string;
                payload: CreateCategoryRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<CreateCategoryResponseBody> = (yield call(
                createCategory,
                payload
            )) as RequestResponse<CreateCategoryResponseBody>;
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
        *deleteCategory(
            {
                payload,
                callback
            }: {
                type: string;
                payload: DeleteCategoryRequestBody;
                callback: (success: boolean) => void;
            },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<DeleteCategoryResponseBody> = (yield call(
                deleteCategory,
                payload
            )) as RequestResponse<DeleteCategoryResponseBody>;
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
        *getCategoryList(
            { payload }: { type: string; payload: GetCategoryListRequestBody },
            { call, put }: { call: Function; put: Function }
        ) {
            const response: RequestResponse<GetCategoryListResponseBody> = (yield call(
                getCategoryList,
                payload
            )) as RequestResponse<GetCategoryListResponseBody>;

            if (response?.response?.ok === true) {
                const getCategoryListResponseBody: GetCategoryListResponseBody =
                    response.data;
                yield put({
                    type: 'saveCategoryList',
                    payload: getCategoryListResponseBody.categoryList as ICategory[]
                });
            }
        }
    },

    reducers: {
        saveCategoryList(
            state: CategoryModelState,
            { payload }: { type: string; payload: ICategory[] }
        ): CategoryModelState {
            return {
                ...state,
                categoryList: payload
            };
        }
    }
};

export default categoryModel;
