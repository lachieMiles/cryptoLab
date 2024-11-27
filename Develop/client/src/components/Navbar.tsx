import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth'; // Handles authentication logic
import '../index.css';
import logo from '../assets/alien.png'; // Logo image path

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = AuthService.loggedIn();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left section: Logo and CryptoLab */}
      <div className="navbar-left">
        <img src={logo} alt="CryptoLab Logo" className="logo-small" />
        <span className="text-bold">CryptoLab</span>
      </div>

      {/* Right section: Navigation links */}
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="navbar-link">
              Cryptocurrencies & Stocks
            </Link>
            <Link to="/saved" className="navbar-link">
              Saved
            </Link>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <Link to="/login" className="navbar-link">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
