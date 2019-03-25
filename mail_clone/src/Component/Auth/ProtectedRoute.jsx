
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                var username = localStorage.getItem("username");
                if ( username !== null) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }
                    />
                }
            }}
        />
    );
};