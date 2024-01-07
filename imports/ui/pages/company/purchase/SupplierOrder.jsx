import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_green.css";
import Pager from "../../../components/Pagination";
import Search from "../../../components/Search";
import TableCol from "../../../utils/TableCols";
import SupplyOrderItem from "./SupplyOrderitem";

const SupplierOrder = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const { field, sortDirection } = sorting;
  const itemsPerPage = 8;
  const [value, onChange] = useState(new Date());
  const headers = [
    { name: "January", field: "January", sortable: true },
    { name: "February", field: "February", sortable: true },
    { name: "March", field: "March", sortable: true },
    { name: "April", field: "April", sortable: true },
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
    { name: "Reference", field: "_id", sortable: true },
    { name: "Date", field: "date", sortable: true },
    { name: "supplier", field: "supplier", sortable: true },
    { name: "Amount INCL.taxes", field: "totaleTaxeIncl", sortable: true },
    { name: "Status", field: "status", sortable: true },
    { name: "Action", field: "Action", sortable: false },


  ];

  const [list, setList] = useState([]);
  const fetch = () => {
    Meteor.call(
      "getSupplyOrder",
      { page, itemsPerPage, search, sortBy: field, sortOrder: sortDirection },
      (err, { items, totalCount }) => {
        setList(items);
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
      <div className="container">
        <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
          <div className="p-1">
            <div className="columns is-variable is-desktop">
              <div className="column">
                {/* Left side */}
                <div className="level-right">
                  <div className="level-item">
                    <Search
                      onSearch={(value) => {
                        setSearch(value);
                        setPage(1);
                      }}
                    />
                    <div className="mr-4 mb-5">
                      <Link
                        to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/supplier_order/add_purchases`}
                        className="button is-primary is-rounded">
                        Add
                      </Link>
                    </div>
                  </div>
                </div></div>
            </div>
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth">
                <tbody>
                  <tr className="th is-selected">
                    {headers.map(({ name, field }) => (
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
                  </tr> </tbody>
              </table>
            </div> <div className="table-container">
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
                    ))} </tr>

                  {list?.length === 0 ? (
                    <TableCol col={7} />
                  ) : (
                    list?.map((supplier) => (
                      <SupplyOrderItem
                        key={supplier._id}
                        supplyOrder={supplier}
                        fetch={fetch}
                      />
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
          </div></div></div>   </div>

  );
};
export default SupplierOrder;
