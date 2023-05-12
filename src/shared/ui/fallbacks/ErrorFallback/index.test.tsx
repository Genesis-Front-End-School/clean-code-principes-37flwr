import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import ErrorFallback from './index';

import { IErrorFallbackProps } from './ErrorFallback.interface';

let initialProps: IErrorFallbackProps;

describe('ErrorFallback', () => {
  beforeEach(() => {
    initialProps = {
      error: {
        name: 'error-name',
        response: 'error-response',
        message: 'error-message',
        ...Error,
      },
      resetErrorBoundary: jest.fn(),
    };
  });

  it('should render error fallback', () => {
    render(
      <MemoryRouter>
        <ErrorFallback {...initialProps} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });

  it('should render error response', () => {
    render(
      <MemoryRouter>
        <ErrorFallback {...initialProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/error-response/)).toBeInTheDocument();
  });

  it('should render standart text if response is not provided', () => {
    initialProps.error.response = '';
    render(
      <MemoryRouter>
        <ErrorFallback {...initialProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Try again later/)).toBeInTheDocument();
  });

  it('should reset error boundary on click', () => {
    render(
      <MemoryRouter>
        <ErrorFallback {...initialProps} />
      </MemoryRouter>
    );

    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);

    expect(initialProps.resetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
