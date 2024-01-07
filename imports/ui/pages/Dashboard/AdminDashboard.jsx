import React, { useEffect, useState } from "react";
import Typical from "react-typical";
const DashboardAdmin = () => {

  const [companiesCount, setCompaniesCount] = useState(0)

  const getCompanies = () => {
    Meteor.call("enrolledCoompanies", (e, r) => {
      if (!e) setCompaniesCount(r);
      else console.log(r);
    })
  }

  useEffect(() => {
    getCompanies()
  }, [])


  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <h1 className="title is-1">
                <Typical
                  loop={Infinity}
                  wrapper="b"
                  steps={["  Hello Admin", 1000]}
                />
              </h1>
            </div>
          </div>
          <div className="columns  is-variable is-desktop">
            <div className="column">
              <div className="card has-background-primary has-text-white">
                <div className="card-header">
                  <div className="card-header-title has-text-white">
                    Enrolled Companies
                  </div>
                </div>
                <div className="card-content">
                  <p className="is-size-3">{companiesCount}</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card has-background-warning has-text-black">
                <div className="card-header">
                  <div className="card-header-title has-text-black is-uppercase">
                    Revenue
                  </div>
                </div>
                <div className="card-content">
                  <p className="is-size-3">55%</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card has-background-info has-text-white">
                <div className="card-header">
                  <div className="card-header-title has-text-white is-uppercase">
                    Feedback
                  </div>
                </div>
                <div className="card-content">
                  <p className="is-size-3">78 %</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card has-background-danger has-text-white">
                <div className="card-header">
                  <div className="card-header-title has-text-white">Orders</div>
                </div>
                <div className="card-content">
                  <p className="is-size-3">425k</p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-variable">
            <div className="column is-4-desktop is-6-tablet">
              <article className="message is-info">
                <div className="message-header">
                  <p>Info</p>
                  <button className="delete" aria-label="delete" />
                </div>
                <div className="message-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <strong>Pellentesque risus mi</strong>, tempus quis placerat
                  ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet
                  fringilla. Nullam gravida purus diam, et dictum
                  <a>felis venenatis</a> efficitur. Aenean ac
                  <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu
                  et sollicitudin porttitor, tortor urna tempor ligula, id
                  porttitor mi magna a neque. Donec dui urna, vehicula et sem
                  eget, facilisis sodales sem.
                </div>
              </article>
            </div>
            <div className="column is-4-desktop is-6-tablet">
              <article className="message is-success">
                <div className="message-header">
                  <p>Info</p>
                  <button className="delete" aria-label="delete" />
                </div>
                <div className="message-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <strong>Pellentesque risus mi</strong>, tempus quis placerat
                  ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet
                  fringilla. Nullam gravida purus diam, et dictum
                  <a>felis venenatis</a> efficitur. Aenean ac
                  <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu
                  et sollicitudin porttitor, tortor urna tempor ligula, id
                  porttitor mi magna a neque. Donec dui urna, vehicula et sem
                  eget, facilisis sodales sem.
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
