import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

const Protected = ({ component: Component, isLogged, ...rest }) => {
    return (
      <Route {...rest}
        render={props =>
            isLogged ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/join",
                        state: { from: props.location }
                    }}
                />
            )
        }
      />
    );
}

export default Protected
  