import React from "react";

const ProductItem = () => {
  return (
    <>
      <div className="field-body">
        <div className="field">
          <p className="control is-expanded has-icons-left">
            <div className="control">
              <div>
                <select name="name">
                  <option value="">--- Select ---</option>
                </select>
              </div>
            </div>{" "}
          </p>
        </div>

        <div className="field">
          <input className="input is-small" type="number" placeholder="1" />
        </div>

        <div className="field">
          <input className="input is-small" type="text" defaultValue="1" />
        </div>
        <div className="field">
          <input className="input is-small" type="text" placeholder="0%" />
        </div>
        <div className="field">
          <input
            className="input is-small"
            type="text"
            defaultValue="0.000TND"
          />
        </div>
      </div>
    </>
  );
};

export default ProductItem;
