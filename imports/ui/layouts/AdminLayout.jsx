import React from "react";

import { withRouter } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const AdminLayout = ({ children, location, store, ...props }) => (
  <div className="page-wrapper">
    {Meteor.userId() ? (
      <>
        <NavBar location={location} {...props} />
        <main>{children}</main>
        <SideBar location={location} {...props} />
      </>
    ) : (
      props.history.push("/login")
    )}
  </div>
);

export default withRouter(AdminLayout);
