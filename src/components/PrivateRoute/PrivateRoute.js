import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, path, rest }) {    
    return (          
        <Route {...rest} render={props => {
            /*if (!localStorage.getItem('user')) {          
                return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
            } */         
            //return <Redirect to={{ pathname: '/admin/index', state: { from: props.location } }} />
            //return <Component {...props} />            
        }} />
    );
}

export default PrivateRoute;