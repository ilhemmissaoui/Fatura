import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import Users from "./Users";
import Search from "../../../components/Search";
import Pager from "../../../components/Pagination";
import TableCol from "../../../utils/TableCols";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const { field, sortDirection } = sorting;
  const itemsPerPage = 5;
  const headers = [
    { name: "Type", field: "customertype", sortable: true },
    { name: "Reference", field: "customerreference", sortable: true },
    { name: "Name", field: "customername", sortable: true },
    { name: "Phone", field: "customerphone", sortable: true },
    { name: "Role", field: "customerturnover", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Creation Date", field: "customercreationdate", sortable: true },
    { name: "Action", field: "customeraction", sortable: true },
  ];

  const [list, setList] = useState([]);

  const fetch = () => {
    Meteor.call(
      "getCompanyUsers",
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
                      to="/company/users/add"
                      className="button is-primary is-rounded"
                    >Add</Link>
                  </div>
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
                        <Users
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

export default UsersList;
