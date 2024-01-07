import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanySchema } from "../../api/schemas/CompanySchema";
import { Button, Modal } from "react-bootstrap";
const AboutPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(CompanySchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    Meteor.call("addInfo", data, (e, r) => {
      if (e) console.log(e);
    });
  };
  const handleClose = () => setIsOpened(false);
  const handleShow = () => setIsOpened(true);

  return (
    <div>
     <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
      <div class="page-wrapper">
        <div className="container-xl">
          {/* Page title */}
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-4">
                      <div className="row">
                        <div className="col-md-6 col-xl-12">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                              <label className="form-label">My Company</label>
                              <div className="form-control-plaintext">
                                Start editing
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Company Name</label>
                              <input
                                type="text"
                                className="CompanyName"
                                name="CompanyName"
                                placeholder="Input placeholder"
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.CompanyName?.message}
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                tax registration number
                              </label>
                              <input
                                type="text"
                                className="tax"
                                name="tax"
                                placeholder="Input placeholder"
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.tax?.message}
                            </div>

                            <div className="mb-3">
                              <label className="form-label">Devis</label>
                              <input
                                type="text"
                                className="form-control"
                                name="example-disabled-input"
                                placeholder="TDN"
                                defaultValue="TDN"
                                readOnly
                              />
                            </div>

                            <div className="mb-3">
                              <label className="form-label">Email Adress</label>
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  name="email"
                                  id="floating-input"
                                  defaultValue="name@example.com"
                                  ref={register}
                                />
                              </div>
                              <div className="invalid-feedback d-block">
                                {errors.email?.message}
                              </div>{" "}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">First Name </label>
                              <input
                                type="text"
                                className="firstname"
                                name="firstname"
                                placeholder="First Name"
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.firstname?.message}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Last Name</label>
                              <input
                                type="text"
                                className="lastname"
                                name="lastname"
                                placeholder="Last Name"
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.lastname?.message}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Location</label>
                              <input
                                type="text"
                                className="Location"
                                name="location"
                                placeholder=""
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.location?.message}
                            </div>
                            <div className="mb-3">
                              <label className="form-label"> Postal Code</label>
                              <input
                                type="number"
                                className="postalcode"
                                name="postalcode"
                                ref={register}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Country</label>
                              <input
                                type="text"
                                className="country"
                                name="country"
                                placeholder=""
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.postalcode?.message}
                            </div>

                            <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
                              <button
                                onClick={handleShow}
                                className="btn btn-dark w-100"
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      </div>   </div>   </div>   </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={isOpened}
        // fade={false}
        animation={true}
        // style={{ width: "200px", display: "block" }}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Added succesfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleClose}>
            <button
              onHide={handleClose}
              type="submit"
              className="btn btn-primary w-100"
            >
              ok
            </button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default AboutPage;
