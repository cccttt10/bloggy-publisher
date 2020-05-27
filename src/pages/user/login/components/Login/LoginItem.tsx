import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { GetFieldDecoratorOptions, ValidationRule } from 'antd/es/form/Form';
import React, { Component } from 'react';

import LoginContext, { LoginContextProps } from './LoginContext';
import ItemMap from './map';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type WrappedLoginItemProps = Omit<
    LoginItemProps,
    'form' | 'type' | 'updateActive'
>;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
    LoginEmail: React.FC<WrappedLoginItemProps>;
    LoginPassword: React.FC<WrappedLoginItemProps>;
    RegisterEmail: React.FC<WrappedLoginItemProps>;
    RegisterName: React.FC<WrappedLoginItemProps>;
    RegisterPhone: React.FC<WrappedLoginItemProps>;
    RegisterPassword: React.FC<WrappedLoginItemProps>;
    RegisterConfirmPassword: React.FC<WrappedLoginItemProps>;
}

export interface LoginItemProps extends GetFieldDecoratorOptions {
    name?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    buttonText?: React.ReactNode;
    onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    countDown?: number;
    updateActive?: LoginContextProps['updateActive'];
    type?: string;
    defaultValue?: string;
    form?: FormComponentProps['form'];
    customProps?: { [key: string]: unknown };
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    tabUtil?: LoginContextProps['tabUtil'];
}

const FormItem = Form.Item;

class WrapFormItem extends Component<LoginItemProps> {
    interval: number | undefined = undefined;

    componentDidMount(): void {
        const { updateActive, name = '' } = this.props;
        if (updateActive) {
            updateActive(name);
        }
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    getFormItemOptions = ({
        onChange,
        defaultValue,
        customProps = {},
        rules
    }: LoginItemProps): {
        rules?: LoginItemProps['rules'];
        onChange?: LoginItemProps['onChange'];
        initialValue?: LoginItemProps['defaultValue'];
    } => {
        const options: {
            rules?: LoginItemProps['rules'];
            onChange?: LoginItemProps['onChange'];
            initialValue?: LoginItemProps['defaultValue'];
        } = {
            rules: rules || (customProps.rules as LoginItemProps['rules'])
        };
        if (onChange) {
            options.onChange = onChange;
        }
        if (defaultValue) {
            options.initialValue = defaultValue;
        }
        return options;
    };

    render(): JSX.Element | null {
        // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
        const { customProps, name, form, ...restProps } = this.props;
        if (!name) {
            return null;
        }
        if (!form) {
            return null;
        }
        const { getFieldDecorator } = form;
        // get getFieldDecorator props
        const options = this.getFormItemOptions(this.props);
        const otherProps = restProps || {};

        return (
            <FormItem>
                {getFieldDecorator(
                    name,
                    options
                )(<Input {...customProps} {...otherProps} />)}
            </FormItem>
        );
    }
}

const LoginItem: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach(key => {
    const item: {
        props: { size: string; id: string; prefix: JSX.Element; type?: string };
        rules?: ValidationRule[];
    } = ItemMap[key];
    LoginItem[
        key as
            | 'LoginEmail'
            | 'LoginPassword'
            | 'RegisterEmail'
            | 'RegisterName'
            | 'RegisterPhone'
            | 'RegisterPassword'
            | 'RegisterConfirmPassword'
    ] = (props: LoginItemProps): JSX.Element => (
        <LoginContext.Consumer>
            {(context: LoginContextProps): JSX.Element => (
                <WrapFormItem
                    customProps={item.props}
                    rules={item.rules}
                    {...props}
                    type={key}
                    {...context}
                    updateActive={context.updateActive}
                />
            )}
        </LoginContext.Consumer>
    );
});

export default LoginItem as LoginItemType;
