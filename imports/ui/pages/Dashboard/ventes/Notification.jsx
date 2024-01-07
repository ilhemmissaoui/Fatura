import React from "react";

const Notification = () => {
  return (
    <div>
      {" "}
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <div className="columns">
                <div className="timeline is-centered">
                  <header className="timeline-header">
                    <span className="tag is-medium is-primary">Start</span>
                  </header>
                  <div className="timeline-item is-primary">
                    <div className="timeline-marker is-primary" />
                    <div className="timeline-content">
                      <p className="heading">January 2016</p>
                      <p>Timeline content - Can include any HTML element</p>
                    </div>
                  </div>
                  <div className="timeline-item is-warning">
                    <div className="timeline-marker is-warning is-image is-32x32">
                      <img src="https://bulma.io/images/placeholders/32x32.png" />
                    </div>
                    <div className="timeline-content">
                      <p className="heading">February 2016</p>
                      <p>Timeline content - Can include any HTML element</p>
                    </div>
                  </div>
                  <header className="timeline-header">
                    <span className="tag is-primary">2017</span>
                  </header>
                  <div className="timeline-item is-danger">
                    <div className="timeline-marker is-danger is-icon">
                      <i className="fa fa-flag" />
                    </div>
                    <div className="timeline-content">
                      <p className="heading">March 2017</p>
                      <p>Timeline content - Can include any HTML element</p>
                    </div>
                  </div>
                  <header className="timeline-header">
                    <span className="tag is-medium is-primary">End</span>
                  </header>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
