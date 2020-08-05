import './index.less';

import { Avatar, Comment } from 'antd';
import moment from 'moment';
import React from 'react';

import { VerboseComment } from '@/models/article';

interface CustomCommentProps {
    comment: VerboseComment;
    actions: JSX.Element[];
}

const CustomComment: React.FC<CustomCommentProps> = ({
    comment,
    actions,
    children
}) => (
    <Comment
        actions={actions}
        author={<a>{comment.user.name}</a>}
        avatar={<Avatar src={comment.user.avatar} alt={comment.user.name} />}
        content={<p> {comment.content}</p>}
        datetime={
            <span>{moment(comment.createdOn).format('YYYY-MM-DD HH:mm:ss')}</span>
        }
    >
        {children}
    </Comment>
);

export default CustomComment;
