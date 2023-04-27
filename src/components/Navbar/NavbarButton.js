import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarButton = ({ label, path }) => {
  return (
    <Nav.Item>
      <Link className="basic-navbar__link" to={path}>
        <Button>{label}</Button>
      </Link>
    </Nav.Item>
  );
};

export default NavbarButton;
