import React, { useState, useEffect, useRef } from "react";
import { Meteor } from "meteor/meteor";
import Flatpickr from "react-flatpickr";
import { Plus } from "react-feather";
import { toastr } from "react-redux-toastr";
import { useParams } from "react-router";


const UpdateDeliveryNote = (props) => {
    const componentRef = useRef();
    const { id } = useParams();

    const [sorting, setSorting] = useState({
        field: "_id",
        sortDirection: "asc",
    });
    const [pickedDate, onChange] = useState(new Date());
    const informations = [
        { name: "Image", field: "Image" },
        { name: "Designation", field: "Designation" },
        { name: "Quantity", field: "Quantity" },
        { name: "Ht Price", field: "Ht Price" },
        { name: "VAT", field: "VAT" },
        { name: "Total Ht", field: "Total Ht" },
    ];

    const [estimateInfo, setEstimateInfo] = useState({})
    const [list, setList] = useState([]);
    const [totalInfo, setTotalInfo] = useState({
        totalTHA: 0,
        totalTVA: 0,
        totaleVTA: 0,
        totalIncTaxes: 0,
    });
    const [productNameList, setProductNameList] = useState([]);
    const [pickedCustomer, setPickedCustomer] = useState(null);
    const [productListForm, setProductListForm] = useState([]);
    const [form, setForm] = useState({
        project: "",
        note: "",
    });

    const fetch = () => {
        Meteor.call("getMiniSuppliers", (e, r) => {
            setList(r);
        });
    };
    const fetchProducts = () => {
        Meteor.call("getProductsName", (e, r) => {
            setProductNameList(r);
        });
    };
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const getEstimateInfo = () => {
        Meteor.call('getSingleDelivery', id, (e, r) => {
            if (!e) {
                console.log(r);
                setEstimateInfo(r);
                setTotalInfo({
                    totalTHA: r.totalSum,
                    totalTVA: r.totalTVA,
                    totaleVTA: r.totaleVTA,
                    totaleTaxeIncl: r.totaleTaxeIncl,
                });
                let products = [];
                r.productList && r.productList.map(e => products.push(
                    {
                        imageUrl: "",
                        name: e.name,
                        quantity: e.quantity,
                        price: e.price,
                        vat: e.vat,
                        total: e.total,
                    },
                ))
                setProductListForm(products);
            }
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            ...totalInfo,
            customer: pickedCustomer[0]?.fullName ?? estimateInfo?.supplier,
            phoneNumber: pickedCustomer[0]?.phoneNumber,
            email: pickedCustomer[0]?.email,
            date: pickedDate[0],
            productList: [...productListForm],
            ...form,
        };
        console.log(data);
        Meteor.call("updateDelivery", id, data, estimateInfo, (e, _) => {
            if (!e) {
                toastr.success("", "Purchase Has Been added");
                props.history.goBack();
            }
        });
    };

    useEffect(() => {
        fetch();
        fetchProducts();
        getEstimateInfo();
    }, []);


    handleChange = (e, index) => {
        const values = [...productListForm];
        values[index][e.target.name] = e.target.value;
        if (e.target.name === 'name') {
            const product = productNameList.filter(product => product.name === e.target.value)[0];
            values[index]['imageUrl'] = product?.imageUrl;
            values[index]['price'] = parseFloat(product?.publicPrice ?? 0);
        }
        values[index]["total"] =
            parseFloat(values[index]["price"]) * parseInt(values[index]["quantity"]);
        setProductListForm(values);

        var totalSum = 0;
        var totalTVA = 0;
        var totaleVTA = 0;
        var totaleTaxeIncl = 0;
        values.forEach((val) => {
            totalSum += val.total;
            totalTVA += parseFloat(val.vat);
        });
        totaleVTA = (parseFloat(totalTVA) / 100) * parseFloat(totalSum);
        totaleTaxeIncl = 0.2 + totaleVTA + totalSum;
        setTotalInfo({
            totalTHA: totalSum,
            totalTVA: totalTVA,
            totaleVTA: totaleVTA,
            totaleTaxeIncl: totaleTaxeIncl,
        });
    };

    addNewProduct = (e) => {
        e.preventDefault();
        if (!pickedCustomer) {
            toastr.error("", "No customer is selected");
            return;
        }
        setProductListForm([
            ...productListForm,
            {
                imageUrl: "",
                name: "",
                quantity: 0,
                price: 0,
                vat: 0,
                total: 0,
            },
        ]);
    };
    return (
        <>
            <div ref={componentRef}>
                <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
                    <div className="p-1">
                        <div className="columns is-variable is-desktop">
                            <div className="column">
                                <div className="hero-body">
                                    <div className="container">
                                        <div className="bd-hero-body">
                                            <div className="bd-hero-heading">
                                                <h1 className="title algolia-lvl0">
                                                    <p>Add Estimate</p>
                                                </h1>
                                                <section class="section">
                                                    <h1 class="subtitle">Informations</h1>
                                                    <div className="card pb-5">
                                                        <div className="card-content">
                                                            <form>
                                                                <div className="field-body">
                                                                    <div className="field is-horizontal">
                                                                        <div className="field-label is-normal">
                                                                            <label className="label">Supplier</label>
                                                                        </div>
                                                                        <div className="field-body">
                                                                            <div className="field is-narrow">
                                                                                <div className="control">
                                                                                    <div>
                                                                                        <div class="select">
                                                                                            <select
                                                                                                name="selected"
                                                                                                onChange={(e) => {
                                                                                                    if (e.target.value === "")
                                                                                                        setPickedCustomer(null);
                                                                                                    else
                                                                                                        setPickedCustomer(
                                                                                                            list.filter(
                                                                                                                (customer) =>
                                                                                                                    customer.fullName ===
                                                                                                                    e.target.value
                                                                                                            )
                                                                                                        );
                                                                                                    console.log(pickedCustomer);
                                                                                                }}
                                                                                            >
                                                                                                <option value="">
                                                                                                    --- Select ---
                                                                                                </option>
                                                                                                {list.map((e) => (
                                                                                                    <option
                                                                                                        key={e._id}
                                                                                                        value={e.fullName}
                                                                                                        selected={e.fullName === estimateInfo.supplier}
                                                                                                    >
                                                                                                        {e.fullName}
                                                                                                    </option>
                                                                                                ))}
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <hr className="solid" />
                                                                                {pickedCustomer &&
                                                                                    pickedCustomer?.length > 0 && (
                                                                                        <table class="table is-narrow">
                                                                                            <tr>
                                                                                                <td>Name</td>
                                                                                                <td>
                                                                                                    {pickedCustomer[0]?.fullName}
                                                                                                </td>
                                                                                            </tr>

                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td>Phone</td>
                                                                                                    <td>
                                                                                                        {" "}
                                                                                                        {
                                                                                                            pickedCustomer[0]
                                                                                                                ?.phoneNumber
                                                                                                        }
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>Email</td>
                                                                                                    <td>
                                                                                                        {" "}
                                                                                                        {pickedCustomer[0]?.email}
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    )}
                                                                                <div className="column">
                                                                                    <div className="level-right">
                                                                                        <div className="level-item">
                                                                                            <Flatpickr
                                                                                                className="mx-5"
                                                                                                placeholder="Date "
                                                                                                data-enable-time
                                                                                                onChange={onChange}
                                                                                            />
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
                                                                                        <div className="field is-narrow">
                                                                                            <div className="control">
                                                                                                <div>
                                                                                                    <input
                                                                                                        className="input is-small"
                                                                                                        type="text"
                                                                                                        defaultValue={estimateInfo?.project}
                                                                                                        name="project"
                                                                                                        placeholder="Small input"
                                                                                                        onChange={handleFormChange}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
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
                                                                                            <div className="field">
                                                                                                <div className="control">
                                                                                                    <textarea
                                                                                                        className="textarea is-small"
                                                                                                        placeholder="Small textarea"
                                                                                                        name="note"
                                                                                                        defaultValue={estimateInfo?.note}
                                                                                                        onChange={handleFormChange}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="field">
                                                                        <p className="control is-expanded has-icons-left has-icons-right">
                                                                            <div className="field-label is-normal">
                                                                                <label className="label">
                                                                                    Document Details
                                                                                </label>
                                                                            </div>
                                                                        </p>
                                                                        <hr className="solid" />
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
                                                                            {informations.map(({ name, field }) => (
                                                                                <th key={name}>
                                                                                    {sorting.field === field ? (
                                                                                        sorting.sortDirection ===
                                                                                            "asc" ? (
                                                                                            <i className="fas fa-arrow-up"></i>
                                                                                        ) : (
                                                                                            <i className="fas fa-arrow-down"></i>
                                                                                        )
                                                                                    ) : null}{" "}
                                                                                    {name}
                                                                                </th>
                                                                            ))}{" "}
                                                                            {/*  */}
                                                                            {productListForm.map((_, i) => (
                                                                                <tr>
                                                                                    <td>
                                                                                        <figure className="image is-48x48">
                                                                                            <img src={productListForm[i]?.imageUrl ?? "https://bulma.io/images/placeholders/48x48.png"} />
                                                                                        </figure>
                                                                                    </td>
                                                                                    <td className="mx-5">
                                                                                        <p className="control is-expanded has-icons-left">
                                                                                            <div className="control">
                                                                                                <div>
                                                                                                    <div class="select">
                                                                                                        <select
                                                                                                            name="name"
                                                                                                            onChange={(e) => {
                                                                                                                handleChange(e, i);
                                                                                                                console.log(productListForm);
                                                                                                            }
                                                                                                            }
                                                                                                        >
                                                                                                            <option value="">
                                                                                                                --- Select ---
                                                                                                            </option>
                                                                                                            {productNameList.map((e) => (
                                                                                                                <option
                                                                                                                    key={e._id}
                                                                                                                    value={e?.name}
                                                                                                                    selected={e?.name === productNameList[i]?.name}
                                                                                                                >
                                                                                                                    {e.name}
                                                                                                                </option>
                                                                                                            ))}
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>{" "}
                                                                                        </p>
                                                                                    </td>

                                                                                    <td className="mx-5">
                                                                                        <div className="field">
                                                                                            <input
                                                                                                className="input is-small"
                                                                                                type="number"
                                                                                                name="quantity"
                                                                                                value={productListForm[i].quantity}
                                                                                                onChange={(event) =>
                                                                                                    handleChange(event, i)
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="mx-5">
                                                                                        <div className="field">
                                                                                            <input
                                                                                                className="input is-small"
                                                                                                type="text"
                                                                                                name="price"
                                                                                                value={productListForm[i].price}
                                                                                                readOnly={true}
                                                                                                onChange={(event) =>
                                                                                                    handleChange(event, i)
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="mx-5">
                                                                                        <div className="field">
                                                                                            <input
                                                                                                className="input is-small"
                                                                                                type="text"
                                                                                                placeholder="0%"
                                                                                                name="vat"
                                                                                                value={productListForm[i].vat}
                                                                                                onChange={(event) =>
                                                                                                    handleChange(event, i)
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="mx-5">
                                                                                        <div className="field">
                                                                                            <input
                                                                                                className="input is-small"
                                                                                                type="text"
                                                                                                name="total"
                                                                                                defaultValue="0.000TND"
                                                                                                readOnly="true"
                                                                                                value={productListForm[i].total}
                                                                                                onChange={(event) =>
                                                                                                    handleChange(event, i)
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>


                                                                <button className="button">
                                                                    <span className="icon is-small">
                                                                        <i />
                                                                    </span>
                                                                    <span>Barcode</span>
                                                                </button>
                                                                <button
                                                                    className="button"
                                                                    onClick={addNewProduct}
                                                                >
                                                                    <span className="icon is-small">
                                                                        <Plus />
                                                                    </span>
                                                                    <span>Add Product</span>
                                                                </button>
                                                                <button className="button">
                                                                    <span className="icon is-small">
                                                                        <i />
                                                                    </span>
                                                                    <span>Add Sub-Total</span>
                                                                </button>
                                                                <hr className="solid" />
                                                                <div className="level-right">



                                                                </div>
                                                                <div class="column is-half">
                                                                    <label className="label">NET TO PAY</label>

                                                                    <table class="table is-narrow">
                                                                        <tr>
                                                                            <td>Total T.Excl</td>
                                                                            <td>{totalInfo.totalTHA} TND</td>
                                                                        </tr>

                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Total VAT</td>
                                                                                <td>{totalInfo.totaleVTA?.toFixed(2)} TND</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Fodec</td>
                                                                                <td>0.200 TND</td>
                                                                            </tr>
                                                                            <td>Total incl.Taxes</td>
                                                                            <td>{totalInfo.totaleTaxeIncl}</td>

                                                                            <tr>
                                                                                <td>Timbre fiscal</td>
                                                                                <td>0.600 TND</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="columns is-desktop is-centered">
                                                                    <div className="control">
                                                                        <button
                                                                            onClick={submitForm}
                                                                            className="button is-primary"
                                                                        >
                                                                            Submit
                                                                        </button>

                                                                        <div>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </section>
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

export default UpdateDeliveryNote;
