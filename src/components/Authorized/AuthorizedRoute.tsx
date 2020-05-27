import React from 'react';
import { Redirect, Route } from 'umi';

import Authorized from './Authorized';
import { IAuthorityType } from './CheckPermissions';

interface AuthorizedRoutePops {
    currentAuthority: string;
    component: React.ComponentClass<object, object>;
    render: (props: object) => React.ReactNode;
    redirectPath: string;
    authority: IAuthorityType;
}

const AuthorizedRoute: React.SFC<AuthorizedRoutePops> = ({
    component: Component,
    render,
    authority,
    redirectPath,
    ...rest
}) => (
    <Authorized
        authority={authority}
        noMatch={
            <Route
                {...rest}
                render={(): JSX.Element => (
                    <Redirect to={{ pathname: redirectPath }} />
                )}
            />
        }
    >
        <Route
            {...rest}
            render={(props: object): React.ReactNode =>
                Component ? <Component {...props} /> : render(props)
            }
        />
    </Authorized>
);

export default AuthorizedRoute;
