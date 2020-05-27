import { Tag } from 'antd';
import { connect } from 'dva';
import React from 'react';

import { ConnectProps, ConnectState } from '@/models/connect';

import SelectLang from '../SelectLang';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
    theme?: SiderTheme;
    layout: 'sidemenu' | 'topmenu';
}

const ENVTagColor = {
    dev: 'orange',
    test: 'green',
    pre: '#87d068'
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
    const { theme, layout } = props;
    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
        className = `${styles.right}  ${styles.dark}`;
    }

    return (
        <div className={className}>
            <Avatar />
            {REACT_APP_ENV && (
                <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
            )}
            <SelectLang className={styles.action} />
        </div>
    );
};

export default connect(({ settings }: ConnectState) => ({
    theme: settings.navTheme,
    layout: settings.layout
}))(GlobalHeaderRight);
