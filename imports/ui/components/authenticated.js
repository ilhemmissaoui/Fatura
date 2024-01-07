import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ loggingIn, authenticated, component, path, exact, ...rest }) => (
    <Route
        path={path}
        exact={exact}
        render={(props) =>
            authenticated ? (
                React.createElement(component, {
                    ...props,
                    ...rest,
                    loggingIn,
                    authenticated
                })
            ) : (
                <Redirect to="/login" />
            )}
    />
)
export default Authenticated;