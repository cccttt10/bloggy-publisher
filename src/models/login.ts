import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { router } from 'umi';
import { RequestResponse } from 'umi-request';
import {
    login,
    register,
    LoginRequestBody,
    RegisterRequestBody,
    LoginResponseBody,
    RegisterResponseBody
} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: 'user' | 'guest' | 'admin';
    userId?: string;
}

export interface LoginModelType {
    namespace: string;
    state: StateType;
    effects: {
        login: (
            { payload }: { type: string; payload: LoginRequestBody },
            { call }: { call: Function }
        ) => Generator;
        register: (
            { payload }: { type: string; payload: RegisterRequestBody },
            { call }: { call: Function }
        ) => Generator;
        logout: Effect;
    };
    reducers: {
        changeLoginStatus: Reducer<StateType>;
    };
}

const Model: LoginModelType = {
    namespace: 'login',

    state: {
        status: undefined
    },

    effects: {
        *login(
            { payload }: { type: string; payload: LoginRequestBody },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<LoginResponseBody> = (yield call(
                login,
                payload
            )) as RequestResponse<LoginResponseBody>;
            const loginResponseBody: LoginResponseBody = response.data;

            // login successful
            if (loginResponseBody) {
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params as { redirect: string };
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = '/';
                        return;
                    }
                }

                router.replace(redirect || '/');
            }
        },

        *register(
            { payload }: { type: string; payload: RegisterRequestBody },
            { call }: { call: Function }
        ) {
            const response: RequestResponse<RegisterResponseBody> = (yield call(
                register,
                payload
            )) as RequestResponse<RegisterResponseBody>;
            const registerResponseBody: RegisterResponseBody = response.data;

            // register successful
            if (registerResponseBody) {
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params as { redirect: string };
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = '/';
                        return;
                    }
                }
                router.replace(redirect || '/');
            }
        },
        logout() {
            const { redirect } = getPageQuery();
            // Note: There may be security issues, please note
            if (window.location.pathname !== '/user/login' && !redirect) {
                router.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href
                    })
                });
            }
        }
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority('admin');
            return {
                ...state,
                status: payload.status,
                type: payload.type,
                userId: payload._id
            };
        }
    }
};

export default Model;
