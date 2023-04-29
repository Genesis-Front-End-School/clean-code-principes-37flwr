import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IProps {
  label: string;
  path: string;
}

const NavbarButton = ({ label, path }: IProps) => {
  return (
    <Nav.Item>
      <Link className="basic-navbar__link" to={path}>
        <Button>{label}</Button>
      </Link>
    </Nav.Item>
  );
};

export default NavbarButton;
