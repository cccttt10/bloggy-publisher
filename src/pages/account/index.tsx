import { Button } from 'antd';
import { connect } from 'dva';
import React, { Component, FC, Fragment } from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';

import { ConnectState } from '@/models/connect';
import { IUser } from '@/models/user';

import AccountForm from './AccountForm';
import styles from './index.less';

// 头像组件 方便以后独立 增加裁剪之类的功能
interface AvatarViewProps {
    avatarUrl: string;
}
const AvatarView: FC<AvatarViewProps> = (props: AvatarViewProps) => (
    <Fragment>
        <div className={styles.avatar_title}>
            <FormattedMessage id="account.avatar-title" />
        </div>
        <div className={styles.avatar}>
            <img src={props.avatarUrl} alt="avatar" />
        </div>

        <div className={styles.button_view}>
            <Button icon="upload">
                <FormattedMessage id="account.change-avatar" />
            </Button>
        </div>
    </Fragment>
);

interface BaseViewProps {
    currentUser: IUser;
}

class BaseView extends Component<BaseViewProps> {
    getAvatarURL(): string {
        const { currentUser } = this.props;
        if (currentUser.avatar) {
            return currentUser.avatar;
        }
        return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    }

    render(): JSX.Element {
        return (
            <div className={styles.baseView}>
                <div className={styles.left}>
                    <AccountForm />
                </div>
                <div className={styles.right}>
                    <AvatarView avatarUrl={this.getAvatarURL()} />
                </div>
            </div>
        );
    }
}

export default connect(({ user, loading }: ConnectState) => ({
    currentUser: user.currentUser,
    loading: loading.models.user
}))(BaseView);
