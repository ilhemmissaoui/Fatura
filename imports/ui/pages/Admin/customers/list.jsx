import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import Customer from "./Customer";
import Search from "../../../components/Search";
import Pager from "../../../components/Pagination";
import TableCol from "../../../utils/TableCols";

const CompaniesList = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const { field, sortDirection } = sorting;
  const itemsPerPage = 6;
  const headers = [
    { name: "Type", field: "customertype", sortable: true },
    { name: "Reference", field: "customerreference", sortable: true },
    { name: "Name", field: "profile.firstName", sortable: true },
    { name: "Last Name", field: "profile.lastName", sortable: true },
    { name: "Email", field: "email.0.address", sortable: true },
    { name: "Creation Date", field: "createdAt", sortable: true },
    { name: "Action", field: "customeraction" },
  ];

  const [list, setList] = useState([]);

  const fetch = () => {
    Meteor.call(
      "getCompanies",
      { page, itemsPerPage, search, sortBy: field, sortOrder: sortDirection },
      (err, { items, totalCount }) => {
        console.log(items);
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

                </div>
              </div>
              <div className="container">
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
                    </tr>
                    {list?.length === 0 ? (
                      <TableCol col={7} />
                    ) : (
                      list?.map((customer) => (
                        <Customer
                          key={customer._id}
                          customer={customer}
                          fetch={fetch}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pager
            total={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
