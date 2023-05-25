import Nav from 'react-bootstrap/Nav';
import NavbarButton from './NavbarButton';
import { navbarButtons } from '../../shared/constants/navbarButtons';
import './styles.scss';
import { ChangeThemeButton } from 'component-lib';
import { useTheme } from 'features/useTheme';

const Navbar = () => {
  console.log();
  const { theme, changeTheme } = useTheme();
  return (
    <Nav
      variant="pills"
      defaultActiveKey="/courses"
      className="basic-navbar"
      data-testid="navbar"
    >
      {navbarButtons.map(({ label, path }) => (
        <NavbarButton key={label} label={label} path={path} />
      ))}
      <ChangeThemeButton
        onClick={changeTheme}
        currentTheme={theme === 'light' ? 'base' : 'alternative'}
      />
    </Nav>
  );
};

export default Navbar;
