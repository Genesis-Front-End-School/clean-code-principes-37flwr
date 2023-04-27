import React, { useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";

const BasicPagination = ({
  elementsPerPage,
  totalElements,
  paginate,
  active,
}) => {
  const getPageNumbers = (totalElements, elementsPerPage) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const memoizedPageNumbers = useMemo(
    () => getPageNumbers(totalElements, elementsPerPage),
    [totalElements, elementsPerPage]
  );

  return (
    <Pagination>
      {memoizedPageNumbers.map((number) => (
        <Pagination.Item
          onClick={() => paginate(number)}
          key={number}
          active={parseInt(number) === parseInt(active)}
        >
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default BasicPagination;
