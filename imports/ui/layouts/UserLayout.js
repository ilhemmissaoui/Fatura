import React from "react";
import { withRouter } from "react-router-dom";


const UserLayout = ({ children, location, store, ...props }) => (
    <div className='page'>
        {Meteor.isClient && Meteor.userId() ? (
            props.loading ?
                <div>Loading</div>
                : (
                    <>
                        <main>{children}</main>
                    </>
                )) : Meteor.isClient ? (
                    props.history.push("/login")
                ) : null}
    </div>
);

export default withRouter(UserLayout);
