import { Button, Col, Form, Input, notification, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import { Mode } from '.';

interface ArticleListToolbarProps {
    form: FormComponentProps['form'];
    setParentMode: (mode: Mode) => void;
}
class ArticleListToolbar extends React.Component<ArticleListToolbarProps> {
    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        notification.info({
            message: formatMessage({ id: 'article.not-implemented' })
        });
    };

    render(): JSX.Element {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                layout="inline"
                style={{ marginBottom: '20px' }}
                onSubmit={this.handleSubmit}
            >
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={24} sm={24}>
                        <Form.Item>
                            {getFieldDecorator('keyword')(
                                <Input
                                    placeholder={formatMessage({
                                        id: 'article.title-or-description'
                                    })}
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('visibility', {
                                initialValue: 'all'
                            })(
                                <Select
                                    style={{ width: 200, marginRight: 20 }}
                                    placeholder={formatMessage({
                                        id: 'article.state'
                                    })}
                                >
                                    <Select.Option value="all">
                                        <FormattedMessage id="article.all" />
                                    </Select.Option>
                                    <Select.Option value="draft">
                                        <FormattedMessage id="article.draft" />
                                    </Select.Option>
                                    <Select.Option value="public">
                                        <FormattedMessage id="article.public" />
                                    </Select.Option>
                                </Select>
                            )}
                        </Form.Item>

                        <span>
                            <Button
                                htmlType="submit"
                                style={{ marginTop: '3px' }}
                                type="primary"
                                icon="search"
                            >
                                <FormattedMessage id="article.search" />
                            </Button>
                        </span>
                        <span>
                            <Button
                                onClick={(): void => {
                                    this.props.setParentMode('create');
                                }}
                                style={{ marginTop: '3px', marginLeft: '10px' }}
                                type="primary"
                            >
                                <FormattedMessage id="article.new-article" />
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create<ArticleListToolbarProps>()(ArticleListToolbar);
