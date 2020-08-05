import { RequestResponse } from 'umi-request';

import { IArticle, IComment, VerboseComment } from '@/models/article';
import request from '@/utils/request';

import API_URL from './apiUrl';

export interface ApproveCommentRequestBody {
    commentId: IComment['_id'];
}

export interface ApproveCommentResponseBody {
    comment: VerboseComment;
}

export function approveComment(
    params: ApproveCommentRequestBody
): Promise<RequestResponse<ApproveCommentResponseBody>> {
    return request(`${API_URL}/approveComment`, {
        method: 'POST',
        data: params
    });
}

export interface DeleteCommentRequestBody {
    commentId: IComment['_id'];
}

export interface DeleteCommentResponseBody {}

export function deleteComment(
    params: DeleteCommentRequestBody
): Promise<RequestResponse<DeleteCommentResponseBody>> {
    return request(`${API_URL}/deleteComment`, {
        method: 'POST',
        data: params
    });
}

export interface GetCommentListRequestBody {
    articleId: IArticle['_id'];
    isVisitor: false;
}

export interface GetCommentListResponseBody {
    count: number;
    commentList: VerboseComment[];
}

export function getCommentList(
    params: GetCommentListRequestBody
): Promise<RequestResponse<GetCommentListResponseBody>> {
    return request(`${API_URL}/getCommentList`, {
        method: 'POST',
        data: params
    });
}
