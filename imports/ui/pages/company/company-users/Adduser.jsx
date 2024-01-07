import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
import { AddCompanyUser } from "../../../../api/schemas/CompanyUsers";
const AddUser = (props) => {

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddCompanyUser),
  });
  const onSubmit = (data) => {
    console.log(data);
    Meteor.call("addCompanyUser", data, (e, _) => {
      if (e) {
        console.log(e);
      } else {
        toastr.success("", "User has Been Added");
        props.history.push("/company/users");
      }
    });
  };

  return (
    <>
      <div>
        <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
          <div className="p-1">
            <div className="columns is-variable is-desktop">
              <div className="column">
                <div className="hero-body">
                  <div className="container">
                    <div className="bd-hero-body">
                      <div className="bd-hero-heading">
                        <h1 className="title algolia-lvl0">
                          <p>Add User</p>
                        </h1>
                        <section class="section">
                          <h1 class="subtitle">Informations</h1>
                          <div className="card pb-5">
                            <div className="card-content">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="column is-one-fifth">
                                </div>
                                <div className="column">
                                  <div className="field">
                                    <label className="label">
                                      First Name
                                      </label>
                                    <div className="control">
                                      <input
                                        ref={register}
                                        className="input"
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                      />
                                    </div>
                                    <div className="help is-danger d-block">
                                      {errors.firstName?.message}
                                    </div>
                                  </div>
                                </div>
                                <div className="column">
                                  <div className="field">
                                    <label className="label">
                                      Last Name
                                      </label>
                                    <div className="control">
                                      <input
                                        ref={register}
                                        className="input"
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                      />
                                    </div>
                                    <div className="help is-danger d-block">
                                      {errors.lastName?.message}
                                    </div>
                                  </div>
                                </div>
                                <div className="column">
                                  <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                      <input
                                        ref={register}
                                        className="input"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                      />
                                    </div>
                                    <div className="help is-danger d-block">
                                      {errors.email?.message}
                                    </div>
                                  </div>
                                </div>
                                <div className="column">
                                  <div className="field">
                                    <label className="label">
                                      Contact Number
                                      </label>
                                    <div className="control">
                                      <input
                                        ref={register}
                                        className="input"
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="+21621321456"
                                      />
                                    </div>
                                    <div className="help is-danger d-block">
                                      {errors.phoneNumber?.message}
                                    </div>
                                  </div>
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2">
                                  Security
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="column">
                                  <div className="field">
                                    <label className="label">
                                      Password
                                      </label>
                                    <div className="control">
                                      <input
                                        ref={register}
                                        className="input"
                                        name="password"
                                        type="password"
                                        placeholder="******"
                                      />
                                    </div>
                                    <div className="help is-danger d-block">
                                      {errors.socialReason?.message}
                                    </div>
                                  </div>
                                </div>
                                <div className="column">
                                  <div class="select" >
                                    <select name="role" ref={register}>
                                      <option value="SALES_MANAGER">Sales Manager</option>
                                      <option value="PURCHASING_MANAGER">Purchasing Manager</option>
                                      <option value="STORE_KEEPER">Store Keeper</option>
                                    </select>
                                  </div>
                                  <div className="help is-danger d-block">
                                    {errors.role?.message}
                                  </div>
                                </div>
                                <div className="columns is-desktop mt-0 mx-2">
                                  <div className="control">
                                    <button
                                      type="submit"
                                      className="button is-primary"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
