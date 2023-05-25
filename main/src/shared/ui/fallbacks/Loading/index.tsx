import React from 'react';
import { Spinner } from 'react-bootstrap';
import './styles.scss';

const Loading = () => {
  return (
    <div className="loading">
      {[...Array(3)].map((_, i) => (
        <Spinner
          data-testid="spinner"
          animation="grow"
          size="sm"
          key={i}
          className="loading__spinner"
        />
      ))}
    </div>
  );
};

export default Loading;
