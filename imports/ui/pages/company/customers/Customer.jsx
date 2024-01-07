import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateCustomerSchema } from "../../../../api/schemas/CustomerSchema";
import { toastr } from "react-redux-toastr";
import { Edit3, Trash2 } from "react-feather";

const Customer = ({ customer, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UpdateCustomerSchema),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCustomer = () => {
    Meteor.call("deleteCustomer", customer._id, (e, r) => {
      if (!e) fetch();
    });
  };
  const UpdateCustomer = (data) => {
    console.log(data);
    Meteor.call("updateCustomer", { id: customer._id, data }, (err) => {
      if (!err) {
        toastr.success("", "Customer Updated Successfully");
        fetch();
        setShow(false);
      } else {
        toastr.error("unable to update Customer check this inputs ");
        console.log(err);
        setShow(false);
      }
    });
  };

  return (
    <>
      {show && <ModalRoot
        title="Modify Customer"
        refuse={handleClose}
        formId="customer-update"
        isActive={show}
        form={UpdateCustomer}
      >
        <form onSubmit={handleSubmit(UpdateCustomer)} id="customer-update">
          <section className="modal-card-body">
            <label htmlFor="customername" className="label">
              Customer Name
            </label>
            <p className="control">
              <input
                defaultValue={customer.fullName}
                type="text"
                name="fullName"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.fullName && (
              <p className="alert alert-danger">{errors.fullName.message}</p>
            )}
            <label htmlFor="customeremail" className="label">
              Customer Email
            </label>
            <p className="control">
              <input
                defaultValue={customer.email}
                type="text"
                name="email"
                ref={register}
                placeholder="Customer Email"
                className="input"
              />
            </p>{" "}
            {errors.email && (
              <p className="alert alert-danger">{errors.email.message}</p>
            )}
            <label htmlFor="phoneNumber" className="label">
              Customer Phone
            </label>
            <p className="control">
              <input
                defaultValue={customer.phoneNumber}
                type="text"
                name="phoneNumber"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.phoneNumber && (
              <p className="alert alert-danger">{errors.phoneNumber.message}</p>
            )}
            <label htmlFor="customerregion" className="label">
              Customer Region
            </label>
            <p className="control">
              <input
                defaultValue={customer.region}
                type="text"
                name="region"
                ref={register}
                placeholder="Customer Region"
                className="input"
              />
            </p>{" "}
            {errors.region && (
              <p className="alert alert-danger">{errors.region.message}</p>
            )}
          </section>
        </form>
      </ModalRoot>}
      <tr>
        <td>active</td>
        <td> {customer._id}</td>
        <td>{customer.fullName}</td>
        <td>{customer.phoneNumber}</td>
        <td>{customer.email}</td>
        <td>{moment(customer.creationDate).format("MMM DD YYYY")}</td>
        <td>
          <Edit3 onClick={handleShow} className="mr-2" />
          <Trash2 onClick={deleteCustomer} />
        </td>
      </tr>
    </>
  );
};
export default Customer;
