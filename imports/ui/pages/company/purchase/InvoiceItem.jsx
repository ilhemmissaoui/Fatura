import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { DollarSign, Edit3, File, Trash2 } from "react-feather";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
import ModalRoot from "../../../components/ModalView";



const InvoiceItems = ({ sales, fetch }) => {
  const { register, handleSubmit, errors } = useForm({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteSale = () => {
    Meteor.call("deleteSUpplierOrder", sales._id, (e, _) => {
      if (!e) fetch();
    })
  }

  const updateProduct = (data) => {
    Meteor.call("paySupplierAmount", { _id: sales._id, amount: data.amountToPay }, (err) => {
      if (!err) {
        toastr.success("", "Amount has been Payed Successfully");
        fetch();
        setShow(false);
      } else {
        toastr.error(err.reason);
        setShow(false);
      }
    });
  };

  return (
    <>
      {show && <ModalRoot
        title="Add amount"
        refuse={handleClose}
        formId="update"
        isActive={show}
      >
        <form onSubmit={handleSubmit(updateProduct)} id="update">
          <section className="modal-card-body">
            <label htmlFor="productname" className="label">
              Amount To Pay
            </label>
            <p className="control">
              <input
                type="text"
                name="amountToPay"
                ref={register}
                placeholder="Ex: 350"
                className="input"
              />
            </p>{" "}
          </section>
        </form>
      </ModalRoot>}
      <tr>
        <td>{sales._id}</td>
        <td>{moment(sales.creationDate).format("MMM DD YYYY")}</td>
        <td>{sales.supplier}</td>
        <td>{sales.totaleTaxeIncl} TND</td>
        <td>{(sales?.payedAmount)?.toFixed(2) ?? "0"} TND</td>
        <td
          className={clsx(
            {
              "has-text-primary": sales.totaleTaxeIncl <= sales.payedAmount,
            },
            {
              "has-text-danger": sales.totaleTaxeIncl > sales.payedAmount,
            }
          )}
        >
          {sales.totaleTaxeIncl <= sales.payedAmount ? "Payed" : "Not Payed Yet"}
        </td>
        <td>
          <Link to={`/${Roles.getRolesForUser(
            Meteor.userId()
          )[0]?.toLowerCase()}/delivery/print/${sales._id}`}>
            <File className="mr-2" /></Link>
          <DollarSign onClick={handleShow} />
          <Trash2 className="mx-3" onClick={_ => deleteSale()} />
          <Link to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/purchase/update/${sales._id}`}> <Edit3 /> </Link>
        </td>
      </tr>
    </>
  );
};

export default InvoiceItems;
