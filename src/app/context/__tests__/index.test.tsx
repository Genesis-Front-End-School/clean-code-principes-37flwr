import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';

import ContextProviders from '..';
import { mockInitialState } from 'shared/mocks/course';

describe('Context provider', () => {
  let store: MockStore;

  beforeAll(() => {
    const mockStore = configureStore();
    store = mockStore(mockInitialState);
  });

  it('should render context provider', () => {
    const { container } = render(
      <Provider store={store}>
        <ContextProviders />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
