import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, Typography } from 'antd';
import React from 'react';

import styles from './Welcome.less';

const CodePreview: React.FC<{}> = ({ children }) => (
    <pre className={styles.pre}>
        <code>
            <Typography.Text copyable>{children}</Typography.Text>
        </code>
    </pre>
);

export default (): React.ReactNode => (
    <PageHeaderWrapper>
        <Card>
            <Alert
                message="This is a welcome page, only visible to logged in users"
                type="success"
                showIcon
                banner
                style={{
                    margin: -12,
                    marginBottom: 24
                }}
            />
            <Typography.Text strong>
                Start the front end in development
            </Typography.Text>
            <CodePreview> npm run start:dev</CodePreview>
            <Typography.Text strong>
                Fix auto-fixable code style problems
            </Typography.Text>
            <CodePreview> npm run lint:fix</CodePreview>
            <Typography.Text
                strong
                style={{
                    marginBottom: 12
                }}
            >
                Check code style, lint rules and TypeScript compilation
            </Typography.Text>
            <CodePreview> npm run lint</CodePreview>
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
