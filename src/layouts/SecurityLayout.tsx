import { PageLoading } from '@ant-design/pro-layout';
import { connect } from 'dva';
import cookieChecker from 'js-cookie';
import { stringify } from 'querystring';
import React from 'react';
import { Redirect } from 'umi';

import { ConnectProps, ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
    loading?: boolean;
    currentUser?: CurrentUser;
    userId?: string;
}

interface SecurityLayoutState {
    isReady: boolean;
}

class SecurityLayout extends React.Component<
    SecurityLayoutProps,
    SecurityLayoutState
> {
    state: SecurityLayoutState = {
        isReady: false
    };

    componentWillMount(): void {
        const { dispatch } = this.props;
        const isLogin: boolean =
            typeof cookieChecker.get('jwt') === 'string' &&
            (cookieChecker.get('jwt') as string).length > 0;

        if (isLogin && dispatch) {
            dispatch({
                type: 'user/getCurrentUser'
            });
        }
    }

    componentDidMount(): void {
        this.setState({
            isReady: true
        });
    }

    render(): React.ReactNode {
        const { isReady } = this.state;
        const { children, loading } = this.props;

        /*
        check if user is logged in
        in this case, check if token exists
        but can replace with other auth logic if auth logic changes
        这里是比如判断 token 是否存在
        你可以把它替换成你自己的登录认证规则
        */
        const isLogin: boolean =
            typeof cookieChecker.get('jwt') === 'string' &&
            (cookieChecker.get('jwt') as string).length > 0;

        const queryString = stringify({
            redirect: window.location.href
        });
        if ((!isLogin && loading) || !isReady) {
            return <PageLoading />;
        }
        if (!isLogin && window.location.pathname !== '/user/login') {
            return <Redirect to={`/user/login?${queryString}`} />;
        }
        return children;
    }
}

export default connect(({ user, loading }: ConnectState) => ({
    currentUser: user.currentUser,
    loading: loading.models.user
}))(SecurityLayout);
