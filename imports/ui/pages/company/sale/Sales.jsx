import React, { useState } from "react";

import { Meteor } from "meteor/meteor";

import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import { yupResolver } from "@hookform/resolvers/yup";
import { SaleSchema } from "../../../../api/schemas/SaleSchema";

const Sales = ({ customer, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddCustomerSchema),
    defaultValues: {
      reference: sale.designation,
      quantity: sale.quantity,
      htprice: sale.htprice,
      vat: sale.vat,
      totalht: sale.totalht,
    
    },
  });
  const [update, setUpdate] = useState(sale);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });

  const deleteSale = () => {
    Meteor.call("deleteSale", customer._id, (e, r) => {
      if (!e) fetch();
    });
  };
  const UpdateSale = (data) => {
    Meteor.call("updateUpdate", { id: customer._id, data }, (err) => {
      if (!err) {
        fetch();
        setShow(false);
      } else {
        notyf.error({
          message: "unable to update Customer check this inputs ",
        });
      }
    });
  };

  return (
    <>
      {" "}
      <tr>
       
        <td> {sale.designation}</td>
        <td>{sale.quantity}</td>
        <td>{sale.htprice}</td>
        <td>{sale.vat}</td>
        <td>{sale.totalht}</td>
<td>
       <div className="dropdown">
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
      <span> + </span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu3" role="menu">
    <div className="dropdown-content">
    <Link to="#" onClick={(_) => onDelete()} className="btn btn-danger">
            Delete
          </Link>
          <Link to="#" onClick={handleShow} className="btn btn-warning">
            Update
          </Link>
     
    </div>
  </div>
</div> </td>

      </tr>
      <div
        className="modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit customer </p>
            <button className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">
            <form onSubmit={handleSubmit(UpdateCustomer)} id="update">
              <label>Name :</label>
              <input
                type="text"
                name="customername"
                ref={register}
                placeholder="Customer Name"
                className="form-control"
              />
              {errors.customername && (
                <p className="alert alert-danger">{errors.fullName.message}</p>
              )}
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" form="update">
              Save changes
            </button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    </>
  );
};
export default Sales;


