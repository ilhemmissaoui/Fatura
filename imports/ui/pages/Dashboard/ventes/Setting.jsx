import React from "react";

const Setting = () => {
  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <div className="columns">
                <div>
                  <div className="field">
                    <label className="label">Company Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Text input"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Manager Name</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className="input is-success"
                        type="text"
                        placeholder="Text input"
                        defaultValue="bulma"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                      <span className="icon is-small is-right">
                        <i className="fas fa-check" />
                      </span>
                    </div>
                    <p className="help is-success">
                      This username is available
                    </p>
                  </div>
                  <div className="field">
                    <label className="label">Manager Mail</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className="input is-danger"
                        type="email"
                        placeholder="Email input"
                        defaultValue="hello@"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope" />
                      </span>
                      <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle" />
                      </span>
                    </div>
                    <p className="help is-danger">This email is invalid</p>
                  </div>
                  <div className="field">
                    <label className="label">Subject</label>
                    <div className="control">
                      <div className="select">
                        <select>
                          <option>Select dropdown</option>
                          <option>With options</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox" />I agree to the{" "}
                        <a href="#">terms and conditions</a>
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="question" />
                        Yes
                      </label>
                      <label className="radio">
                        <input type="radio" name="question" />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                      <button className="button is-link is-light">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
