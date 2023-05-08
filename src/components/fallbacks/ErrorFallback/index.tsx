import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IErrorFallbackProps } from './ErrorFallback.interface';
import './styles.scss';

const ErrorFallback = ({ error, resetErrorBoundary }: IErrorFallbackProps) => {
  return (
    <div className="full-page error-fallback" data-testid="error-fallback">
      <p className="error-fallback__text">
        An error occured. {error.response ? error.response : 'Try again later'}
      </p>
      <div className="error-fallback__buttons">
        <Link className="error-fallback__buttons__link" to="/">
          <Button
            variant="outline-info"
            data-testid="reset-button"
            onClick={resetErrorBoundary}
          >
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
