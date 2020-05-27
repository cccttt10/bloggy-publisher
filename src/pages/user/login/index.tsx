import { Alert, Checkbox, Icon } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import { ConnectState } from '@/models/connect';
import { LoginModelState } from '@/models/login';
import { LoginRequestBody, RegisterRequestBody } from '@/services/login';

import LoginComponents, { TabType } from './components/Login';
import styles from './style.less';

const {
    Tab,
    RegisterEmail,
    RegisterPassword,
    RegisterPhone,
    RegisterName,
    RegisterConfirmPassword,
    LoginEmail,
    LoginPassword,
    Submit
} = LoginComponents;

interface LoginProps {
    dispatch: Dispatch<AnyAction>;
    userLogin: LoginModelState;
    submitting?: boolean;
}
interface LoginState {
    activeTab: TabType;
    autoLogin: boolean;
}

class Login extends Component<LoginProps, LoginState> {
    loginForm: FormComponentProps['form'] | undefined | null = undefined;

    state: LoginState = {
        activeTab: 'login',
        autoLogin: true
    };

    changeAutoLogin = (e: CheckboxChangeEvent): void => {
        this.setState({
            autoLogin: e.target.checked
        });
    };

    handleSubmit = (
        err: unknown,
        values: LoginRequestBody | RegisterRequestBody
    ): void => {
        const { activeTab } = this.state;
        if (!err) {
            const { dispatch } = this.props;
            if (activeTab === 'login') {
                dispatch({
                    type: 'login/login',
                    payload: values as LoginRequestBody
                });
            } else if (activeTab === 'register') {
                dispatch({
                    type: 'login/register',
                    payload: values as RegisterRequestBody
                });
            }
        }
    };

    onTabChange = (activeTab: TabType): void => {
        this.setState({ activeTab });
    };

    renderMessage = (content: string): JSX.Element => (
        <Alert
            style={{ marginBottom: 24 }}
            message={content}
            type="error"
            showIcon
        />
    );

    render(): JSX.Element {
        const { userLogin = {}, submitting } = this.props;
        const { status, type: loginType } = userLogin;
        const { activeTab, autoLogin } = this.state;
        return (
            <div className={styles.main}>
                <LoginComponents
                    defaultActiveKey={activeTab}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    onCreate={(form?: FormComponentProps['form']): void => {
                        this.loginForm = form;
                    }}
                >
                    <Tab
                        key="login"
                        tab={formatMessage({
                            id: 'user-login.tab.login'
                        })}
                    >
                        {status === 'error' &&
                            loginType === 'login' &&
                            !submitting &&
                            this.renderMessage(
                                formatMessage({
                                    id:
                                        'user-login.login.message-invalid-credentials'
                                })
                            )}
                        <LoginEmail
                            name="email"
                            placeholder={`${formatMessage({
                                id: 'user-login.login.email'
                            })}: 123@abc.com`}
                            rules={[
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
                            ]}
                        />
                        <LoginPassword
                            name="password"
                            placeholder={formatMessage({
                                id: 'user-login.register.password'
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'user-login.login.password.required'
                                    })
                                }
                            ]}
                            onPressEnter={(
                                e: React.KeyboardEvent<HTMLElement>
                            ): void => {
                                e.preventDefault();
                                if (this.loginForm) {
                                    this.loginForm.validateFields(this.handleSubmit);
                                }
                            }}
                        />
                    </Tab>
                    <Tab
                        key="register"
                        tab={formatMessage({
                            id: 'user-login.tab.register'
                        })}
                    >
                        {status === 'error' &&
                            loginType === 'register' &&
                            !submitting &&
                            this.renderMessage(
                                formatMessage({
                                    id:
                                        'user-login.login.message-invalid-verification-code'
                                })
                            )}
                        <RegisterEmail
                            name="email"
                            placeholder={`${formatMessage({
                                id: 'user-login.login.email'
                            })}: 123@abc.com`}
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'user-login.login.email.required'
                                    })
                                },
                                {
                                    // eslint-disable-next-line no-useless-escape
                                    pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
                                    message: 'Wrong email format!'
                                }
                            ]}
                        />
                        <RegisterName
                            name="name"
                            placeholder={formatMessage({
                                id: 'user-login.register.name'
                            })}
                            rules={[
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
                            ]}
                        />
                        <RegisterPhone
                            name="phone"
                            placeholder={formatMessage({
                                id: 'user-login.register.phone'
                            })}
                            rules={[
                                {
                                    pattern: /^\d+/,
                                    message: formatMessage({
                                        id: 'user-login.register.phone.wrong-format'
                                    })
                                }
                            ]}
                        />
                        <RegisterPassword
                            name="password"
                            placeholder={formatMessage({
                                id: 'user-login.register.password'
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'user-login.register.password.required'
                                    })
                                }
                            ]}
                        />

                        <RegisterConfirmPassword
                            name="confirmPassword"
                            placeholder={formatMessage({
                                id: 'user-login.register.confirmPassword'
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({
                                        id:
                                            'user-login.register.confirmPassword.required'
                                    })
                                }
                            ]}
                            onPressEnter={(
                                e: React.KeyboardEvent<HTMLElement>
                            ): void => {
                                e.preventDefault();
                                if (this.loginForm) {
                                    this.loginForm.validateFields(this.handleSubmit);
                                }
                            }}
                        />
                    </Tab>
                    <div>
                        <Checkbox
                            checked={autoLogin}
                            onChange={this.changeAutoLogin}
                        >
                            <FormattedMessage id="user-login.login.remember-me" />
                        </Checkbox>
                        <a style={{ float: 'right' }} href="">
                            <FormattedMessage id="user-login.login.forgot-password" />
                        </a>
                    </div>
                    <Submit loading={submitting}>
                        <FormattedMessage
                            id={
                                activeTab === 'login'
                                    ? 'user-login.login.button'
                                    : 'user-login.register.button'
                            }
                        />
                    </Submit>
                    <div className={styles.other}>
                        <FormattedMessage id="user-login.login.sign-in-with" />
                        <Icon
                            type="github"
                            className={styles.icon}
                            theme="outlined"
                        />
                    </div>
                </LoginComponents>
            </div>
        );
    }
}

export default connect(({ login, loading }: ConnectState) => ({
    userLogin: login,
    submitting: loading.effects['login/login'] || loading.effects['login/register']
}))(Login);
