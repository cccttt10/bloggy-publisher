import { notification } from 'antd';
import cookieChecker from 'js-cookie';
import { formatMessage } from 'umi-plugin-react/locale';
import { RequestResponse } from 'umi-request';

import {
    getCurrentUser,
    GetCurrentUserResponseBody,
    updateUser,
    UpdateUserRequestBody,
    UpdateUserResponseBody
} from '@/services/user';

export interface IUser {
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
}

export interface UserModelState {
    currentUser: IUser;
}

export interface UserModelType {
    namespace: 'user';
    state: UserModelState;
    effects: {
        getCurrentUser: (
            _: { type: string },
            { call, put }: { call: Function; put: Function }
        ) => Generator;
        updateUser: (
            { payload }: { type: string; payload: UpdateUserRequestBody },
            { call, put }: { call: Function; put: Function }
        ) => Generator;
    };
    reducers: {
        saveCurrentUser: (
            state: UserModelState,
            { payload }: { type: string; payload: IUser }
        ) => UserModelState;
    };
}

const UserModel: UserModelType = {
    namespace: 'user',

    state: {
        currentUser: {
            name: '',
            phone: '',
            imgUrl: '',
            email: '',
            bio: '',
            avatar: '',
            location: '',
            createdOn: new Date(),
            updatedOn: new Date(),
            _id: ''
        }
    },

    effects: {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *getCurrentUser(_, { call, put }: { call: Function; put: Function }) {
            const response: RequestResponse<GetCurrentUserResponseBody> = (yield call(
                getCurrentUser
            )) as RequestResponse<GetCurrentUserResponseBody>;
            const getCurrentUserResponseBody: GetCurrentUserResponseBody =
                response?.data;
            if (getCurrentUserResponseBody) {
                yield put({
                    type: 'saveCurrentUser',
                    payload: getCurrentUserResponseBody.user as IUser
                });
            } else {
                console.log('will remove cookie');
                cookieChecker.remove('jwt');
            }
        },

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        *updateUser(
            { payload }: { type: string; payload: UpdateUserRequestBody },
            { call, put }: { call: Function; put: Function }
        ) {
            const response: RequestResponse<UpdateUserResponseBody> = (yield call(
                updateUser,
                payload
            )) as RequestResponse<UpdateUserResponseBody>;
            const updateUserResponseBody: UpdateUserResponseBody = response?.data;
            if (updateUserResponseBody) {
                yield put({
                    type: 'saveCurrentUser',
                    payload: updateUserResponseBody.user as IUser
                });
                notification.success({
                    message: formatMessage({ id: 'app.request.requestSuccess' })
                });
            }
        }
    },

    reducers: {
        saveCurrentUser(
            state: UserModelState,
            { payload }: { type: string; payload: IUser }
        ): UserModelState {
            return {
                ...state,
                currentUser: payload
            };
        }
    }
};

export default UserModel;
