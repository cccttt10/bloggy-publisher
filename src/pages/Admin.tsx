import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, Icon, Typography } from 'antd';
import React from 'react';

export default (): React.ReactNode => (
    <PageHeaderWrapper content=" Only logged in users with admin status can view this page">
        <Card>
            <Alert
                message="This is an admin page, only visible to logged in users with admin status"
                type="success"
                showIcon
                banner
                style={{
                    margin: -12,
                    marginBottom: 48
                }}
            />
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                <Icon type="smile" theme="twoTone" /> Bloggy{' '}
                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> You
            </Typography.Title>
        </Card>
        <p style={{ textAlign: 'center', marginTop: 24 }}>
            More questions? Please refer to{' '}
            <a
                href="https://github.com/chuntonggao/bloggy-publisher/blob/master/README.md"
                target="_blank"
                rel="noopener noreferrer"
            >
                README
            </a>
        </p>
    </PageHeaderWrapper>
);
