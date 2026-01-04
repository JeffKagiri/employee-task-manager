import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserPlus, FaSignInAlt, FaTasks, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navLinks = user ? [
    { name: 'Task Dashboard', path: '/dashboard', icon: <FaTasks /> },
    { name: 'Create Task', path: '/create-task', icon: <FaPlusCircle /> },
  ] : [
    { name: 'Sign Up', path: '/register', icon: <FaUserPlus /> },
    { name: 'Login', path: '/login', icon: <FaSignInAlt /> },
  ];

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">📋</div>
            <h1 className="logo-text">Employee Task Manager</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  <span className="nav-icon"><FaSignOutAlt /></span>
                  Logout
                </button>
              </li>
            )}
          </ul>
          {!user && (
            <button className="cta-button" onClick={() => navigate('/register')}>
              Start Managing Tasks Today
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mobile-nav-icon">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button onClick={handleLogout} className="mobile-nav-link logout-btn">
                  <span className="mobile-nav-icon"><FaSignOutAlt /></span>
                  Logout
                </button>
              </li>
            )}
          </ul>
          {!user && (
            <button className="mobile-cta-button" onClick={() => { navigate('/register'); setIsMenuOpen(false); }}>
              Start Managing Tasks Today
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;