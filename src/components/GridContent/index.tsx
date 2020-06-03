import { connect } from 'dva';
import React, { PureComponent } from 'react';

import { ConnectState } from '@/models/connect';

import styles from './index.less';

interface GridContentProps {
    contentWidth: string;
}

class GridContent extends PureComponent<GridContentProps> {
    render(): JSX.Element {
        const { contentWidth, children } = this.props;
        let className = `${styles.main}`;
        if (contentWidth === 'Fixed') {
            className = `${styles.main} ${styles.wide}`;
        }
        return <div className={className}>{children}</div>;
    }
}

export default connect(({ settings }: ConnectState) => ({
    contentWidth: settings.contentWidth
}))(GridContent);
