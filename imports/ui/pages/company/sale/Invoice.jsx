import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_green.css";
import Pager from "../../../components/Pagination";
import Flatpickr from "react-flatpickr";
import TableCol from "../../../utils/TableCols";
import Search from "../../../components/Search";
import InvoiceItems from "./InvoiceItems";

const Invoice = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [invoiceInfo, setinvoiceInfo] = useState({
    total: 0,
    paid: 0,
    toPay: 0,
    overDue: 0,
  });
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const { field, sortDirection } = sorting;
  const itemsPerPage = 8;
  const headers = [
    { name: "January", field: "January", sortable: true },
    { name: "February", field: "February", sortable: true },
    { name: "March", field: "March", sortable: true },
    { name: "April", field: "customeApril", sortable: true },
    { name: "May", field: "May", sortable: true },
    { name: "June", field: "June", sortable: true },
    { name: "July", field: "July", sortable: true },
    { name: "August", field: "August", sortable: true },
    { name: "September", field: "September", sortable: true },
    { name: "October", field: "October", sortable: true },
    { name: "November", field: "November", sortable: true },
    { name: "December", field: "December", sortable: true },
  ];
  const informations = [
    { name: "Reference", field: "Reference", sortable: true },
    { name: "Date", field: "Date", sortable: true },
    { name: "Customer", field: "Customer", sortable: true },
    { name: "Amount INCL.taxes", field: "Amount INCL.taxes", sortable: true },
    { name: "Payed Amount", field: "payedAmount", sortable: true },
    { name: "Status", field: "Status", sortable: true },
    { name: "Action", field: "Action", sortable: true },
  ];

  const [list, setList] = useState([]);
  const fetch = () => {
    Meteor.call(
      "getSale",
      { page, itemsPerPage, search, sortBy: field, sortOrder: sortDirection },
      (err, { items, totalCount }) => {
        setList(items);
        console.log(items);
        let total = 0;
        let paid = 0;
        let toPay = 0;
        items.map((e) => {
          total += e.totaleTaxeIncl;
          paid += e?.payedAmount ?? 0;
        });
        paid = paid.toFixed(2);
        total = total?.toFixed(2);
        toPay = (total - paid).toFixed(2);
        setinvoiceInfo({ ...invoiceInfo, total, paid, toPay });
        setTotalItems(totalCount);
      }
    );
  };
  useEffect(() => {
    fetch();
  }, [search, page, sorting]);
  const handleSort = (field, sortDirection) => {
    // setSorting({
    //   field,
    //   sortDirection,
    // });
  };

  return (
    <div>
      {" "}
      <div className="container">
        <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
          <div className="p-1">
            <div className="columns is-variable is-desktop">
              <div className="column">
                <div className="columns  is-variable is-desktop">
                  <div className="column">
                    <div className="card has-background-primary has-text-white">
                      <div className="card-header">
                        <div className="card-header-title has-text-white">
                          Total
                        </div>
                      </div>
                      <div className="card-content">
                        <p className="is-size-3">{invoiceInfo.total} TND</p>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="card has-background-warning has-text-black">
                      <div className="card-header">
                        <div className="card-header-title has-text-black is-uppercase">
                          Paid
                        </div>
                      </div>
                      <div className="card-content">
                        <p className="is-size-3">{invoiceInfo.paid} TND</p>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="card has-background-info has-text-white">
                      <div className="card-header">
                        <div className="card-header-title has-text-white is-uppercase">
                          To Pay
                        </div>
                      </div>
                      <div className="card-content">
                        <p className="is-size-3">{invoiceInfo?.toPay} TND</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Left side */}
                <div className="level-right">
                  <div className="level-item">
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
                    <Search
                      onSearch={(value) => {
                        setSearch(value);
                        setPage(1);
                      }}
                    />

                    <div className="mr-4 mb-5">
                      <Link
                        to={`/${Roles.getRolesForUser(Meteor.userId())[0]?.toLowerCase()}/invoice/add_sale`}
                        className="button is-primary is-rounded"
                      >
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth">
                <tbody>
                  <tr className="th is-selected">
                    {headers.map(({ name, sortable, field }) => (
                      <th
                        key={name}
                        onClick={() =>
                          handleSort(
                            field,
                            sorting.field === field
                              ? sorting.sortDirection == "asc"
                                ? "desc"
                                : "asc"
                              : "asc"
                          )
                        }
                      >
                        {sorting.field === field ? (
                          sorting.sortDirection === "asc" ? (
                            <i className="fas fa-arrow-up"></i>
                          ) : (
                            <i className="fas fa-arrow-down"></i>
                          )
                        ) : null}{" "}
                        {name}
                      </th>
                    ))}
                  </tr>{" "}
                </tbody>
              </table>
            </div>{" "}
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth">
                <tbody>
                  <tr>
                    {informations.map(({ name, sortable, field }) => (
                      <th
                        key={name}
                        onClick={() =>
                          handleSort(
                            field,
                            sorting.field === field
                              ? sorting.sortDirection == "asc"
                                ? "desc"
                                : "asc"
                              : "asc"
                          )
                        }
                      >
                        {sorting.field === field ? (
                          sorting.sortDirection === "asc" ? (
                            <i className="fas fa-arrow-up"></i>
                          ) : (
                            <i className="fas fa-arrow-down"></i>
                          )
                        ) : null}{" "}
                        {name}
                      </th>
                    ))}{" "}
                  </tr>
                  {list?.length === 0 ? (
                    <TableCol col={5} />
                  ) : (
                    list?.map((sale) => (
                      <InvoiceItems key={sale._id} sales={sale} fetch={fetch} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pager
              total={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={page}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Invoice;
