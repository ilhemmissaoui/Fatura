import React from "react";

const StocksItem = ({ purchaseStock, fetch }) => {

    // const onChange = (e) => {
    //     e.preventDefault();
    //     const status = e.target.value;
    //     Meteor.call("updateDeliverypurchaseStockStatus", purchaseStock._id, status, (e, __) => {
    //         if (!e) {
    //             toastr.info("", "Status Changed successfully");
    //             fetch();
    //         } else console.log(e);
    //     });
    // };

    return (
        <>
            <tr>
                <td>{purchaseStock._id}</td>
                <td>{purchaseStock.quantity}</td>
                <td>{purchaseStock.total} TND</td>
            </tr>
        </>
    );
};

export default StocksItem;
