import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Navbar from './index';
import NavbarButton from './NavbarButton';

import { navbarButtons } from '../../constants/navbarButtons';

describe('Navbar component', () => {
  describe('Navbar container', () => {
    it('should render navbar', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    it('should render navbar buttons', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      expect(screen.getAllByTestId('navbar-button')).toHaveLength(
        navbarButtons.length
      );
    });
  });

  describe('Navbar button', () => {
    const initialData = {
      label: 'Home Page',
      path: '/',
    };

    it('should render button', () => {
      render(
        <MemoryRouter>
          <NavbarButton {...initialData} />
        </MemoryRouter>
      );
      expect(screen.getByText(/Home Page/)).toBeInTheDocument();
    });
  });
});
