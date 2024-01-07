import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateCompanyUser } from "../../../../api/schemas/CompanyUsers";
import { toastr } from "react-redux-toastr";
import { Edit3, Trash2 } from "react-feather";

const Users = ({ customer, fetch }) => {

  console.log(customer);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UpdateCompanyUser),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteCompanyUser = () => {
    Meteor.call("deleteCompanyUser", customer._id, (e, _) => {
      if (!e) fetch();
    });
  };
  const updateUser = (data) => {
    console.log(data);
    Meteor.call("updateCompanyUser", { id: customer._id, data }, (err) => {
      if (!err) {
        toastr.success("", "User Updated Successfully");
        fetch();
        setShow(false);
      } else {
        toastr.error("unable to update User check the inputs ");
        setShow(false);
      }
    });
  };

  return (
    <>
      {show && <ModalRoot
        title="Modify User"
        refuse={handleClose}
        formId="customer-update"
        isActive={show}
      >
        <form onSubmit={handleSubmit(updateUser)} id="customer-update">
          <section className="modal-card-body">
            <label htmlFor="customername" className="label">
              First Name
            </label>
            <div className="control">
              <input
                defaulValue={customer.profile?.firstName}
                type="text"
                name="firstName"
                ref={register}
                placeholder="First Name"
                className="input"
              />
            </div>{" "}
            {errors.firstName && (
              <div className="alert alert-danger">{errors.firstName.message}</div>
            )}
            <label htmlFor="lastName" className="label">
              last Name
            </label>
            <div className="control">
              <input
                defaulValue={customer.profile?.lastName}
                type="text"
                name="lastName"
                ref={register}
                placeholder="last Name"
                className="input"
              />
            </div>{" "}
            {errors.lastName && (
              <div className="alert alert-danger">{errors.lastName.message}</div>
            )}
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                defaulValue={customer?.emails[0]?.address}
                type="text"
                name="email"
                ref={register}
                placeholder="Email"
                className="input"
              />
            </div>{" "}
            {errors.email && (
              <div className="alert alert-danger">{errors.email.message}</div>
            )}
            <label htmlFor="phoneNumber" className="label">
              Phone
            </label>
            <div className="control">
              <input
                defaulValue="Customer default"
                type="text"
                name="phoneNumber"
                ref={register}
                placeholder="phone number"
                className="input"
              />
            </div>{" "}
            {errors.phoneNumber && (
              <div className="alert alert-danger">{errors.phoneNumber.message}</div>
            )}
          </section>
        </form>
      </ModalRoot>}
      <tr>
        <td>active</td>
        <td>{customer._id}</td>
        <td>{customer.profile?.firstName}</td>
        <td>{customer.profile?.phoneNumber ?? "N/A"}</td>
        <td>{Roles.getRolesForUser(customer?._id)[0]?.replace("_", " ") ?? "--"}</td>
        <td>{customer.emails[0]?.address}</td>
        <td>{moment(customer.creationDate).format("MMM DD YYYY")}</td>
        <td>
          <Edit3 onClick={handleShow} className="mr-3" />
          <Trash2 onClick={deleteCompanyUser} className="has-text-danger" />
        </td>
      </tr>
    </>
  );
};
export default Users;
