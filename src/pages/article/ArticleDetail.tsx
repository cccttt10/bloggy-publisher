import 'simplemde/dist/simplemde.min.css';
import './index.less';

import { Button, Form, Input, Popconfirm, Select, Switch } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import highlight from 'highlight.js';
import marked from 'marked';
import React, { CSSProperties } from 'react';
import { AnyAction, Dispatch } from 'redux';
import SimpleMDE from 'simplemde';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import { IArticle } from '@/models/article';
import { ICategory } from '@/models/category';
import { ConnectState } from '@/models/connect';
import { IUser } from '@/models/user';
import {
    CreateArticleRequestBody,
    UpdateArticleRequestBody
} from '@/services/article';

import { Mode } from './index';

interface ArticleDetailProps {
    article: IArticle;
    dispatch: Dispatch<AnyAction>;
    type: 'edit' | 'create';
    form: FormComponentProps['form'];
    loading?: boolean;
    userId: IUser['_id'];
    categoryList: ICategory[];
    setParentMode: (mode: Mode) => void;
}

interface ArticleDetailState {
    editor: SimpleMDE;
}

class ArticleDetail extends React.Component<ArticleDetailProps, ArticleDetailState> {
    componentDidMount(): void {
        const editor: SimpleMDE = new SimpleMDE({
            element: document.getElementById('editor') as HTMLElement,
            autofocus: true,
            previewRender: (plainText: string): string =>
                marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: code => highlight.highlightAuto(code).value
                })
        });
        editor.value(this.props.article.content);
        this.state = { editor };
        this.populateForm();
    }

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err, values) => {
            if (!err) {
                if (this.props.type === 'create') {
                    this.props.dispatch({
                        type: 'article/createArticle',
                        payload: values as CreateArticleRequestBody
                    });
                } else if (this.props.type === 'edit') {
                    this.props.dispatch({
                        type: 'article/updateArticle',
                        payload: {
                            _id: this.props.article._id,
                            updatedFields: values
                        } as UpdateArticleRequestBody
                    });
                }
            }
        });
    };

    // populate all fields except editor content
    populateForm = (): void => {
        const { article } = this.props;
        this.props.form.setFieldsValue({
            title: article.title,
            description: article.description,
            imgUrl: article.imgUrl,
            isDraft: article.isDraft,
            isAboutPage: article.isAboutPage,
            categories: article.categories
        });
    };

    render(): JSX.Element {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 }
        };
        const normalCenter: CSSProperties = {
            textAlign: 'center',
            marginBottom: 10
        };
        const categoryChildren: JSX.Element[] = [];
        for (const category of this.props.categoryList) {
            categoryChildren.push(
                <Select.Option key={category._id} value={category._id}>
                    {category.name}
                </Select.Option>
            );
        }
        return (
            <div>
                <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                    labelAlign="left"
                    hideRequiredMark
                >
                    <Form.Item label={formatMessage({ id: 'article.title' })}>
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'article.title.required'
                                    })
                                },
                                {
                                    whitespace: true,
                                    message: formatMessage({
                                        id: 'article.title.required'
                                    })
                                }
                            ]
                        })(
                            <Input
                                style={normalCenter}
                                size="large"
                                placeholder={formatMessage({ id: 'article.title' })}
                            />
                        )}
                    </Form.Item>

                    <Form.Item label={formatMessage({ id: 'article.description' })}>
                        {getFieldDecorator('description')(
                            <Input
                                style={normalCenter}
                                size="large"
                                placeholder={formatMessage({
                                    id: 'article.description'
                                })}
                            />
                        )}
                    </Form.Item>

                    <Form.Item label={formatMessage({ id: 'article.imgUrl' })}>
                        {getFieldDecorator('imgUrl')(
                            <Input
                                style={normalCenter}
                                size="large"
                                placeholder={formatMessage({ id: 'article.imgUrl' })}
                            />
                        )}
                    </Form.Item>

                    <Form.Item label={formatMessage({ id: 'article.categories' })}>
                        {getFieldDecorator('categories')(
                            <Select
                                allowClear
                                mode="multiple"
                                placeholder={formatMessage({
                                    id: 'article.categories'
                                })}
                            >
                                {categoryChildren}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label={formatMessage({ id: 'article.isDraft' })}>
                        {getFieldDecorator('isDraft', { valuePropName: 'checked' })(
                            <Switch />
                        )}
                    </Form.Item>

                    <Form.Item label={formatMessage({ id: 'article.isAboutPage' })}>
                        {getFieldDecorator('isAboutPage', {
                            valuePropName: 'checked'
                        })(<Switch />)}
                    </Form.Item>

                    <Button
                        htmlType="submit"
                        loading={this.props.loading}
                        style={{ marginBottom: '10px', marginRight: '10px' }}
                        type="primary"
                    >
                        <FormattedMessage id="article.submit" />
                    </Button>

                    <Popconfirm
                        title={formatMessage({ id: 'article.confirm-discard' })}
                        onConfirm={(): void => this.props.setParentMode('list')}
                    >
                        <Button style={{ marginBottom: '10px' }} type="danger">
                            <FormattedMessage id="article.discard" />
                        </Button>
                    </Popconfirm>
                </Form>

                <div
                    title={formatMessage({ id: 'article.content' })}
                    // style={{ width: '1200px' }}
                >
                    <textarea
                        id="editor"
                        style={{ marginBottom: 20, width: 800 }}
                        rows={6}
                    />
                </div>
            </div>
        );
    }
}

const EnhancedForm = Form.create<ArticleDetailProps>()(ArticleDetail);

export default connect(({ category, user, loading }: ConnectState) => ({
    categoryList: category.categoryList,
    userId: user.currentUser._id,
    loading: loading.models.article && loading.models.user
}))(EnhancedForm);
