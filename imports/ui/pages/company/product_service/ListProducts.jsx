import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_green.css";
import Pager from "../../../components/Pagination";
import Excel from "exceljs";
import TableCol from "../../../utils/TableCols";
import Search from "../../../components/Search";
import Product from "../product_service/Product";
import { ExcelParser } from '../../../../api/utils/ExcelHelper'
import { toastr } from "react-redux-toastr";
import { Image } from "react-feather";

const ListProducts = () => {
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
    { name: "Image", field: "imageUrl" },
    { name: "Type", field: "producttype", sortable: true },
    { name: "Name", field: "picture", sortable: true },
    { name: "Result", field: "result", sortable: true },
    { name: "Selling Price", field: "Selling Price", sortable: true },
    { name: "manufactrurer Reference", field: "Internal Reference", sortable: true },
    { name: "Categories", field: "Categories", sortable: true },
    { name: "BRAND", field: "BRAND", sortable: true },
    { name: "VAT", field: "VAT", sortable: true },
    { name: "Action", field: "Action", sortable: true },
  ];

  const [list, setList] = useState([]);

  const fetch = () => {
    Meteor.call(
      "getProducts",
      { page, itemsPerPage, search, sortBy: field, sortOrder: sortDirection },
      (err, { items, totalCount }) => {
        if (!err) {
          setList(items);
          setTotalItems(totalCount);
        } else {
          console.log("ERRRRRRRROR");
          console.log(err);
        }
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
  }

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file === undefined) return;
    let wb = new Excel.Workbook();
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx.load(buffer).then(workbook => {
        workbook.eachSheet((sheet, __) => {
          sheet.eachRow((_, rowIndex) => {
            if (rowIndex != 1) {
              let excelInfo;
              try {
                excelInfo = ExcelParser(sheet, rowIndex);
              } catch (err) {
                alert(`Erreur à la ligne: ${rowIndex}, Colonne: ${err.message}`);
              }
              const { productInfo } = excelInfo;
              Meteor.call('addProdutsFromExcel', { data: productInfo }, (e, ___) => {
                if (!e) {
                  fetch();
                  toastr.success('', 'Products has been Imported successfully');
                } else {
                  toastr.warning("", `${e.reason} à la ligne: ${rowIndex}`);
                  console.log("ERROR")
                  console.log(e)
                }
              })
            }
          })
        })
      })
    }
  }

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
                      to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/product_service/add`}
                      className="button is-primary is-rounded"
                    >
                      Add
                    </Link>
                  </div>
                  <div className="mr-4 mb-5">
                    <button
                      onClick={handleExcelClick}
                      className="button is-success is-rounded"
                    >
                      <i className="fas fa-file-excel mr-3"></i> Import From Excel
                    </button>
                  </div>
                  <input className="file-upload-input"
                    type="file"
                    ref={fileRef}
                    onChange={handleFile}
                    style={{ display: "none" }}
                    accept=".xlsx" />
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
                          {name === "Image" ? <Image /> : name}
                        </th>
                      ))}
                    </tr>
                    {list?.length === 0 ? (
                      <TableCol col={10} />
                    ) : (
                      list?.map((product) => (
                        <Product
                          key={product._id}
                          product={product}
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
export default ListProducts;
