import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropType from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.PropType = {
  auth: PropType.object.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProp)(PrivateRoute);
