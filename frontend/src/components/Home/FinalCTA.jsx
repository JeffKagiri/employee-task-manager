import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaClock, FaInfinity } from 'react-icons/fa';
import './FinalCTA.css';

const FinalCTA = () => {
  const trustIndicators = [
    {
      icon: <FaShieldAlt />,
      text: "Secure Platform"
    },
    {
      icon: <FaClock />,
      text: "Setup in Minutes"
    },
    {
      icon: <FaInfinity />,
      text: "Unlimited Tasks"
    }
  ];

  return (
    <section className="final-cta-section">
      {/* Background Elements */}
      <div className="cta-bg-element top-left"></div>
      <div className="cta-bg-element bottom-right"></div>
      
      <div className="container">
        <div className="final-cta-content">
          <h2 className="final-cta-title">
            Ready to Take Control of Your Tasks?
          </h2>
          
          <p className="final-cta-subtitle">
            Join TaskTrack today and experience a better way to organize your work. 
            Create your free account in seconds and start managing tasks the smart way.
          </p>

          {/* CTA Buttons */}
          <div className="final-cta-buttons">
            <Link to="/register" className="btn btn-light final-cta-primary">
              Start Managing Tasks Free
            </Link>
            <Link to="/login" className="btn btn-outline-light final-cta-secondary">
              Login to Your Account
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="trust-indicator">
                <div className="trust-indicator-icon">
                  {indicator.icon}
                </div>
                <span className="trust-indicator-text">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;