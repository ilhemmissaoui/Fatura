import React, { useState, useEffect } from "react";
import { Trash2 } from "react-feather";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
import Images from "../../../../../collections/images";
const AddProduct = (props) => {
  const { register, handleSubmit, errors, watch } = useForm({});
  const onSubmit = (data) => {
    if (image) {
      uploadImage(data);
      return;
    }
    Meteor.call("addProduct", data, (e, _) => {
      if (e) {
        console.log("+++++ERROR+++++");
        console.log(e);
      } else {
        toastr.success("", "Product has Been Added");
        props.history.push(`/${Roles.getRolesForUser(Meteor.userId())[0]?.toLowerCase()}/product_service`);
      }
    });
  };

  const [image, setImage] = useState(null);

  const VTA = watch("vat");
  const publicPrice = watch("publicPrice");
  const result = parseFloat(VTA) / 100 + parseFloat(publicPrice);
  console.log(result);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadImage = (data) => {
    let file = image;
    if (!file) {
      toastr.error("", "Pick an image to upload");
      return;
    }
    const uploadInstance = Images.insert(
      {
        file,
        meta: {
          creationDate: new Date(),
          fileSize: file.size,
          fileName: file.name,
        },
        streams: "dynamic",
        chunkSize: "dynamic",
        allowWebWorkers: true,
      },
      false
    );

    uploadInstance.on("start", function () {
      console.log("Starting");
    });

    uploadInstance.on("end", function (_, fileObj) {
      console.log("On end File Object: ");
      console.log(fileObj._id);
      Meteor.call("addProduct", data, fileObj._id, (e, _) => {
        if (e) {
          console.log("+++++ERROR+++++");
          console.log(e);
        } else {
          toastr.success("", "Product has Been Added");
          props.history.push(
            `${Roles.getRolesForUser(
              Meteor.userId()
            )[0]?.toLowerCase()}/product_service`
          );
        }
      });
    });

    uploadInstance.on("progress", function (progress, _) {
      console.log(`Upload Percentage: ${progress}`);
    });

    uploadInstance.start();
  };

  useEffect(() => { }, [result]);

  return (
    <>
      <div>
        <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
          <div className="p-1">
            <div className="columns is-variable is-desktop">
              <div className="column">
                <div className="hero-body">
                  <div className="container">
                    <div className="bd-hero-body">
                      <div className="bd-hero-heading">
                        <h1 className="title algolia-lvl0">
                          <p>Product And Service</p>
                        </h1>
                        <section class="section">
                          <h1 class="subtitle">Informations</h1>
                          <div className="card pb-5">
                            <div className="card-content">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="columns is-desktop">
                                  <div className="column is-one-fifth">
                                    <div className="field">
                                      <div className="column">
                                        <div className="field">
                                          <label className="label">
                                            Product Type
                                          </label>
                                          <div className="control">
                                            <label className="radio">
                                              <input
                                                ref={register}
                                                type="radio"
                                                name="productType"
                                              />
                                              Material
                                            </label>
                                            <label className="radio">
                                              <input
                                                ref={register}
                                                type="radio"
                                                name="productType"
                                              />
                                              Service
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Product</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="name"
                                          type="text"
                                          placeholder="Product"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.name?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Barcode</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="barcode"
                                          type="text"
                                          placeholder="Barcode"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.barcode?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Category</label>{" "}
                                    </div>
                                    <div className="control">
                                      <div className="select">
                                        <select name="category" ref={register}>
                                          <option value="">-- Select --</option>
                                          <option value="Generale">
                                            Generale
                                          </option>
                                        </select>
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.category?.message}
                                      </div>
                                    </div>
                                  </div>{" "}
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2"></div>
                                {/* -------------------------------------------- */}
                                <div className="columns is-desktop mt-0">
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Internal Reference
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="internalReference"
                                          type="text"
                                          placeholder="Internal Reference "
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.internalreference?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        manufactrurer Reference
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="manufacturerreference"
                                          type="text"
                                          placeholder="Manufacturer Reference"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.manufacturerreference?.message}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="column">
                                    <div className="field">
                                      <label className="label">BRAND</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="brand"
                                          type="text"
                                          placeholder="EX: Geerale brand"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.brand?.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2"></div>
                                {/* -------------------------------------------- */}
                                <div className="columns is-desktop mt-0">
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Description
                                      </label>
                                      <textarea
                                        name="description"
                                        className="textarea"
                                        placeholder="Description"
                                        defaultValue={""}
                                      />

                                      <div className="help is-danger d-block">
                                        {errors.description?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    {image ? (
                                      <div className="mx-auto">
                                        <span className="form-image-figure">
                                          <img
                                            height={250}
                                            width={250}
                                            src={URL.createObjectURL(image)}
                                            className="mt-5"
                                          />
                                          <a
                                            onClick={(_) => setImage(null)}
                                            className="btn btn-icon btn-sm"
                                          >
                                            <Trash2 className="text-danger" />
                                          </a>
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="field">
                                        <label className="label">
                                          Upload your product picture
                                        </label>
                                        <div className="file is-boxed">
                                          <label className="file-label">
                                            <input
                                              className="file-input"
                                              onChange={handleFile}
                                              type="file"
                                              name="resume"
                                            />
                                            <span className="file-cta">
                                              <span className="file-icon">
                                                <i className="fas fa-upload" />
                                              </span>
                                              <span className="file-label">
                                                Choose a file…
                                              </span>
                                            </span>
                                          </label>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2"></div>
                                {/* -------------------------------------------- */}

                                <h1 class="subtitle">Sales Prices</h1>

                                <div className="columns is-desktop">
                                  <div className="column is-one-fifth">
                                    <div className="field">
                                      <div className="column">
                                        <div className="field">
                                          <div className="control">
                                            <label className="radio">
                                              <input
                                                ref={register}
                                                type="radio"
                                                name="salesPrices"
                                              />
                                              Incl.Taxes
                                            </label>
                                            <label className="radio">
                                              <input
                                                ref={register}
                                                type="radio"
                                                name="salesPrices"
                                              />
                                              Excl.Taxes
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>{" "}
                                    <div className="column">
                                      <div className="field">
                                        <label className="label">Result</label>
                                        <div className="control">
                                          <input
                                            ref={register}
                                            className="input"
                                            name="result"
                                            type="number"
                                            readOnly={true}
                                            value={result}
                                          />
                                        </div>
                                        <div className="help is-danger d-block">
                                          {errors.result?.message}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="column">
                                    <div className="column">
                                      <div className="field">
                                        <label className="label">
                                          Public Price
                                        </label>
                                        <div className="control">
                                          <input
                                            // onChange={_ => {
                                            //   setResult(parseFloat(publicPrice) + parseFloat(VTA))
                                            // }}
                                            ref={register}
                                            className="input"
                                            name="publicPrice"
                                            type="number"
                                            placeholder="0"
                                          />
                                        </div>
                                        <div className="help is-danger d-block">
                                          {errors.price?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="column">
                                      <div className="field">
                                        <label className="label">VAT</label>{" "}
                                      </div>
                                      <div className="control">
                                        <input
                                          // onChange={_ => {
                                          //   setResult(parseFloat(publicPrice) + parseFloat(VTA))
                                          // }}
                                          ref={register}
                                          className="input"
                                          name="vat"
                                          type="number"
                                          placeholder="0"
                                        />
                                        <div className="help is-danger d-block">
                                          {errors.vat?.message}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="columns is-desktop mt-0 mx-2">
                                  <div className="control">
                                    <button
                                      to="#"
                                      type="submit"
                                      className="button is-primary"
                                    >
                                      Submit
                                    </button>
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

export default AddProduct;
