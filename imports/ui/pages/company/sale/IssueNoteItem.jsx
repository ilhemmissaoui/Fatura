import clsx from "clsx";
import moment from "moment";
import React from "react";
import { Edit3, Trash2, File } from "react-feather";
import { Link } from "react-router-dom";

const IssueItem = (props) => {

  const { sales, fetch } = props;


  const deleteSale = () => {
    Meteor.call("deleteEstimate", sales._id, (e, r) => {
      if (!e) fetch();
    })
  }


  return (
    <>
      <tr>
        <td>{sales._id}</td>
        <td>{moment(sales.creationDate).format("MMM DD YYYY")}</td>
        <td>{sales.customer}</td>
        <td>{sales.totaleTaxeIncl}</td>
        <td
          className={clsx(
            {
              "has-text-primary": sales?.status === "Accpeted",
            },
            {
              "has-text-danger": sales?.status === "Canceled",
            }
          )}
        >
          {sales?.status}
        </td>
        <td>
          <Link to={`/${Roles.getRolesForUser(
            Meteor.userId()
          )[0]?.toLowerCase()}/estimate/print/${sales._id}`}>
            <File className="mx-2" /></Link>
          <Trash2 className="mx-2" onClick={_ => deleteSale()} />
          <Link to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/estimate/update/${sales._id}`}> <Edit3 /> </Link>
        </td>
      </tr>
    </>
  );
};

export default IssueItem;
