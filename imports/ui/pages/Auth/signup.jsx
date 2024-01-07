import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "../../../api/schemas/SignUpSchema";
import { toastr } from "react-redux-toastr";

const SingUp = (props) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignUpSchema),
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  console.log(errors);

  const onSubmit = (data) => {
    Meteor.call("userRegister", data, (error) => {
      if (error) {
        console.log(`%c ${error}`, "color: gold; background: #252525");
        setError(error.reason);
      } else {
        console.log(props);
        toastr.success("", "Account Created Successfully");
        props.history.push("/login");
      }
    });
  };

  return (
    <div>
      <section className="container">
        <div className="columns is-multiline">
          <div className="column is-8 is-offset-2 register">
            <div className="columns">
              <div className="column left">
                <h1 className="title is-1">E-BILL</h1>
                <h2 className="subtitle colored is-4">
                  Welcome
                </h2>
              </div>
              <div className="column right has-text-centered">
                <h1 className="title is-4">Sign up</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="field">
                    <div className="control">
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      {success && (
                        <div className="alert alert-success" role="alert">
                          User successFully Registred
                        </div>
                      )}
                      <input
                        className="input is-medium"
                        name="firstName"
                        type="text"
                        ref={register}
                        placeholder="Enter the First Name"
                      />
                      <div className="invalid-feedback d-block">
                        {errors.firstName?.message}
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        name="lastName"
                        type="text"
                        ref={register}
                        placeholder="Enter the First Name"
                      />
                      <div className="invalid-feedback d-block">
                        {errors.lastName?.message}
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        name="email"
                        type="email"
                        ref={register}
                        placeholder="your Email adress"
                      />
                      <div className="invalid-feedback d-block">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        name="password"
                        type="password"
                        ref={register}
                        placeholder="Enter the password"
                        autoComplete="off"
                      />
                      <div className="invalid-feedback d-block">
                        {errors.password?.message}
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        name="confirmPassword"
                        type="password"
                        ref={register}
                        placeholder="Confirm your password"
                        autoComplete="off"
                      />
                      <div className="invalid-feedback d-block">
                        {errors.confirmPassword?.message}
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        name="companyName"
                        type="text"
                        ref={register}
                        placeholder="Enter your Company Name"
                      />
                      <div className="invalid-feedback d-block">
                        {errors.companyName?.message}
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        name="phoneNumber"
                        type="tel"
                        ref={register}
                        placeholder="Enter your phone number"
                      />
                      <div className="invalid-feedback d-block">
                        {errors.phoneNumber?.message}
                      </div>
                    </div>
                  </div>

                  <button className="button is-block is-primary is-fullwidth is-medium">
                    Submit
                  </button>
                  <br />
                </form>
              </div>
            </div>
          </div>
          <div className="column is-8 is-offset-2">
            <br />
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <span className="icon">
                    <i className="fab fa-twitter" />
                  </span>{" "}

                  <span className="icon">
                    <i className="fab fa-facebook" />
                  </span>{" "}

                  <span className="icon">
                    <i className="fab fa-instagram" />
                  </span>{" "}

                  <span className="icon">
                    <i className="fab fa-github" />
                  </span>{" "}

                  <span className="icon">
                    <i className="fas fa-envelope" />
                  </span>
                </div>
              </div>
              <div className="level-right">
                <small
                  className="level-item"
                  style={{ color: "var(--textLight)" }}
                >
                  ©{new Date().getFullYear()} All Rights Reserved.
                </small>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingUp;
