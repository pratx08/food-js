// Navbar.jsx
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Student Dashboard</Link>
      <Link to="/admin">Admin Dashboard</Link>
    </nav>
  );
}

export default Navbar;
