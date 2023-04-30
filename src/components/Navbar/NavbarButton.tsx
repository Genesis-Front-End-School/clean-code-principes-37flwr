import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface INavbarButtonProps {
  label: string;
  path: string;
}

const NavbarButton = ({ label, path }: INavbarButtonProps) => {
  return (
    <Nav.Item>
      <Link className="basic-navbar__link" to={path}>
        <Button>{label}</Button>
      </Link>
    </Nav.Item>
  );
};

export default NavbarButton;
