import clsx from "clsx";
import moment from "moment";
import React from "react";
import { Trash2, Edit3 } from "react-feather";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";


const SupplyOrderItem = ({ supplyOrder, fetch }) => {
    const onChange = (e) => {
        e.preventDefault();
        const status = e.target.value;
        Meteor.call("updateSupplyordertatus", supplyOrder._id, status, (e, r) => {
            if (!e) {
                toastr.info("", "Status Changed successfully");
                fetch();
            } else console.log(e);
        });
    };

    const deleteSupplyOrder = () => {
        Meteor.call("deleteSupplyOrder", supplyOrder._id, (e, r) => {
            if (!e) fetch();
        })
    }

    return (
        <>
            <tr>
                <td>{supplyOrder._id}</td>
                <td>{moment(supplyOrder.creationDate).format("MMM DD YYYY")}</td>
                <td>{supplyOrder.supplier}</td>
                <td>{supplyOrder.totaleTaxeIncl}</td>
                <td
                    className={clsx(
                        {
                            "has-text-primary": supplyOrder?.status === "Accpeted",
                        },
                        {
                            "has-text-danger": supplyOrder?.status === "Canceled",
                        }
                    )}
                >
                    {supplyOrder?.status}
                </td>
                <td>
                    <div class="select is-rounded">
                        <select onChange={onChange}>
                            <option selected={supplyOrder?.status === "Accpeted"} value="Accpeted">
                                Accept
                            </option>
                            <option selected={supplyOrder?.status === "Canceled"} value="Canceled">
                                Cancel
                            </option>
                        </select>
                    </div>
                    <Trash2 className="mx-3" onClick={_ => deleteSupplyOrder()} />
                    <Link to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/purchase/update/${supplyOrder._id}`}> <Edit3 /> </Link>

                </td>
            </tr>
        </>
    );
};

export default SupplyOrderItem;
