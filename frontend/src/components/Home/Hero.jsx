import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCheckCircle, FaLock } from 'react-icons/fa';
import './Hero.css';

import { useAuth } from '../../context/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="hero-section">
      {/* Background Elements */}
      <div className="hero-bg-element blue-blur"></div>
      <div className="hero-bg-element green-blur"></div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column - Content */}
          <div className="hero-content">
            <h1 className="hero-headline">
              Organize Your Tasks.<br />
              <span className="hero-highlight">Boost Your Productivity.</span>
            </h1>

            <p className="hero-subheadline">
              TaskTrack helps you manage daily tasks with a secure, personal dashboard.
              Track work, meet deadlines, and stay organized—all in one simple platform.
            </p>

            <div className="hero-cta-group">
              <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary hero-btn-primary">
                {user ? "Go To Dashboard" : "Get Started Free"}
              </Link>
            </div>

            <div className="hero-trust">
              <FaShieldAlt className="trust-icon" />
              <span className="trust-text">
                Secure authentication • No credit card required
              </span>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-placeholder">
                {/* Replace with actual image */}
                <div className="image-placeholder-content">
                  <div className="dashboard-preview">
                    <div className="dashboard-header">
                      <h3>My Task Dashboard</h3>
                      <div className="dashboard-stats">
                        <span className="stat">📊 12 Tasks</span>
                        <span className="stat">✅ 5 Completed</span>
                      </div>
                    </div>
                    <div className="task-list">
                      {['Design Homepage', 'Write API Docs', 'Fix Login Bug', 'Team Meeting'].map((task, i) => (
                        <div key={i} className="task-item">
                          <FaCheckCircle className="task-icon" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="floating-badge top-right">
                  <FaCheckCircle className="badge-icon" />
                  <span>Tasks Organized</span>
                </div>
              </div>
            </div>

            {/* Decorative Badge */}
            <div className="decorative-badge bottom-left">
              <FaLock className="badge-icon" />
              <span>Token-Based Security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;