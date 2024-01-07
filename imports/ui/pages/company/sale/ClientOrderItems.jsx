import clsx from "clsx";
import moment from "moment";
import React from "react";
import { File, Trash2 } from "react-feather";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";

const ClientOrderItems = ({ sales, fetch }) => {
  const deleteSale = () => {
    Meteor.call("deleteSale", sales._id, (e, r) => {
      if (!e) fetch();
    });
  };
  return (
    <>
      <tr>
        <td>{sales._id}</td>
        <td>{moment(sales.creationDate).format("MMM DD YYYY")}</td>
        <td>{sales.customer}</td>
        <td>{sales.totaleTaxeIncl}</td>
        <td>
          <Link to={`/${Roles.getRolesForUser(
            Meteor.userId()
          )[0]?.toLowerCase()}/estimate/print/${sales._id}`}>
            <File className="mr-2" /></Link>
          <Trash2 onClick={deleteSale} />
        </td>
      </tr>
    </>
  );
};

export default ClientOrderItems;
