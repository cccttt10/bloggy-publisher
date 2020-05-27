import ProLayout, {
    BasicLayoutProps as ProLayoutProps,
    DefaultFooter,
    MenuDataItem,
    Settings
} from '@ant-design/pro-layout';
import { Button, Icon, Result } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { connect } from 'dva';
import cookieChecker from 'js-cookie';
import React, { ReactNode, useEffect } from 'react';
import { Dispatch } from 'redux';
import { Link } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';

import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter, isAntDesignPro } from '@/utils/utils';

import logo from '../assets/logo.svg';

const noMatch = (
    <Result
        status={403}
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);

export interface BasicLayoutProps extends ProLayoutProps {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
    route: ProLayoutProps['route'] & {
        authority: string[];
    };
    settings: Settings;
    dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
};

/*
use Authorized check all menu item
*/
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList.map(item => {
        const localItem = {
            ...item,
            children: item.children ? menuDataRender(item.children) : []
        };
        return Authorized.check(item.authority, localItem, null) as MenuDataItem;
    });

const defaultFooterDom = (
    <DefaultFooter
        copyright="2019 蚂蚁金服体验技术部出品"
        links={[
            {
                key: 'Ant Design Pro',
                title: 'Ant Design Pro',
                href: 'https://pro.ant.design',
                blankTarget: true
            },
            {
                key: 'github',
                title: <Icon type="github" />,
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true
            },
            {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'https://ant.design',
                blankTarget: true
            }
        ]}
    />
);

const footerRender: BasicLayoutProps['footerRender'] = () => {
    if (!isAntDesignPro()) {
        return defaultFooterDom;
    }
    return (
        <>
            {defaultFooterDom}
            <div
                style={{
                    padding: '0px 24px 24px',
                    textAlign: 'center'
                }}
            >
                <a
                    href="https://www.netlify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
                        width="82px"
                        alt="netlify logo"
                    />
                </a>
            </div>
        </>
    );
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const { dispatch, children, settings, location = { pathname: '/' } } = props;

    useEffect(() => {
        const isLogin: boolean =
            typeof cookieChecker.get('jwt') === 'string' &&
            (cookieChecker.get('jwt') as string).length > 0;

        if (isLogin && dispatch) {
            dispatch({
                type: 'user/getCurrentUser'
            });
        }
    }, []);

    /*
    init variables
    */
    const handleMenuCollapse = (payload: boolean): void => {
        if (dispatch) {
            dispatch({
                type: 'global/changeLayoutCollapsed',
                payload
            });
        }
    };

    /*
    get children authority
    */
    const authorized = getAuthorityFromRouter(
        props.route.routes,
        location.pathname || '/'
    ) || {
        authority: undefined
    };

    return (
        <ProLayout
            logo={logo}
            menuHeaderRender={(
                logoDom: React.ReactNode,
                titleDom: React.ReactNode
            ): JSX.Element => (
                <Link to="/">
                    {logoDom}
                    {titleDom}
                </Link>
            )}
            onCollapse={handleMenuCollapse}
            menuItemRender={(
                menuItemProps: MenuDataItem & { isUrl: boolean },
                defaultDom: ReactNode
            ): ReactNode => {
                if (
                    menuItemProps.isUrl ||
                    menuItemProps.children ||
                    !menuItemProps.path
                ) {
                    return defaultDom;
                }
                return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            breadcrumbRender={(routers: Route[] = []): Route[] => [
                {
                    path: '/',
                    breadcrumbName: formatMessage({
                        id: 'menu.home',
                        defaultMessage: 'Home'
                    })
                },
                ...routers
            ]}
            itemRender={(
                route: Route,
                params,
                routes: Route[],
                paths: string[]
            ): React.ReactNode => {
                const first = routes.indexOf(route) === 0;
                return first ? (
                    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                ) : (
                    <span>{route.breadcrumbName}</span>
                );
            }}
            footerRender={footerRender}
            menuDataRender={menuDataRender}
            formatMessage={formatMessage}
            rightContentRender={(): JSX.Element => <RightContent />}
            {...props}
            {...settings}
        >
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <Authorized authority={authorized!.authority} noMatch={noMatch}>
                {children}
            </Authorized>
        </ProLayout>
    );
};

export default connect(({ global, settings }: ConnectState) => ({
    collapsed: global.collapsed,
    settings
}))(BasicLayout);
