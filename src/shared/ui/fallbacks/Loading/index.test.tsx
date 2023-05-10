import React from 'react';
import { render, screen } from '@testing-library/react';

import Loading from './index';

describe('Loading', () => {
  it('should render three elements', () => {
    render(<Loading />);

    expect(screen.getAllByTestId('spinner')).toHaveLength(3);
  });
});
