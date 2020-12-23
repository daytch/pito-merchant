import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('PITO:merchant-token')
    
    return (
        <Route
            {...rest}
            render={props => token ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
                )}

        />
    )
}

export default PrivateRoute;
