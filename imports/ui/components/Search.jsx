import React, { useState } from "react";
function Search({ onSearch }) {
  const [search, setSearch] = useState("");
  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <div className="level-item">
      <div className="field has-addons">
        <div className="level-item">
          <p className="control">
            <input
              className="input"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => onInputChange(e.target.value)}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
export default Search;
