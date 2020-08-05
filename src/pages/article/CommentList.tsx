// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Modal, Tag, Tooltip } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { formatMessage } from 'umi-plugin-react/locale';

import { IArticle, IComment, VerboseComment } from '@/models/article';
import { ConnectState } from '@/models/connect';
import {
    ApproveCommentRequestBody,
    DeleteCommentRequestBody,
    GetCommentListRequestBody
} from '@/services/comment';

import CustomComment from './CustomComment';

interface CommentListProps {
    articleId: IArticle['_id'];
    dispatch: Dispatch<AnyAction>;
    hideComments: () => void;
    loading?: boolean;
}

interface CommentListState {
    commentList: VerboseComment[];
}

class CommentList extends Component<CommentListProps, CommentListState> {
    state = { commentList: [] as VerboseComment[] };

    componentDidMount(): void {
        this.fetchCommentList();
    }

    fetchCommentList = (): void => {
        this.props.dispatch({
            type: 'article/getCommentList',
            payload: {
                articleId: this.props.articleId,
                isVisitor: false
            } as GetCommentListRequestBody,
            callback: (success: boolean, commentList?: VerboseComment[]): void => {
                if (success === true && commentList !== undefined) {
                    this.setState({ commentList });
                }
            }
        });
    };

    approveComment = (commentId: IComment['_id']): void => {
        this.props.dispatch({
            type: 'article/approveComment',
            payload: { commentId } as ApproveCommentRequestBody,
            callback: (success: boolean): void => {
                if (success === true) {
                    this.fetchCommentList();
                }
            }
        });
    };

    deleteComment = (commentId: IComment['_id']): void => {
        this.props.dispatch({
            type: 'article/deleteComment',
            payload: { commentId } as DeleteCommentRequestBody,
            callback: (success: boolean): void => {
                if (success === true) {
                    this.fetchCommentList();
                }
            }
        });
    };

    render(): JSX.Element {
        const normalCenter: React.CSSProperties = {
            textAlign: 'center',
            marginBottom: 20
        };
        const { commentList } = this.state;
        const commentsJSX: JSX.Element[] = [];
        for (const comment of commentList) {
            const actions = [];
            if (comment.isApproved) {
                actions.push(
                    <React.Fragment>
                        <Tag color="green">
                            {formatMessage({ id: 'article.comment.approved' })}
                        </Tag>
                        <br />
                    </React.Fragment>
                );
            } else {
                actions.push(
                    <React.Fragment>
                        <Tag color="red">
                            {formatMessage({ id: 'article.comment.pending' })}
                        </Tag>
                        <br />
                    </React.Fragment>
                );
            }
            if (!comment.isApproved) {
                actions.push(
                    <Tooltip
                        title={formatMessage({ id: 'article.comment.approve' })}
                    >
                        <Button
                            onClick={(): void => this.approveComment(comment._id)}
                            loading={this.props.loading}
                            type="primary"
                            shape="circle"
                            icon="check"
                            size="small"
                            style={{ marginRight: '6px' }}
                        />
                    </Tooltip>
                );
            }
            actions.push(
                <Tooltip title={formatMessage({ id: 'article.comment.delete' })}>
                    <Button
                        onClick={(): void => this.deleteComment(comment._id)}
                        loading={this.props.loading}
                        type="danger"
                        shape="circle"
                        icon="delete"
                        size="small"
                    />
                </Tooltip>
            );

            commentsJSX.push(<CustomComment comment={comment} actions={actions} />);
        }
        return (
            <div>
                <Modal
                    title={formatMessage({ id: 'article.comment.manage-comments' })}
                    visible
                    onOk={this.props.hideComments}
                    width="1200px"
                    onCancel={this.props.hideComments}
                >
                    <div>
                        {commentList.length ? (
                            commentsJSX
                        ) : (
                            <div style={normalCenter}>
                                {formatMessage({
                                    id: 'article.comment.no-comments'
                                })}
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(({ loading }: ConnectState) => ({
    loading: loading.models.article
}))(CommentList);
