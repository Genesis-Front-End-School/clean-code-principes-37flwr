import React from 'react';
import { Button } from 'react-bootstrap';
import { FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import './styles.scss';

interface IExtendedError extends Error {
  response?: string;
}

interface IErrorFallbackProps extends Omit<FallbackProps, 'error'> {
  error: IExtendedError;
}

const ErrorFallback = ({ error, resetErrorBoundary }: IErrorFallbackProps) => {
  return (
    <div className="full-page error-fallback">
      <p className="error-fallback__text">
        An error occured. {error.response ? error.response : 'Try again later'}
      </p>
      <div className="error-fallback__buttons">
        <Link className="error-fallback__buttons__link" to="/">
          <Button variant="outline-info" onClick={resetErrorBoundary}>
            Home page
          </Button>
        </Link>
        <Button variant="outline-info" onClick={window.location.reload}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
