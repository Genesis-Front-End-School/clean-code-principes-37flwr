import React, { useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface IBasicPaginationProps {
  elementsPerPage: number;
  totalElements: number;
  paginate: (number: number) => void;
  activePage: number;
}

const BasicPagination = ({
  elementsPerPage,
  totalElements,
  paginate,
  activePage,
}: IBasicPaginationProps) => {
  const memoizedPageNumbers = useMemo(
    () => getPageNumbers(totalElements, elementsPerPage),
    [totalElements, elementsPerPage]
  );

  function getPageNumbers(
    totalElements: number,
    elementsPerPage: number
  ): Array<number> {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  return (
    <Pagination>
      {memoizedPageNumbers.map((number) => (
        <Pagination.Item
          onClick={() => paginate(number)}
          key={number}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default BasicPagination;
