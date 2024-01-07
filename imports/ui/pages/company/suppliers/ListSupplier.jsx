import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import Supplier from "./Supplier";
import Search from "../../../components/Search";
import Pager from "../../../components/Pagination";
import TableCol from "../../../utils/TableCols";
import { Notyf } from "notyf";
import { SupplierExcelParser } from "../../../../api/utils/ExcelHelper";
import Excel from "exceljs";
import { toastr } from "react-redux-toastr";

const ListSupplier = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const { field, sortDirection } = sorting;
  const itemsPerPage = 8;
  const headers = [
    { name: "Type", field: "suppliertype", sortable: true },
    { name: "Reference", field: "supplierreference", sortable: true },
    { name: "Name", field: "suppliername", sortable: true },
    { name: "Phone", field: "supplierphone", sortable: true },
    { name: "Email", field: "supplierturnover", sortable: true },
    { name: "Creation Date", field: "suppliercreationdate", sortable: true },
    { name: "Action", field: "supplieraction", sortable: true },
  ];

  const [list, setList] = useState([]);

  const fetch = () => {
    Meteor.call(
      "getSuppliers",
      { page, itemsPerPage, search, sortBy: field, sortOrder: sortDirection },
      (err, { items, totalCount }) => {
        setList(items);
        setTotalItems(totalCount);
        // console.log(getSuppliers);
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
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });

  useEffect(() => {
    Meteor.call("getSuppliers", (e, r) => {
      if (!e) setList(r);
      else console.log(e);
    });
  }, []);

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
                excelInfo = SupplierExcelParser(sheet, rowIndex);
              } catch (err) {
                alert(
                  `Erreur à la ligne: ${rowIndex}, Colonne: ${err.message}`
                );
              }
              const { supplierInfo } = excelInfo;
              Meteor.call(
                "addSpplierFromExcel",
                { data: supplierInfo },
                (e, ___) => {
                  if (!e) {
                    fetch();
                    toastr.success(
                      "",
                      "Suppliers has been Imported successfully"
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
                      to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/suppliers/add_supplier`}
                      className="button is-primary is-rounded"
                    >Add
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
                    </tr>
                    {list?.length === 0 ? (
                      <TableCol col={7} />
                    ) : (
                      list?.map((supplier) => (
                        <Supplier
                          key={supplier._id}
                          supplier={supplier}
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

export default ListSupplier;
