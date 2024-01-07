import React from "react";
import MyButton from "../../components/button";

const ForgotPassword = (props) => {
  return (
    <div className="page page-center">
      <div className="container-tight py-4">
        <div className="text-center mb-4"></div>
        <form className="card card-md" action="." method="get">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Forgot password</h2>
            <p className="text-muted mb-4">
              Enter your email address and your password will be reset and
              emailed to you.
            </p>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-footer">
              <MyButton title={"Send"} />
            </div>
          </div>
        </form>
        <div className="text-center text-muted mt-3">
          Forget it, <a href="./sign-in.html">send me back</a> to the sign in
          screen.
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
