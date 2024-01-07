import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import Customer from "./Customer";
import Search from "../../../components/Search";
import Pager from "../../../components/Pagination";
import TableCol from "../../../utils/TableCols";
import { CustomerExcelParser } from "../../../../api/utils/ExcelHelper";
import Excel from "exceljs";
import { toastr } from "react-redux-toastr";

const CustomersList = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const { field, sortDirection } = sorting;
  const itemsPerPage = 4;
  const headers = [
    { name: "Type", field: "customertype", sortable: false },
    { name: "Reference", field: "customerreference", sortable: false },
    { name: "Name", field: "customername", sortable: false },
    { name: "Phone", field: "customerphone", sortable: false },
    { name: "Email", field: "customerturnover", sortable: false },
    { name: "Creation Date", field: "customercreationdate", sortable: false },
    { name: "Action", field: "customeraction", sortable: false },
  ];

  const [list, setList] = useState([]);

  const fetch = () => {
    Meteor.call(
      "getCustomers",
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

  const fileRef = React.useRef(null);

  const handleExcelClick = () => {
    fileRef.current.click();
  };

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file === undefined) return;
    let wb = new Excel.Workbook();
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx.load(buffer).then((workbook) => {
        workbook.eachSheet((sheet, __) => {
          sheet.eachRow((_, rowIndex) => {
            if (rowIndex != 1) {
              let excelInfo;
              try {
                excelInfo = CustomerExcelParser(sheet, rowIndex);
              } catch (err) {
                alert(
                  `Erreur à la ligne: ${rowIndex}, Colonne: ${err.message}`
                );
              }
              const { customerInfo } = excelInfo;
              Meteor.call(
                "addCustomerFromExcel",
                { data: customerInfo },
                (e, ___) => {
                  if (!e) {
                    fetch();
                    toastr.success(
                      "",
                      "Customers has been Imported successfully"
                    );
                  } else {
                    toastr.warning("", `${e.reason} à la ligne: ${rowIndex}`);
                    console.log("ERROR");
                    console.log(e);
                  }
                }
              );
            }
          });
        });
      });
    };
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
                      to={`/${Roles.getRolesForUser(
                        Meteor.userId()
                      )[0]?.toLowerCase()}/customers/add`}
                      className="button is-primary is-rounded"
                    >
                      Add
                    </Link>
                    <button
                      onClick={handleExcelClick}
                      className="button is-success is-rounded"
                    >
                      <i className="fas fa-file-excel mr-3"></i> Import From
                      Excel
                    </button>
                    <input
                      className="file-upload-input"
                      type="file"
                      ref={fileRef}
                      onChange={handleFile}
                      style={{ display: "none" }}
                      accept=".xlsx"
                    />
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
                          onClick={_ =>
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

export default CustomersList;
