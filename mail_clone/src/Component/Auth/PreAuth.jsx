import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export const PreLogInAuth = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                var username = localStorage.getItem("username");
                if (username === null) {
                    return <Component {...props} />;
                }
                else if ( username !== null) {
                        return <Redirect to={
                            {
                                pathname: "/mail",
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
}