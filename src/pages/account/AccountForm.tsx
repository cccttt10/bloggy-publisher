import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import { ConnectState } from '@/models/connect';
import { User } from '@/models/user';
import { UpdateUserRequestBody } from '@/services/user';

interface AccountFormProps {
    form: FormComponentProps['form'];
    currentUser: User;
    dispatch: Dispatch<AnyAction>;
}

class AccountForm extends Component<AccountFormProps> {
    componentDidMount(): void {
        this.populateForm();
    }

    populateForm = (): void => {
        const { currentUser } = this.props;
        this.props.form.setFieldsValue({
            email: currentUser.email,
            name: currentUser.name,
            bio: currentUser.bio,
            imgUrl: currentUser.imgUrl,
            avatar: currentUser.avatar,
            location: currentUser.location,
            phone: currentUser.phone,
            password: '',
            confirmPassword: ''
        });
    };

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err, values) => {
            // eslint-disable-next-line no-param-reassign
            delete values.email;
            if (values.password === '') {
                // eslint-disable-next-line no-param-reassign
                delete values.password;
                // eslint-disable-next-line no-param-reassign
                delete values.confirmPassword;
            }
            if (!err) {
                this.props.dispatch({
                    type: 'user/updateUser',
                    payload: { updatedFields: values } as UpdateUserRequestBody
                });
            }
        });
    };

    render(): JSX.Element {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                <Form.Item label={formatMessage({ id: 'account.email' })}>
                    {getFieldDecorator('email')(<Input disabled />)}
                </Form.Item>

                <Form.Item label={formatMessage({ id: 'account.name' })}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: formatMessage({
                                    id: 'account.name.required'
                                })
                            },
                            {
                                whitespace: true,
                                message: formatMessage({
                                    id: 'account.name.required'
                                })
                            }
                        ]
                    })(<Input />)}
                </Form.Item>

                <Form.Item label={formatMessage({ id: 'account.bio' })}>
                    {getFieldDecorator('bio')(
                        <Input.TextArea
                            placeholder={formatMessage({
                                id: 'account.bio.placeholder'
                            })}
                            rows={4}
                        />
                    )}
                </Form.Item>

                <Form.Item label={formatMessage({ id: 'account.imgUrl' })}>
                    {getFieldDecorator('imgUrl')(<Input />)}
                </Form.Item>

                <Form.Item label={formatMessage({ id: 'account.avatar' })}>
                    {getFieldDecorator('avatar')(<Input />)}
                </Form.Item>

                <Form.Item label={formatMessage({ id: 'account.location' })}>
                    {getFieldDecorator('location')(<Input />)}
                </Form.Item>

                <Form.Item label={formatMessage({ id: 'account.phone' })}>
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                pattern: /^\d+/,
                                message: formatMessage({
                                    id: 'account.phone.wrong-format'
                                })
                            }
                        ]
                    })(<Input />)}
                </Form.Item>

                <Form.Item label={formatMessage({ id: 'account.password' })}>
                    {getFieldDecorator('password')(<Input.Password />)}
                </Form.Item>

                <Form.Item label={formatMessage({ id: 'account.confirm-password' })}>
                    {getFieldDecorator('confirmPassword')(<Input.Password />)}
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    <FormattedMessage id="account.update" />
                </Button>
            </Form>
        );
    }
}

const EnhancedForm = Form.create<AccountFormProps>()(AccountForm);

export default connect(({ user, loading }: ConnectState) => ({
    currentUser: user.currentUser,
    loading: loading.models.user
}))(EnhancedForm);
