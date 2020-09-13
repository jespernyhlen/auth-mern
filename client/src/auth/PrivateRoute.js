import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/Helpers';

// For informatino about auth route https://reactrouter.com/web/example/auth-workflow
// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            )
        }
    ></Route>
);

export default PrivateRoute;
