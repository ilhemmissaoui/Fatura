import React, { useState, useEffect } from "react";
import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
const Devis = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <div className="mr-4">
                <Flatpickr
                  className="mr-5"
                  placeholder="Start Date "
                  data-enable-time
                  onChange={(date) => setState(date)}
                />
                <Flatpickr
                  className="mr-4"
                  placeholder="End Date"
                  data-enable-time
                  onChange={(date) => setState(date)}
                />

              
                <button className="button is-primary is-rounded">Add</button>
              </div>
              <div className="container">
                <div className="tabs is-fullwidth">
                  <ul>
                    <li>  <tr className="th is-selected">
                      <th>Student </th>
                      <th>Physics</th>
                      <th>Chemistry</th>
                      <th>Biology</th>
                      <th>Total</th>
                    </tr>
                      <a>
                        <span className="icon">
                          <i className="fas fa-angle-left" aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="icon">
                          <i
                            className="fas fa-angle-right"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                <table className="table is-bordered is-striped is-fullwidth">
                  <tbody>
                    <tr className="th is-selected">
                      <th>Student </th>
                      <th>Physics</th>
                      <th>Chemistry</th>
                      <th>Biology</th>
                      <th>Total</th>
                    </tr>
                 
                  </tbody>
                </table>
              </div>


              
              <footer className="footer">
                <div className="content has-text-centered">
                  <nav
                    className="pagination is-small"
                    role="navigation"
                    aria-label="pagination"
                  >
                    <a className="pagination-previous">Previous</a>
                    <a className="pagination-next">Next page</a>
                    <ul className="pagination-list">
                      <li>
                        <a className="pagination-link" aria-label="Goto page 1">
                          1
                        </a>
                      </li>
                      <li>
                        <span className="pagination-ellipsis">…</span>
                      </li>
                      <li>
                        <a
                          className="pagination-link"
                          aria-label="Goto page 45"
                        >
                          45
                        </a>
                      </li>
                      <li>
                        <a
                          className="pagination-link is-current"
                          aria-label="Page 46"
                          aria-current="page"
                        >
                          46

                        </a>
                      </li>
                      <li>
                        <a
                          className="pagination-link"
                          aria-label="Goto page 47"
                        >
                          47
                        </a>
                      </li>
                      <li>
                        <span className="pagination-ellipsis">…</span>
                      </li>
                      <li>
                        <a
                          className="pagination-link"
                          aria-label="Goto page 86"
                        >
                          86
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devis;
