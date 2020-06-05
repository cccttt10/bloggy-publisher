import { notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { RequestResponse } from 'umi-request';

import {
    createCategory,
    CreateCategoryRequestBody,
    CreateCategoryResponseBody,
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
            { payload }: { type: string; payload: CreateCategoryRequestBody },
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
            { payload }: { type: string; payload: CreateCategoryRequestBody },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<CreateCategoryResponseBody> = (yield call(
                createCategory,
                payload
            )) as RequestResponse<CreateCategoryResponseBody>;
            const createCategoryResponseBody: CreateCategoryResponseBody =
                response.data;
            if (createCategoryResponseBody) {
                notification.success({
                    message: formatMessage({ id: 'app.request.requestSuccess' })
                });
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
            const getCategoryListResponseBody: GetCategoryListResponseBody =
                response.data;
            if (getCategoryListResponseBody) {
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
