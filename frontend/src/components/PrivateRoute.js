import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
    const isLoggedIn = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn && userRole === role ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
