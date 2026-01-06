import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaPlus,
  FaSearch,
  FaSort,
  FaCalendarAlt,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaChartLine
} from 'react-icons/fa';
import taskService from '../services/taskService';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId, user.token);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleToggleComplete = async (task) => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    const newProgress = newStatus === 'completed' ? 100 : 0; // Simple progress logic

    try {
      const updatedTask = await taskService.updateTask(task._id, {
        status: newStatus,
        progress: newProgress
      }, user.token);

      setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    }
  };


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user && user.token) {
          const fetchedTasks = await taskService.getTasks(user.token);
          setTasks(fetchedTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const getTaskStatus = (task) => {
    if (task.status === 'completed') return 'completed';

    // Safety check for due date
    if (!task.dueDate) return task.status;

    const now = new Date();
    const due = new Date(task.dueDate);

    // Check if overdue
    if (now > due) return 'overdue';

    const isSameDay = now.toDateString() === due.toDateString();
    if (isSameDay) return 'in-progress';

    return task.status;
  };

  const getOverdueCount = () => {
    const now = new Date();
    return tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < now).length;
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => getTaskStatus(t) === 'in-progress').length,
    pending: tasks.filter(t => getTaskStatus(t) === 'todo').length,
    overdue: getOverdueCount()
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
      completed: '#7BED9F',
      overdue: '#FF4757'
    };
    return colors[status] || '#7F8C8D';
  };

  const filteredTasks = tasks.filter(task => {
    // We filter by the DERIVED status now if user selects a filter
    const currentStatus = getTaskStatus(task);

    if (activeFilter !== 'all' && currentStatus !== activeFilter) return false;
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

      {loading ? (
        <div className="loading-spinner-container" style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : (
        <>
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
                        <button
                          className="action-btn edit"
                          onClick={() => navigate(`/edit-task/${task._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>
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
                        style={{ backgroundColor: getStatusColor(getTaskStatus(task)) }}
                      >
                        {getTaskStatus(task).replace('-', ' ').toUpperCase()}
                      </span>
                      <div className="task-actions-small">
                        <button
                          className={`action-btn complete ${task.status === 'completed' ? 'active' : ''}`}
                          onClick={() => handleToggleComplete(task)}
                          title={task.status === 'completed' ? "Mark as Incomplete" : "Mark as Completed"}
                          style={{ color: task.status === 'completed' ? '#2ecc71' : '#bdc3c7' }}
                        >
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
              {tasks.length > 0 ? (
                tasks.slice(0, 5).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <div className="activity-text">
                        <strong>Task Updated</strong> - {activity.title}
                      </div>
                      <div className="activity-time">{activity.updatedAt}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-activity">No recent activity to show.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;