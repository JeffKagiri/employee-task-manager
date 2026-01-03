import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaPlus,
  FaFilter,
  FaSearch,
  FaSort,
  FaCalendarAlt,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaChartLine
} from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tasks = [
    {
      id: 1,
      title: 'Complete Project Proposal',
      description: 'Finalize the client proposal document with budget estimates',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-20',
      assignedBy: 'John Manager',
      progress: 75
    },
    {
      id: 2,
      title: 'Team Meeting Preparation',
      description: 'Prepare agenda and materials for weekly team sync',
      priority: 'medium',
      status: 'todo',
      dueDate: '2024-12-15',
      assignedBy: 'Sarah Lead',
      progress: 0
    },
    {
      id: 3,
      title: 'API Integration Testing',
      description: 'Test the new payment gateway integration',
      priority: 'high',
      status: 'review',
      dueDate: '2024-12-18',
      assignedBy: 'Tech Lead',
      progress: 90
    },
    {
      id: 4,
      title: 'Documentation Update',
      description: 'Update user documentation for new features',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-12-10',
      assignedBy: 'Doc Team',
      progress: 100
    }
  ];

  const stats = {
    total: 12,
    completed: 5,
    inProgress: 3,
    pending: 4,
    overdue: 1
  };

  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'todo', label: 'To Do' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'review', label: 'Review' },
    { id: 'completed', label: 'Completed' }
  ];

  const priorityColors = {
    high: '#FF4757',
    medium: '#FFA502',
    low: '#2ED573'
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    };
    return labels[priority] || priority;
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: '#FFA502',
      'in-progress': '#2ED573',
      review: '#1E90FF',
      completed: '#7BED9F'
    };
    return colors[status] || '#7F8C8D';
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter !== 'all' && task.status !== activeFilter) return false;
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>My Task Dashboard</h1>
          <p>Track and manage all your tasks in one place</p>
        </div>
        <Link to="/create-task" className="btn btn-primary create-task-btn">
          <FaPlus />
          New Task
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon progress">
            <FaClock />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card">
            <div className="stat-icon overdue">
              <FaExclamationTriangle />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.overdue}</div>
              <div className="stat-label">Overdue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="dashboard-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="sort-options">
          <FaSort />
          <select className="sort-select">
            <option>Sort by Due Date</option>
            <option>Sort by Priority</option>
            <option>Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="tasks-container">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">
            <h3>No tasks found</h3>
            <p>Try changing your filters or create a new task</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <div className="task-title-section">
                    <h3 className="task-title">{task.title}</h3>
                    <span 
                      className="task-priority"
                      style={{ backgroundColor: priorityColors[task.priority] }}
                    >
                      {getPriorityLabel(task.priority)}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
                
                <p className="task-description">{task.description}</p>
                
                <div className="task-meta">
                  <div className="meta-item">
                    <FaCalendarAlt />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="meta-item">
                    <FaUser />
                    <span>Assigned by: {task.assignedBy}</span>
                  </div>
                </div>
                
                <div className="task-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{task.progress}%</span>
                </div>
                
                <div className="task-footer">
                  <span 
                    className="task-status"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <div className="task-actions-small">
                    <button className="action-btn complete">
                      <FaCheckCircle />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {[
            { action: 'Task completed', task: 'API Documentation', time: '2 hours ago' },
            { action: 'New task assigned', task: 'Client Meeting Prep', time: '4 hours ago' },
            { action: 'Task updated', task: 'Project Proposal', time: '1 day ago' },
            { action: 'Comment added', task: 'Team Sync Agenda', time: '2 days ago' }
          ].map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <div className="activity-text">
                  <strong>{activity.action}</strong> - {activity.task}
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;