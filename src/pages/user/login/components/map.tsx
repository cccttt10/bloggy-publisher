import { Icon } from 'antd';
import { ValidationRule } from 'antd/es/form/Form';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

import styles from './index.less';

const emailRules: ValidationRule[] = [
    {
        required: true,
        message: formatMessage({
            id: 'user-login.login.email.required'
        })
    },
    {
        // eslint-disable-next-line no-useless-escape
        pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
        message: formatMessage({
            id: 'user-login.login.email.wrong-format'
        })
    }
];

const map: {
    [loginItem: string]: {
        props: {
            size: string;
            id: string;
            prefix: JSX.Element;
            type?: string;
            placeholder: string;
        };
        rules?: ValidationRule[];
    };
} = {
    LoginEmail: {
        props: {
            size: 'large',
            id: 'login-email',
            prefix: <Icon type="mail" className={styles.prefixIcon} />,
            placeholder: `${formatMessage({
                id: 'user-login.login.email'
            })}: 123@abc.com`
        },
        rules: emailRules
    },
    LoginPassword: {
        props: {
            size: 'large',
            prefix: <Icon type="lock" className={styles.prefixIcon} />,
            type: 'password',
            id: 'login-password',
            placeholder: formatMessage({
                id: 'user-login.register.password'
            })
        },
        rules: [
            {
                required: true,
                message: formatMessage({
                    id: 'user-login.login.password.required'
                })
            }
        ]
    },
    RegisterEmail: {
        props: {
            size: 'large',
            id: 'register-email',
            prefix: <Icon type="mail" className={styles.prefixIcon} />,
            placeholder: `${formatMessage({
                id: 'user-login.login.email'
            })}: 123@abc.com`
        },
        rules: emailRules
    },
    RegisterName: {
        props: {
            size: 'large',
            prefix: <Icon type="user" className={styles.prefixIcon} />,
            id: 'register-name',
            placeholder: formatMessage({
                id: 'user-login.register.name'
            })
        },
        rules: [
            {
                required: true,
                message: formatMessage({
                    id: 'user-login.register.name.required'
                })
            },
            {
                pattern: /\S/,
                message: formatMessage({
                    id: 'user-login.register.name.required'
                })
            }
        ]
    },
    RegisterPhone: {
        props: {
            size: 'large',
            prefix: <Icon type="mobile" className={styles.prefixIcon} />,
            id: 'register-phone',
            placeholder: formatMessage({
                id: 'user-login.register.phone'
            })
        },
        rules: [
            {
                pattern: /^\d+/,
                message: formatMessage({
                    id: 'user-login.register.phone.wrong-format'
                })
            }
        ]
    },
    RegisterPassword: {
        props: {
            size: 'large',
            prefix: <Icon type="lock" className={styles.prefixIcon} />,
            type: 'password',
            id: 'register-password',
            placeholder: formatMessage({
                id: 'user-login.register.password'
            })
        },

        rules: [
            {
                required: true,
                message: formatMessage({
                    id: 'user-login.register.password.required'
                })
            }
        ]
    },
    RegisterConfirmPassword: {
        props: {
            size: 'large',
            prefix: <Icon type="lock" className={styles.prefixIcon} />,
            type: 'password',
            id: 'register-confirm-password',
            placeholder: formatMessage({
                id: 'user-login.register.confirmPassword'
            })
        },
        rules: [
            {
                required: true,
                message: formatMessage({
                    id: 'user-login.register.confirmPassword.required'
                })
            }
        ]
    }
};

export default map;
