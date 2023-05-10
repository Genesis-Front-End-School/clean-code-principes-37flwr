import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import BasicPagination from '.';

describe('Basic pagination', () => {
  const initialData = {
    elementsPerPage: 5,
    totalElements: 20,
    paginate: jest.fn(),
    activePage: 1,
  };

  it('should render pagination', () => {
    render(<BasicPagination {...initialData} />);
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });

  it('should render pagination with 4 pages', () => {
    render(<BasicPagination {...initialData} />);
    const paginationElem = screen.getAllByTestId('pagination-elem');
    expect(paginationElem).toHaveLength(4);
  });

  it('should render first active page', () => {
    render(<BasicPagination {...initialData} />);
    const paginationActivePage = screen.getByText('1');
    expect(paginationActivePage).toBeInTheDocument();
  });

  it('should call a function on a button call', () => {
    const { paginate } = initialData;
    render(<BasicPagination {...initialData} />);

    const secondButton = screen.getByText('2');
    expect(secondButton).toBeInTheDocument();
    fireEvent.click(secondButton);
    expect(paginate).toHaveBeenCalledTimes(1);
  });
});
