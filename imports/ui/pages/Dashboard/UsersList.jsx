import React, { useEffect, useState } from "react";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Meteor.call("getClients", (e, r) => {
      //console.log(r);
    });

    // console.log(users);
  }, []);

  return (
    <div>
      <div className="card">
        <div className="table-responsive">
          <table className="table table-vcenter card-table">
            <thead>
              <tr>
                <th>users </th>
                <th class="w-1">users List</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <td key={user.id}>{user.profile.firstName}</td>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </div>
  );
};
export default UsersList;
