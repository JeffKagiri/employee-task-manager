import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserPlus, FaSignInAlt, FaTasks, FaPlusCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Sign Up', path: '/register', icon: <FaUserPlus /> },
    { name: 'Login', path: '/login', icon: <FaSignInAlt /> },
    { name: 'Task Dashboard', path: '/dashboard', icon: <FaTasks /> },
    { name: 'Create Task', path: '/create-task', icon: <FaPlusCircle /> },
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
          </ul>
          <button className="cta-button">
            Start Managing Tasks Today
          </button>
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
          </ul>
          <button className="mobile-cta-button">
            Start Managing Tasks Today
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;