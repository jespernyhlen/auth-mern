import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ActivateAccount from './pages/ActivateAccount';

import Home from './pages/Home';
import Private from './pages/Private';
import Admin from './pages/Admin';

import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// import Users from './pages/Users';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route
                path='/auth/activate/:token'
                exact
                component={ActivateAccount}
            />
            <PrivateRoute path='/private' exact component={Private} />
            <AdminRoute path='/admin' exact component={Admin} />
            <Route
                path='/auth/password/forgot'
                exact
                component={ForgotPassword}
            />
            <Route
                path='/auth/password/reset/:token'
                exact
                component={ResetPassword}
            />
            {/* <PrivateRoute path='/users' exact component={Users} /> */}
            <Route path='/' component={Home} />
        </Switch>
    );
};

export default Routes;
