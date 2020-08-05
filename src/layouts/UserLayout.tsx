import {
    DefaultFooter,
    getMenuData,
    getPageTitle,
    MenuDataItem
} from '@ant-design/pro-layout';
import { Icon } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';

import SelectLang from '@/components/SelectLang';
import { ConnectProps, ConnectState } from '@/models/connect';

import logo from '../assets/logo.png';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
    breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
    const {
        route = {
            routes: []
        }
    } = props;
    const { routes = [] } = route;
    const {
        children,
        location = {
            pathname: ''
        }
    } = props;
    const { breadcrumb } = getMenuData(routes);
    const title = getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props
    });
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>

            <div className={styles.container}>
                <div className={styles.lang}>
                    <SelectLang />
                </div>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>Bloggy</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>
                            Bloggy 是西湖区最具影响力的博客平台
                        </div>
                    </div>
                    {children}
                </div>
                <DefaultFooter
                    copyright={formatMessage({ id: 'app.footer.copyright' })}
                    links={[
                        {
                            key: 'Bloggy Publisher',
                            title: 'Bloggy Publisher',
                            href: '#',
                            blankTarget: true
                        },
                        {
                            key: 'github',
                            title: <Icon type="github" />,
                            href: 'https://github.com/chuntonggao/bloggy',
                            blankTarget: true
                        },
                        {
                            key: 'Bloggy Reader',
                            title: 'Bloggy Reader',
                            href: '#',
                            blankTarget: true
                        }
                    ]}
                />
            </div>
        </>
    );
};

export default connect(({ settings }: ConnectState) => ({
    ...settings
}))(UserLayout);
