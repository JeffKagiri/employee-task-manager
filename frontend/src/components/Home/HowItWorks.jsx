import React from 'react';
import { FaChartLine, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Create Your Account",
      description: "Sign up in seconds and get your own secure, token-authenticated account."
    },
    {
      number: "2",
      title: "Add Your Tasks",
      description: "Input tasks with titles, descriptions, and due dates through simple forms."
    },
    {
      number: "3",
      title: "Stay Organized",
      description: "Filter by status, sort by deadline, and track your progress in real-time."
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="how-it-works-grid">
          {/* Left Side - Content */}
          <div className="how-it-works-content">
            <h2 className="how-it-works-title">
              How TaskTrack Simplifies Your Workflow
            </h2>
            
            <p className="how-it-works-intro">
              Built on the MERN stack, TaskTrack provides a seamless experience for managing your daily tasks. 
              From secure authentication to intuitive task management, every feature is designed to help you work smarter.
            </p>

            {/* Process Steps */}
            <div className="process-steps">
              {steps.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{step.number}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link to="/register" className="btn btn-primary how-it-works-cta">
              Start Organizing Now
              <FaArrowRight className="cta-icon" />
            </Link>
          </div>

          {/* Right Side - Visual */}
          <div className="how-it-works-visual">
            <div className="dashboard-preview-large">
              <div className="dashboard-header-large">
                <h3>Task Dashboard</h3>
                <div className="dashboard-filters">
                  <span className="filter active">All Tasks</span>
                  <span className="filter">Today</span>
                  <span className="filter">This Week</span>
                </div>
              </div>
              
              <div className="kanban-board">
                <div className="kanban-column">
                  <h4 className="column-title">To Do</h4>
                  <div className="task-cards">
                    {['Design Review', 'API Integration'].map((task, i) => (
                      <div key={i} className="kanban-task">
                        <div className="task-priority high"></div>
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="kanban-column">
                  <h4 className="column-title">In Progress</h4>
                  <div className="task-cards">
                    <div className="kanban-task">
                      <div className="task-priority medium"></div>
                      <span>User Testing</span>
                    </div>
                  </div>
                </div>
                
                <div className="kanban-column">
                  <h4 className="column-title">Done</h4>
                  <div className="task-cards">
                    {['Setup Database', 'Design Mockups'].map((task, i) => (
                      <div key={i} className="kanban-task completed">
                        <div className="task-priority low"></div>
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="floating-stat-badge">
              <FaChartLine className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">100%</div>
                <div className="stat-label">Task Visibility</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;