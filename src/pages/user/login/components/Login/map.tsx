import { Icon } from 'antd';
import React from 'react';
import styles from './index.less';

export default {
    LoginEmail: {
        props: {
            size: 'large',
            id: 'login-email',
            prefix: <Icon type="mail" className={styles.prefixIcon} />
        }
    },

    LoginPassword: {
        props: {
            size: 'large',
            prefix: <Icon type="lock" className={styles.prefixIcon} />,
            type: 'password',
            id: 'login-password'
        }
    },

    RegisterEmail: {
        props: {
            size: 'large',
            id: 'register-email',
            prefix: <Icon type="mail" className={styles.prefixIcon} />
        }
    },

    RegisterName: {
        props: {
            size: 'large',
            prefix: <Icon type="user" className={styles.prefixIcon} />,
            id: 'register-name'
        }
    },

    RegisterPhone: {
        props: {
            size: 'large',
            prefix: <Icon type="mobile" className={styles.prefixIcon} />,
            id: 'register-phone'
        }
    },

    RegisterPassword: {
        props: {
            size: 'large',
            prefix: <Icon type="lock" className={styles.prefixIcon} />,
            type: 'password',
            id: 'register-password'
        }
    },
    RegisterConfirmPassword: {
        props: {
            size: 'large',
            prefix: <Icon type="lock" className={styles.prefixIcon} />,
            type: 'password',
            id: 'register-confirm-password'
        }
    },

    Captcha: {
        props: {
            size: 'large',
            prefix: <Icon type="mail" className={styles.prefixIcon} />
        },
        rules: [
            {
                required: true,
                message: 'Please enter Captcha!'
            }
        ]
    }
};
