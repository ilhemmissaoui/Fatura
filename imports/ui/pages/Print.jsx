import React from "react";

const Print = () => {
  return (
    <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
      <div className="p-1">
        <div className="columns is-variable is-desktop">
          <div className="column">
            <div className="container invoice">
              <div className="invoice-header">
                <div className="row">
                  <div className="col-xs-8">
                    <h1>
                      Invoice <small>With Credit</small>
                    </h1>
                    <h4 className="text-muted">
                      NO: 554775/R1 | Date: 01/01/2015
                    </h4>
                  </div>
                  <div className="col-xs-4">
                    <div className="media">
                      <div className="media-left">
                        <img
                          className="media-object logo"
                          src="https://dummyimage.com/70x70/000/fff&text=ACME"
                        />
                      </div>
                      <ul className="media-body list-unstyled">
                        <li>
                          <strong>Acme Corporation</strong>
                        </li>
                        <li>Software Development</li>
                        <li>Field 3, Moon</li>
                        <li>info@acme.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-body">
                <div className="row">
                  <div className="col-xs-5">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">Company Details</h3>
                      </div>
                      <div className="panel-body">
                        <dl className="dl-horizontal">
                          <dt>Name</dt>
                          <dd>
                            <strong>Acme Corporation</strong>
                          </dd>
                          <dt>Industry</dt>
                          <dd>Software Development</dd>
                          <dt>Address</dt>
                          <dd>Field 3, Moon</dd>
                          <dt>Phone</dt>
                          <dd>123.4456.4567</dd>
                          <dt>Email</dt>
                          <dd>mainl@acme.com</dd>
                          <dt>Tax NO</dt>
                          <dd className="mono">123456789</dd>
                          <dt>Tax Office</dt>
                          <dd>A' Moon</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-7">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">Customer Details</h3>
                      </div>
                      <div className="panel-body">
                        <dl className="dl-horizontal">
                          <dt>Name</dt>
                          <dd>Microsoft Corporation</dd>
                          <dt>Industry</dt>
                          <dd>Software Development</dd>
                          <dt>Address</dt>
                          <dd>One Microsoft Way Redmond, WA 98052-7329, USA</dd>
                          <dt>Phone</dt>
                          <dd>(425) 882-8080</dd>
                          <dt>Email</dt>
                          <dd>contact@microsoft.com</dd>
                          <dt>Tax NO</dt>
                          <dd className="mono">123456789</dd>
                          <dt>&nbsp;</dt>
                          <dd>&nbsp;</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Services / Products</h3>
                  </div>
                  <table className="table table-bordered table-condensed">
                    <thead>
                      <tr>
                        <th>Item / Details</th>
                        <th className="text-center colfix">Unit Cost</th>
                        <th className="text-center colfix">Sum Cost</th>
                        <th className="text-center colfix">Discount</th>
                        <th className="text-center colfix">Tax</th>
                        <th className="text-center colfix">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Lorem Ipsum Dolor
                          <br />
                          <small className="text-muted">
                            The best lorem in town, try it now or leave forever
                          </small>
                        </td>
                        <td className="text-right">
                          <span className="mono">$1,000.00</span>
                          <br />
                          <small className="text-muted">Before Tax</small>
                        </td>
                        <td className="text-right">
                          <span className="mono">$18,000.00</span>
                          <br />
                          <small className="text-muted">18 Units</small>
                        </td>
                        <td className="text-right">
                          <span className="mono">- $1,800.00</span>
                          <br />
                          <small className="text-muted">Special -10%</small>
                        </td>
                        <td className="text-right">
                          <span className="mono">+ $3,240.00</span>
                          <br />
                          <small className="text-muted">VAT 20%</small>
                        </td>
                        <td className="text-right">
                          <strong className="mono">$19,440.00</strong>
                          <br />
                          <small className="text-muted mono">$16,200.00</small>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Sit Amet Dolo
                          <br />
                          <small className="text-muted">Now you may sit</small>
                        </td>
                        <td className="text-right">
                          <span className="mono">$120.00</span>
                          <br />
                          <small className="text-muted">Before Tax</small>
                        </td>
                        <td className="text-right">
                          <span className="mono">$240.00</span>
                          <br />
                          <small className="text-muted">2 Units</small>
                        </td>
                        <td className="text-right">
                          <span className="mono">- $0.00</span>
                          <br />
                          <small className="text-muted">-</small>
                        </td>
                        <td className="text-right">
                          <span className="mono">+ $72.00</span>
                          <br />
                          <small className="text-muted">VAT:20% S:10%</small>
                        </td>
                        <td className="text-right">
                          <strong className="mono">$312.00</strong>
                          <br />
                          <small className="text-muted mono">$240.00</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="panel panel-default">
                  <table className="table table-bordered table-condensed">
                    <thead>
                      <tr>
                        <td className="text-center col-xs-1">Sub Total</td>
                        <td className="text-center col-xs-1">Discount</td>
                        <td className="text-center col-xs-1">Total</td>
                        <td className="text-center col-xs-1">Tax</td>
                        <td className="text-center col-xs-1">Final</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="text-center rowtotal mono">
                          $18,240.00
                        </th>
                        <th className="text-center rowtotal mono">
                          -$1,800.00
                        </th>
                        <th className="text-center rowtotal mono">
                          $16,440.00
                        </th>
                        <th className="text-center rowtotal mono">$3,312.00</th>
                        <th className="text-center rowtotal mono">
                          $19,752.00
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <i>Comments / Notes</i>
                        <hr style={{ margin: "3px 0 5px" }} /> Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Odit repudiandae
                        numquam sit facere blanditiis, quasi distinctio ipsam?
                        Libero odit ex expedita, facere sunt, possimus
                        consectetur dolore, nobis iure amet vero.
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-5">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">Payment Method</h3>
                      </div>
                      <div className="panel-body">
                        <p>
                          For your convenience, you may deposite the final
                          ammount at one of our banks
                        </p>
                        <ul className="list-unstyled">
                          <li>
                            Alpha Bank -{" "}
                            <span className="mono">MO123456789456123</span>
                          </li>
                          <li>
                            Beta Bank -{" "}
                            <span className="mono">MO123456789456123</span>
                          </li>
                          <li>
                            Gamma Bank -{" "}
                            <span className="mono">MO123456789456123</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-footer">
                Thank you for choosing our services.
                <br /> We hope to see you again soon
                <br />
                <strong>~ACME~</strong>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Print;
