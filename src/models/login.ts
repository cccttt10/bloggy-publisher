import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { router } from 'umi';

import { login, register } from '@/services/login';
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
        login: Effect;
        register: Effect;
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
        *login({ payload }, { call, put }) {
            const response = yield call(login, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response.user
            });
            // login successful
            console.log(response);
            localStorage.setItem('userId', response.user._id);
            console.log('item just set');
            console.log(localStorage.getItem('userId'));
            if (true || response.status === 'ok') {
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

        *register({ payload }, { call, put }) {
            const response = yield call(register, payload);

            yield put({
                type: 'changeLoginStatus',
                payload: response
            });
            // register successful
            console.log(response);
            if (true || response.status === 200) {
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
