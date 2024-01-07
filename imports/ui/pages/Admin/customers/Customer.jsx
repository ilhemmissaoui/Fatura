import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateCustomerSchema } from "../../../../api/schemas/CustomerSchema";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
import { Lock, Send, Unlock } from "react-feather";

const Customer = ({ customer, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UpdateCustomerSchema),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCompany = (data) => {
    console.log(data);
    Meteor.call("activateDesactivateCompany", customer._id, (err, r) => {
      if (!err) {
        console.log(r);
        toastr.success("", "Company Status Has been Changed");
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
      <tr>
        <td>{customer.isActive ? "Active" : "Bloqued"}</td>
        <td>{customer._id}</td>
        <td>{customer.profile?.firstName}</td>
        <td>{customer.profile?.lastName}</td>
        <td>{customer.emails[0].address}</td>
        <td>{moment(customer.creationDate).format("MMM DD YYYY")}</td>
        <td>
          {(customer.isActive ?? true) ? <Lock onClick={handleCompany} className="mx-2 has-text-danger" /> : <Unlock onClick={handleCompany} className="mx-2 has-text-success" />}
          {/* <Trash2 onClick={deleteCustomer} className="mx-2" /> */}
          <Link to={`/super_admin/messages/${customer._id}`}><Send className="mx-2" /></Link>
        </td>
      </tr>
    </>
  );
};
export default Customer;
