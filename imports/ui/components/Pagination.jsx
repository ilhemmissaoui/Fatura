import React, { useEffect, useMemo, useState } from "react";

import Pagination from "react-bootstrap/Pagination";
const Pager = ({
  total = 0,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);
  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          className="pagination-link"
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {" "}
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  }, [totalPages, currentPage]);
  // if ( totalPages === 0 ) return null ;
  return (
    <Pagination className="pagination is-small">
      <Pagination.Prev
        className="pagination-previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Pagination.Next
        className="pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <ul className="pagination-list">{paginationItems}</ul>
    </Pagination>
  );
};
export default Pager;
