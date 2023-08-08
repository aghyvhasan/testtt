import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/pages/authentication/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
