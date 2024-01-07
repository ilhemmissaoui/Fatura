import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { Roles } from "meteor/alanning:roles";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

const Authorized = (props) => {
  const [authorized, setState] = useState({ authorized: false });

  useEffect(() => {
    checkIfAuthorized();
  }, [props.userRoles]);

  checkIfAuthorized = () => {
    const {
      history,
      loading,
      userId,
      userRoles,
      userIsInRoles,
      pathAfterFailure,
    } = props;

    if (!userId) history.push(pathAfterFailure || "/");

    if (!loading && userRoles.length > 0) {
      if (!userIsInRoles) {
        history.push(pathAfterFailure || "/");
      } else {
        if (!authorized) setState({ authorized: true });
      }
    }
  };

  const { component, path, exact, ...rest } = props;

  return authorized ? (
    <Route
      path={path}
      exact={exact}
      render={(props) => React.createElement(component, { ...rest, ...props })}
    />
  ) : (
    <Redirect to="/login" />
  );
};

Authorized.defaultProps = {
  allowedGroup: null,
  userId: null,
  exact: false,
  userRoles: [],
  userIsInRoles: false,
  pathAfterFailure: "/",
};

export default withRouter(
  withTracker(({ allowedRoles, allowedGroup }) => {
    return {
      loading: Meteor.isClient ? !Roles.subscription.ready() : true,
      userId: Meteor.userId(),
      userRoles: Roles.getRolesForUser(Meteor.userId()),
      userIsInRoles: Roles.userIsInRole(
        Meteor.userId(),
        allowedRoles,
        allowedGroup
      ),
    };
  })(Authorized)
);
