import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router";

const Public = ({
  loggingIn,
  authenticated,
  roles,
  component,
  path,
  exact,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      !authenticated ? (
        React.createElement(component, {
          ...props,
          ...rest,
          loggingIn,
          authenticated,
          roles,
        })
      ) : (
        <Redirect to={Roles.getRolesForUser(Meteor.userId())?.length ? `/${Roles.getRolesForUser(Meteor.userId())[0]?.toLowerCase()}` : "/"} />
      )
    }
  />
);

Public.defaultProps = {
  loggingIn: false,
  path: "",
  exact: false,
  afterLoginPath: null,
  roles: Roles.getRolesForUser(Meteor.userId()),
};

Public.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  afterLoginPath: PropTypes.string,
  path: PropTypes.string,
  roles: PropTypes.array,
  exact: PropTypes.bool,
};

export default withRouter(withTracker(({ }) => {
  console.log('Logged Out');
})(Public));
