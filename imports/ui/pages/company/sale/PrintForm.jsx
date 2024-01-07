import moment from "moment";
import React, { useEffect, useState } from "react";
import { Printer } from "react-feather";
import { useParams } from "react-router";
import ReactToPrint from 'react-to-print';



const PrintForm = (props) => {

    const { id } = useParams();
    const componentRef = React.useRef();


    const [salesInfo, setSalesInfo] = useState({});

    const informations = [
        { name: "Designation", field: "Designation" },
        { name: "Quantity", field: "Quantity" },
        { name: "Ht Price", field: "Ht Price" },
        { name: "VAT", field: "VAT" },
        { name: "Total Ht", field: "Total Ht" },
    ];


    getEstimateInfo = () => {
        Meteor.call("getEstimateInfo", id, (e, r) => {
            if (!e) {
                setSalesInfo(r);
                console.log(r);
            }
        })
    }


    useEffect(() => {
        getEstimateInfo();
    }, [])

    return (
        <>
            <div >
                <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
                    <div className="p-1">
                        <div className="columns is-variable is-desktop">
                            <div className="column">
                                <div className="hero-body">
                                    <div className="container">
                                        <div className="bd-hero-body">
                                            <div className="bd-hero-heading">
                                                <section class="section">
                                                    <h1 class="subtitle">Informations</h1>
                                                    <div className="card pb-5">
                                                        <div className="card-content" ref={componentRef}>
                                                            <form>
                                                                <div className="field-body">
                                                                    <div className="field is-horizontal">
                                                                        <div className="field-label is-normal">
                                                                            <label className="label">Customer</label>
                                                                        </div>
                                                                        <div className="field-body">
                                                                            <div className="field is-narrow">
                                                                                <div className="control mt-2">
                                                                                    <p>{salesInfo.customer}</p>
                                                                                </div>
                                                                                <hr className="solid" />
                                                                                <table class="table is-narrow">
                                                                                    <tr>
                                                                                        <td>Name</td>
                                                                                        <td>
                                                                                            {salesInfo.customer}
                                                                                        </td>
                                                                                    </tr>

                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>Phone</td>
                                                                                            <td>
                                                                                                {salesInfo.phoneNumber}
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>Email</td>
                                                                                            <td>
                                                                                                {salesInfo.email}
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <div className="column">
                                                                                    <div className="level-left">
                                                                                        <div className="level-item">
                                                                                            <label>
                                                                                                <strong className="mr-2">Date: </strong>
                                                                                            </label>
                                                                                            <p>{moment(salesInfo.creationDate).format("MMM DD YYYY")}</p>
                                                                                            <div>
                                                                                                <br />
                                                                                                <br />{" "}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="level-item">
                                                                                    <div className="field-label is-normal">
                                                                                        <label className="label">
                                                                                            Project
                                                                                         </label>
                                                                                    </div>{" "}
                                                                                    <div className="field-body">
                                                                                        <p>{salesInfo.project}</p>
                                                                                    </div>{" "}
                                                                                </div>{" "}
                                                                                <div className="column">
                                                                                    <div className="level-left">
                                                                                        <div className="level-item">
                                                                                            <div className="field-label is-normal">
                                                                                                <label className="label">
                                                                                                    Note
                                                                                                </label>
                                                                                            </div>
                                                                                            <div className="field-body">
                                                                                                <p>{salesInfo.note}</p>
                                                                                            </div>{" "}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div>
                                                                    <br />
                                                                    <br />
                                                                </div>
                                                                <hr className="solid" />
                                                                <div className="table-container">
                                                                    <table className="table is-bordered is-striped is-fullwidth">
                                                                        <tbody>
                                                                            {informations.map(({ name, }) => (
                                                                                <th key={name}>
                                                                                    {name}
                                                                                </th>
                                                                            ))}{" "}
                                                                            {salesInfo?.productList?.map(e =>
                                                                                <tr>
                                                                                    <td>{e.name}</td>
                                                                                    <td>{e.price} TND</td>
                                                                                    <td>{e.quantity}</td>
                                                                                    <td>{e.vat} %</td>
                                                                                    <td>{e.total} TND</td>
                                                                                </tr>)}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="column">

                                                                </div>

                                                                <hr className="solid" />
                                                                <div className="level-right">

                                                                </div>
                                                                <div class="column is-half">
                                                                    <label className="label">NET TO PAY</label>

                                                                    <table class="table is-narrow">
                                                                        <tr>
                                                                            <td>Total T.Excl</td>
                                                                            <td>{salesInfo.totalTHA} TND</td>
                                                                        </tr>

                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Total VAT</td>
                                                                                <td>{salesInfo.totalTVA?.toFixed(2)} TND</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Fodec</td>
                                                                                <td>0.200 TND</td>
                                                                            </tr>
                                                                            <td>Total incl.Taxes</td>
                                                                            <td>{salesInfo.totaleTaxeIncl} TND</td>


                                                                            <tr>
                                                                                <td>Timbre fiscal</td>
                                                                                <td>0.600 TND</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </section>
                                                <div className="container">
                                                    <ReactToPrint trigger={() => <button
                                                        className="button is-primary ml-5"
                                                    >
                                                        <Printer className="mr-2" /> Print
                                                         </button>}
                                                        content={() => componentRef.current}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintForm;
