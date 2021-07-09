import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              //state is just a variable name in which we can assign something in order to access it in Signin component
              state: { from: props.location }, // inside the signin components we can use props.location.state.from
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
