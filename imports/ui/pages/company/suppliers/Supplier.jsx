import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateSupplierrSchema } from "../../../../api/schemas/SupplierSchema";
import { toastr } from "react-redux-toastr";
import { Edit, Trash2 } from "react-feather";

const Supplier = ({ supplier, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UpdateSupplierrSchema),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteSupplier = () => {
    Meteor.call("deleteSupplier", supplier._id, (e, _) => {
      if (!e) fetch();
    });
  };
  const updateSupplier = (data) => {
    console.log(data);
    Meteor.call("updateSupplier", { id: supplier._id, data }, (err) => {
      if (!err) {
        fetch();
        toastr.success("", "Supplier Updated Successfully");
        setShow(false);
      } else {
        console.log(err);
        toastr.error("unable to update Supplier check this inputs ");
        setShow(false);
      }
    });
  };

  return (
    <>
      {show && <ModalRoot
        title="Modify Supplier"
        refuse={handleClose}
        formId="updateSupplier"
        isActive={show}
      >
        <form onSubmit={handleSubmit(updateSupplier)} id="updateSupplier">
          <section className="modal-card-body">
            <label htmlFor="suppliername" className="label">
              Supplier Name
            </label>
            <p className="control">
              <input
                defaultValue={supplier.fullName}
                type="text"
                name="fullName"
                ref={register}
                placeholder="Supplier Name"
                className="input"
              />
            </p>{" "}
            {errors.fullName && (
              <p className="alert alert-danger">{errors.fullName.message}</p>
            )}
            <label htmlFor="supplieremail" className="label">
              Supplier Email
            </label>
            <p className="control">
              <input
                defaultValue={supplier.email}
                type="text"
                name="email"
                ref={register}
                placeholder="Supplier Email"
                className="input"
              />
            </p>{" "}
            {errors.email && (
              <p className="alert alert-danger">{errors.email.message}</p>
            )}
            <label htmlFor="phoneNumber" className="label">
              Supplier Phone
            </label>
            <p className="control">
              <input
                defaultValue={supplier.phoneNumber}
                type="text"
                name="phoneNumber"
                ref={register}
                placeholder="Supplier phone"
                className="input"
              />
            </p>{" "}
            {errors.phoneNumber && (
              <p className="alert alert-danger">{errors.phoneNumber.message}</p>
            )}
            <label htmlFor="supplierregion" className="label">
              Supplier Region
            </label>
            <p className="control">
              <input
                defaultValue={supplier.region}
                type="text"
                name="region"
                ref={register}
                placeholder="Supplier Region"
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
        <td> Active</td>
        <td> {supplier._id}</td>
        <td>{supplier.fullName}</td>
        <td>{supplier.phoneNumber}</td>
        <td>{supplier.email}</td>
        <td>{moment(supplier.creationDate).format("MMM DD YYYY")}</td>

        <td>
          <Edit className="is-info" onClick={handleShow} />
          <Trash2 className="is-danger" onClick={deleteSupplier} />
        </td>
      </tr>


    </>
  );
};
export default Supplier;
