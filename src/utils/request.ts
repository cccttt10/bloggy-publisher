/*
request middleware is based on umi-request
documentation: https://github.com/umijs/umi-request
*/
import { notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { extend } from 'umi-request';

const codeMessage: { [code: number]: string } = {
    200: formatMessage({ id: 'app.request.200' }),
    201: formatMessage({ id: 'app.request.201' }),
    202: formatMessage({ id: 'app.request.202' }),
    204: formatMessage({ id: 'app.request.204' }),
    400: formatMessage({ id: 'app.request.400' }),
    401: formatMessage({ id: 'app.request.401' }),
    403: formatMessage({ id: 'app.request.403' }),
    404: formatMessage({ id: 'app.request.404' }),
    406: formatMessage({ id: 'app.request.406' }),
    410: formatMessage({ id: 'app.request.410' }),
    422: formatMessage({ id: 'app.request.422' }),
    500: formatMessage({ id: 'app.request.500' }),
    502: formatMessage({ id: 'app.request.502' }),
    503: formatMessage({ id: 'app.request.503' }),
    504: formatMessage({ id: 'app.request.504' })
};

/*
error handling logic
*/
const errorHandler = (error: {
    response: Response;
    data: string | object;
}): Response => {
    const { response, data } = error;
    const errorMessage: string = data as string;
    if (response && response.status) {
        const errorText = errorMessage || codeMessage[response.status];
        const { status, url } = response;
        if (process.env.NODE_ENV === 'development') {
            notification.error({
                message: `${formatMessage({
                    id: 'app.request.requestError'
                })} ${status}: ${url}`,
                description: errorText
            });
        } else {
            notification.error({
                message: errorText
            });
        }
    } else if (!response) {
        if (process.env.NODE_ENV === 'development') {
            notification.error({
                description: formatMessage({ id: 'app.request.networkErrorLong' }),
                message: formatMessage({ id: 'app.request.networkErrorShort' })
            });
        } else {
            notification.error({
                message: formatMessage({ id: 'app.request.networkErrorShort' })
            });
        }
    }
    return response;
};

/*
configure default params for request
documentation: https://github.com/umijs/umi-request/blob/master/README_zh-CN.md#request-options-%E5%8F%82%E6%95%B0
*/
const request = extend({
    errorHandler, // default error handler
    credentials: 'include', // include cookies in requests
    getResponse: true
});

export default request;
