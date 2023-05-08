import Nav from 'react-bootstrap/Nav';
import NavbarButton from './NavbarButton';
import { navbarButtons } from '../../constants/navbarButtons';
import './styles.scss';

const Navbar = () => (
  <Nav variant="pills" defaultActiveKey="/courses" className="basic-navbar">
    {navbarButtons.map(({ label, path }) => (
      <NavbarButton label={label} path={path} />
    ))}
  </Nav>
);

export default Navbar;
