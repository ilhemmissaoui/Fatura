import React from 'react';
import { Send } from 'react-feather';
import { Link } from 'react-router-dom';


export default MessagePlaceHolder = () => {

    return <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="columns">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <Link to="/super_admin/companies" className="button is-primary mr-2">Start chat <Send /></Link>
                    <h2 className="subtitle">
                        Select a company to Start Messaging
                    </h2>
                </div>
            </div>
        </div>
    </div>
}