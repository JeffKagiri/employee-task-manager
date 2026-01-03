import React from 'react';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      icon: <FaCheckCircle />,
      title: "No More Scattered Information",
      description: "All your tasks live in one organized dashboard instead of across sticky notes and multiple apps."
    },
    {
      icon: <FaCheckCircle />,
      title: "Clear Deadline Tracking",
      description: "See what's urgent at a glance with sorting and filtering that highlights your most important tasks."
    },
    {
      icon: <FaCheckCircle />,
      title: "Your Data Stays Private",
      description: "Each account is isolated with secure authentication—you only see your tasks, nobody else's."
    },
    {
      icon: <FaCheckCircle />,
      title: "Simple Navigation",
      description: "Complete actions with fewer clicks—designed for efficiency and ease of use."
    }
  ];

  return (
    <section className="benefits-section">
      <div className="container">
        <div className="benefits-grid">
          {/* Left Column - Content */}
          <div className="benefits-content">
            <h2 className="benefits-title">
              Stop Losing Track of Important Work
            </h2>
            
            <p className="benefits-intro">
              Scattered notes, forgotten reminders, and missed deadlines create unnecessary stress. 
              TaskTrack centralizes everything in one secure platform, so you can focus on getting things done instead of remembering what needs to be done.
            </p>

            {/* Benefits List */}
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon">
                    {benefit.icon}
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link to="/register" className="btn btn-primary benefits-cta">
              Get Your Dashboard
              <FaArrowRight className="cta-icon" />
            </Link>
          </div>

          {/* Right Column - Visual */}
          <div className="benefits-visual">
            <div className="checklist-preview">
              <div className="checklist-header">
                <h3>Today's Checklist</h3>
                <div className="progress-circle">
                  <div className="progress-value">75%</div>
                </div>
              </div>
              
              <div className="checklist-items">
                {[
                  { task: 'Review Project Plan', completed: true },
                  { task: 'Team Standup Meeting', completed: true },
                  { task: 'Complete API Documentation', completed: true },
                  { task: 'Client Presentation', completed: false },
                  { task: 'Code Review', completed: false }
                ].map((item, index) => (
                  <div key={index} className={`checklist-item ${item.completed ? 'completed' : ''}`}>
                    <div className="checkmark">
                      {item.completed ? '✓' : ''}
                    </div>
                    <span>{item.task}</span>
                  </div>
                ))}
              </div>
              
              <div className="checklist-stats">
                <div className="stat">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="stat">
                  <div className="stat-number">2</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Total</div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="floating-dashboard-badge">
              <div className="badge-icon">📋</div>
              <span>Personal Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;