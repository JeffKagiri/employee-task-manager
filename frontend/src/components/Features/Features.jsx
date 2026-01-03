import React from 'react';
import {
  FaPlusCircle,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaLock
} from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <FaPlusCircle />,
      title: "Create Tasks Easily",
      description: "Add new tasks with a title, description, and due date in seconds. Keep all your work organized in one place.",
      color: "blue"
    },
    {
      icon: <FaEye />,
      title: "View All Tasks",
      description: "Access your personal dashboard with a clean interface that displays all your tasks at a glance.",
      color: "green"
    },
    {
      icon: <FaEdit />,
      title: "Update Anytime",
      description: "Plans change? Update task details instantly when deadlines shift or priorities evolve.",
      color: "orange"
    },
    {
      icon: <FaTrash />,
      title: "Remove Completed Tasks",
      description: "Delete tasks that are no longer needed and keep your dashboard clutter-free and focused.",
      color: "purple"
    },
    {
      icon: <FaFilter />,
      title: "Filter & Sort",
      description: "View tasks by status or deadline. Sort by urgency to tackle the most important work first.",
      color: "cyan"
    },
    {
      icon: <FaLock />,
      title: "Secure & Private",
      description: "Token-based authentication protects your data. Each user sees only their own tasks—complete privacy guaranteed.",
      color: "blue-dark"
    }
  ];

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'feature-icon-blue',
      green: 'feature-icon-green',
      orange: 'feature-icon-orange',
      purple: 'feature-icon-purple',
      cyan: 'feature-icon-cyan',
      'blue-dark': 'feature-icon-blue-dark'
    };
    return colorMap[color] || 'feature-icon-blue';
  };

  return (
    <section className="features-section">
      <div className="container">
        {/* Header */}
        <div className="features-header">
          <h2 className="features-title">Everything You Need to Stay Organized</h2>
          <p className="features-subtitle">
            Simple, powerful tools that help you track tasks, meet deadlines, and boost your productivity—all in one secure platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`feature-icon-container ${getColorClass(feature.color)}`}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;