import React from "react";

const TableCol = ({ col }) => {
  return (
    <td colSpan={col ?? 3}>
      <p className="has-text-centered">No Data Found.</p>
    </td>
  );
};

export default TableCol;
