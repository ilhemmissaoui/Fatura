import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_green.css";
import Pager from "../../../components/Pagination";
import Flatpickr from "react-flatpickr";
import TableCol from "../../../utils/TableCols";
import Search from "../../../components/Search";
import PurchaseItem from "./StockItem";

const PurchaseStock = () => {
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({
        field: "_id",
        sortDirection: "asc",
    });
    const { field, sortDirection } = sorting;
    const itemsPerPage = 8;
    const informations = [
        { name: "Name", field: "_id" },
        { name: "Quantity", field: "quantity" },
        { name: "Total", field: "total" },
    ];

    const [list, setList] = useState([]);
    const fetch = () => {
        Meteor.call('getPurchaseStocks', (e, r) => {
            setList(r);
        })
    };
    useEffect(() => {
        fetch();
    }, [search, page, sorting]);
    const handleSort = (field, sortDirection) => {
        setSorting({
            field,
            sortDirection,
        });
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
                                    </div>
                                </div></div>
                        </div>
                        <div className="table-container">
                            <table className="table is-bordered is-striped is-fullwidth">
                                <tbody>
                                    <tr>
                                        {informations.map(({ name, field }) => (
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
                                        list?.map((purchase) => (
                                            <PurchaseItem
                                                key={purchase._id}
                                                purchaseStock={purchase}
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
export default PurchaseStock;
