import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserPlus, FaSignInAlt, FaTasks, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
    setIsProfileOpen(false);
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
              <li className="profile-dropdown-container" ref={dropdownRef}>
                <button
                  className="nav-link profile-btn"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="avatar-small">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" />
                    ) : user.gender === 'male' ? (
                      <img src="https://avatar.iran.liara.run/public/boy" alt="Male Profile" />
                    ) : user.gender === 'female' ? (
                      <img src="https://avatar.iran.liara.run/public/girl" alt="Female Profile" />
                    ) : (
                      <div className="avatar-placeholder">{user.name.charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                  <span className="user-name">{user.name}</span>
                </button>

                {/* Dropdown Menu */}
                <div className={`dropdown-menu ${isProfileOpen ? 'show' : ''}`}>
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>Profile Settings</Link>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
          {!user && (
            <Link to="/register" className="cta-button">
              Start Managing Tasks Today
            </Link>
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