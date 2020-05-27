import { Icon } from 'antd';
import { ValidationRule } from 'antd/es/form/Form';
import React from 'react';

import styles from './index.less';

const map: {
    [loginItem: string]: {
        props: { size: string; id: string; prefix: JSX.Element; type?: string };
        rules?: ValidationRule[];
    };
} = {
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
    }
};

export default map;
