import Nav from "react-bootstrap/Nav";
import NavbarButton from "./NavbarButton";
import { navbarButtonsOptions } from "./navbarButtonsOptions";
import "./styles.scss";

const Navbar = () => (
  <Nav variant="pills" defaultActiveKey="/courses" className="basic-navbar">
    {navbarButtonsOptions.map(({ label, path }) => (
      <NavbarButton label={label} path={path} />
    ))}
  </Nav>
);

export default Navbar;
