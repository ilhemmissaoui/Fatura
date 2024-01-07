import React from "react";
import Typical from "react-typical";

const ContactUs = () => {
  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <section className="hero is-variable is-desktop">
                <div className="hero-body">
                  <div className="container has-text-centered">
                    <div className="columns is-8 is-variable is-desktop ">
                      <div className="column is-two-thirds has-text-left">
                        <h1 className="title is-1">
                          Contact{" "}
                          <Typical
                            loop={Infinity}
                            wrapper="b"
                            steps={["  Us (wannabe)", 1000]}
                          />
                        </h1>
                        <p className="is-size-4">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Nulla eligendi soluta voluptate facere molestiae
                          consequatur.
                        </p>
                        <div className="social-media">
                          <a
                            href="https://facebook.com"
                            target="_blank"
                            className="button is-light is-large"
                          >
                            <i
                              className="fa fa-facebook-square"
                              aria-hidden="true"
                            />
                          </a>
                          <a
                            href="https://instagram.com"
                            target="_blank"
                            className="button is-light is-large"
                          >
                            <i className="fa fa-instagram" aria-hidden="true" />
                          </a>
                          <a
                            href="https://twitter.com"
                            target="_blank"
                            className="button is-light is-large"
                          >
                            <i className="fa fa-twitter" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                      <div className="column is-one-third has-text-left">
                        <div className="field">
                          <label className="label">Name</label>
                          <div className="control">
                            <input className="input is-medium" type="text" />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Email</label>
                          <div className="control">
                            <input className="input is-medium" type="text" />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Message</label>
                          <div className="control">
                            <textarea
                              className="textarea is-medium"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="control">
                          <button
                            type="submit"
                            className="button is-link is-fullwidth has-text-weight-medium is-medium"
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
