import React, { useState, useEffect } from "react";
import ClientItem from "./ClientItem";

const ClientsList = () => {
  const [clients, setClients] = useState([]);

  const getCLients = () => {
    Meteor.call("getClients", (e, r) => {
      if (!e) setClients(r);
    });
  };

  const getInfo = () => {
    Meteor.call("getInfo", (e, r) => {
      console.log(r);
    });
  };

  useEffect(() => {
    getCLients();
    getInfo();
  }, []);

  return (
    <div>
      <div className="container has-text-centered">
        <div className="columns is-mobile is-centered">
          <div className="column is-8">
            <div>
              <h1 className="title">User Information</h1>
              <hr />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>userId</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="w-1" />
                </tr>
              </thead>
              <tbody>
                {clients.map((e) => (
                  <ClientItem clientInfo={e} refreshUsers={getCLients} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center text-muted mt-3">
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={(_) => Meteor.logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientsList;
