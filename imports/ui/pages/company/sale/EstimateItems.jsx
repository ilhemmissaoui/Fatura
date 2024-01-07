import clsx from "clsx";
import moment from "moment";
import React from "react";
import { Edit3, Trash2 } from "react-feather";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";

const EstimateItems = (props) => {

  const { sales, fetch } = props;

  const onChange = (e) => {
    e.preventDefault();
    const status = e.target.value;
    Meteor.call("updateSaleStatus", sales._id, status, (e, r) => {
      if (!e) {
        toastr.info("", "Status Changed successfully");
        fetch();
      } else console.log(e);
    });
  };

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
          <div class="select is-rounded">
            <select onChange={onChange}>
              <option selected={sales?.status === "Accpeted"} value="Accpeted">
                Accept
              </option>
              <option selected={sales?.status === "Canceled"} value="Canceled">
                Cancel
              </option>
            </select>
          </div>
          <Trash2 className="mx-3" onClick={_ => deleteSale()} />
          <Link to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/estimate/update/${sales._id}`}> <Edit3 /> </Link>
        </td>
      </tr>
    </>
  );
};

export default EstimateItems;
