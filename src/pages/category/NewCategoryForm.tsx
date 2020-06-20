import { Input, Modal } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { formatMessage } from 'umi-plugin-react/locale';

import { ConnectState } from '@/models/connect';
import { CreateCategoryRequestBody } from '@/services/category';

interface NewCategory {
    name: string;
    description: string;
}

interface NewCategoryFormProps {
    loading?: boolean;
    dispatch: Dispatch<AnyAction>;
    toggleAdding: (adding?: boolean) => void;
    fetchCategoryList: () => void;
}

type NewCategoryFormState = NewCategory;

class NewCategoryForm extends Component<NewCategoryFormProps, NewCategoryFormState> {
    state = { name: '', description: '' };

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        this.setState({ name: e.target.value });

    handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        this.setState({ description: e.target.value });

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        this.props.dispatch({
            type: 'category/createCategory',
            payload: {
                name: this.state.name,
                description: this.state.description
            } as CreateCategoryRequestBody,
            callback: (success: boolean): void => {
                if (success === true) {
                    this.props.toggleAdding(false);
                    this.props.fetchCategoryList();
                }
            }
        });
    };

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        this.props.toggleAdding();
    };

    render(): JSX.Element {
        const normalCenter: React.CSSProperties = {
            textAlign: 'center',
            marginBottom: 20
        };
        return (
            <div>
                <Modal
                    title={formatMessage({ id: 'category.new-category' })}
                    onOk={this.handleSubmit}
                    width="600px"
                    onCancel={this.handleCancel}
                    visible
                    confirmLoading={this.props.loading}
                >
                    <Input
                        style={normalCenter}
                        addonBefore={formatMessage({ id: 'category.name' })}
                        size="large"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                    <Input
                        addonBefore={formatMessage({ id: 'category.description' })}
                        size="large"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    />
                </Modal>
            </div>
        );
    }
}

export default connect(({ loading }: ConnectState) => ({
    loading: loading.models.category
}))(NewCategoryForm);
