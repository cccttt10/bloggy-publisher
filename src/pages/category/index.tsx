import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import { ICategory } from '@/models/category';
import { ConnectState } from '@/models/connect';
import { IUser } from '@/models/user';
import {
    DeleteCategoryRequestBody,
    GetCategoryListRequestBody
} from '@/services/category';

import NewCategoryForm from './NewCategoryForm';

interface CategoryListProps {
    loading?: boolean;
    categoryList: ICategory[];
    dispatch: Dispatch<AnyAction>;
    userId: IUser['_id'];
}

interface CategoryListState {
    addingNewCategory: boolean;
}

class CategoryList extends Component<CategoryListProps, CategoryListState> {
    state = { addingNewCategory: false };

    componentDidMount(): void {
        this.fetchCategoryList();
    }

    fetchCategoryList = (): void => {
        this.props.dispatch({
            type: 'category/getCategoryList',
            payload: {
                user: this.props.userId
            } as GetCategoryListRequestBody
        });
    };

    handleDelete = (categoryName: ICategory['name']): void => {
        this.props.dispatch({
            type: 'category/deleteCategory',
            payload: { name: categoryName } as DeleteCategoryRequestBody,
            callback: (success: boolean): void => {
                if (success === true) {
                    this.fetchCategoryList();
                }
            }
        });
    };

    toggleAdding = (addingNewCategory?: boolean): void =>
        this.setState({
            addingNewCategory:
                typeof addingNewCategory === 'boolean'
                    ? addingNewCategory
                    : !this.state.addingNewCategory
        });

    render(): JSX.Element {
        const { loading, categoryList } = this.props;
        const columns = [
            {
                title: formatMessage({ id: 'category.name' }),
                dataIndex: 'name'
            },
            {
                title: formatMessage({ id: 'category.description' }),
                dataIndex: 'description'
            },
            {
                title: formatMessage({ id: 'category.createdOn' }),
                dataIndex: 'createdOn',
                sorter: true,
                render: (createdOn: ICategory['createdOn']): JSX.Element => (
                    <span>{moment(createdOn).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            },
            {
                title: formatMessage({ id: 'category.operations' }),
                render: (text: string, record: ICategory): JSX.Element => (
                    <Popconfirm
                        title={formatMessage({
                            id: 'category.confirm-delete'
                        })}
                        onConfirm={(): void => this.handleDelete(record.name)}
                    >
                        {/* eslint-disable-next-line no-script-url */}
                        <a href="javascript:;">
                            <FormattedMessage id="category.delete" />
                        </a>
                    </Popconfirm>
                )
            }
        ];
        return (
            <Fragment>
                <Card bordered={false}>
                    <div className="">
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={24} sm={24}>
                                <span>
                                    <Button
                                        style={{ marginBottom: '20px' }}
                                        onClick={(): void => this.toggleAdding(true)}
                                        type="primary"
                                    >
                                        <FormattedMessage id="category.new-category" />
                                    </Button>
                                </span>
                            </Col>
                        </Row>
                        <Table
                            loading={loading}
                            rowKey={(record: ICategory): string => record._id}
                            columns={columns}
                            bordered
                            dataSource={categoryList}
                        />
                    </div>
                </Card>
                {this.state.addingNewCategory && (
                    <NewCategoryForm
                        fetchCategoryList={this.fetchCategoryList}
                        toggleAdding={this.toggleAdding}
                    />
                )}
            </Fragment>
        );
    }
}

export default connect(({ category, loading, user }: ConnectState) => ({
    categoryList: category.categoryList,
    userId: user.currentUser._id,
    loading: loading.models.category && loading.models.user
}))(CategoryList);
