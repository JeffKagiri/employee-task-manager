import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Footer.css';

const Footer = () => {
  const { user } = useAuth();

  const quickLinks = [
    { name: 'Home', path: user ? '/dashboard' : '/' },
    { name: 'Task Dashboard', path: user ? '/dashboard' : '/register' },
    { name: 'Create Task', path: user ? '/create-task' : '/register' },
  ];

  const accountLinks = [
    { name: 'Sign Up', path: '/register' },
    { name: 'Login', path: '/login' },
    { name: 'My Dashboard', path: user ? '/dashboard' : '/register' },
    { name: 'Help', path: '/help' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-column brand-column">
            <div className="footer-logo">
              <div className="footer-logo-icon">📋</div>
              <h3 className="footer-logo-text">Employee Task Manager</h3>
            </div>
            <p className="footer-description">
              TaskTrack helps you organize daily tasks with a secure, personal dashboard.
              Stay on top of deadlines and boost your productivity.
            </p>
            <div className="social-links">
              <button className="social-link" aria-label="Facebook">
                <FaFacebook />
              </button>
              <button className="social-link" aria-label="Twitter">
                <FaTwitter />
              </button>
              <button className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="footer-link"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Account</h4>
            <ul className="footer-links">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="footer-link"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-column newsletter-column">
            <h4 className="footer-heading">Stay Updated</h4>
            <p className="newsletter-description">
              Subscribe to get productivity tips and updates.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            © 2026 Employee Task Manager. All rights reserved.
          </div>
          <div className="legal-links">
            {legalLinks.map((link) => (
              <Link key={link.name} to={link.path} className="legal-link">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;