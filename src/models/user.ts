import { RequestResponse } from 'umi-request';

import { getCurrentUser, GetCurrentUserResponseBody } from '@/services/user';

export interface CurrentUser {
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
    currentUser: CurrentUser;
}

export interface UserModelType {
    namespace: 'user';
    state: UserModelState;
    effects: {
        getCurrentUser: (
            _: { type: string },
            { call, put }: { call: Function; put: Function }
        ) => Generator;
    };
    reducers: {
        saveCurrentUser: (
            state: UserModelState,
            { payload }: { type: string; payload: CurrentUser }
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
                response.data;
            if (getCurrentUserResponseBody) {
                yield put({
                    type: 'saveCurrentUser',
                    payload: getCurrentUserResponseBody.user as CurrentUser
                });
            }
        }
    },

    reducers: {
        saveCurrentUser(
            state: UserModelState,
            { payload }: { type: string; payload: CurrentUser }
        ): UserModelState {
            return {
                ...state,
                currentUser: payload
            };
        }
    }
};

export default UserModel;
