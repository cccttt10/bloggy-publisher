import { Button, Form, Input, notification } from 'antd';
import { connect } from 'dva';
import React, { Component, FC, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import { ConnectState } from '@/models/connect';
import { IUser } from '@/models/user';
import { BLOGGY_READER_BASE_URL } from '@/utils/constants';

import AccountForm from './AccountForm';
import styles from './index.less';

const { CopyToClipboard } = require('react-copy-to-clipboard');

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

interface BackgroundViewProps {
    backgroundUrl: string;
}
const BackgroundView: FC<BackgroundViewProps> = (props: BackgroundViewProps) => (
    <Fragment>
        <div className={styles.background_title}>
            <FormattedMessage id="account.background-title" />
        </div>
        <div className={styles.background}>
            <img src={props.backgroundUrl} alt="background" />
        </div>

        <div className={styles.button_view}>
            <Button icon="upload">
                <FormattedMessage id="account.change-background" />
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

    getBackgroundURL(): string {
        const { currentUser } = this.props;
        if (currentUser.imgUrl) {
            return currentUser.imgUrl;
        }
        return 'https://s17736.pcdn.co/wp-content/uploads/2019/03/jason-leung-479251-unsplash.jpg';
    }

    render(): JSX.Element {
        const url = `${BLOGGY_READER_BASE_URL}/${this.props.currentUser._id}`;

        return (
            <div className={styles.baseView}>
                <div className={styles.left}>
                    <AccountForm />
                </div>
                <div className={styles.right}>
                    <AvatarView avatarUrl={this.getAvatarURL()} />
                    <BackgroundView backgroundUrl={this.getBackgroundURL()} />

                    <div className={styles.url}>
                        <Form.Item label={formatMessage({ id: 'account.url' })}>
                            {/* {getFieldDecorator('url')(<Input.TextArea disabled rows={3} />)} */}
                            <Input.TextArea disabled rows={3} value={url} />
                        </Form.Item>

                        <Button
                            type="primary"
                            href={url}
                            target="_blank"
                            style={{ marginRight: '3px' }}
                        >
                            <FormattedMessage id="account.open-url" />
                        </Button>

                        <CopyToClipboard
                            text={url}
                            onCopy={() =>
                                notification.success({
                                    message: formatMessage({
                                        id: 'account.copy-success'
                                    })
                                })
                            }
                        >
                            <Button>
                                <FormattedMessage id="account.copy-url" />
                            </Button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ user, loading }: ConnectState) => ({
    currentUser: user.currentUser,
    loading: loading.models.user
}))(BaseView);
