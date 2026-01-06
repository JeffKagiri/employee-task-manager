import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import taskService from '../services/taskService';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css'; // Reusing dashboard styles for consistency

const CreateTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            if (id && user && user.token) {
                try {
                    setLoading(true);
                    const task = await taskService.getTask(id, user.token);
                    const dateObj = task.dueDate ? new Date(task.dueDate) : null;
                    // Format to YYYY-MM-DDTHH:mm for datetime-local
                    const formattedDate = dateObj ? dateObj.toISOString().slice(0, 16) : '';
                    setFormData({
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                        dueDate: formattedDate,
                    });
                } catch (error) {
                    console.error('Error fetching task:', error);
                    navigate('/dashboard');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchTask();
    }, [id, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = user.token;
            if (id) {
                await taskService.updateTask(id, formData, token);
            } else {
                await taskService.createTask(formData, token);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert(`Failed to ${id ? 'update' : 'create'} task. Please try again.`);
        }
    };

    return (
        <div className="dashboard-page">
            <div className="container" style={{ maxWidth: '800px', margin: '40px auto' }}>
                <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mb-4">
                    <FaArrowLeft /> Back to Dashboard
                </button>

                <div className="auth-card" style={{ maxWidth: '100%' }}>
                    <div className="auth-header">
                        <h2>{id ? 'Edit Task' : 'Create New Task'}</h2>
                        <p>{id ? 'Update task details' : 'Assign a new task to yourself or your team'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Task Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="e.g. Update Homepage Design"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-input"
                                rows="4"
                                placeholder="Detailed description of the task..."
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Priority</label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="form-input"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Due Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} disabled={loading}>
                            <FaSave /> {loading ? 'Saving...' : (id ? 'Update Task' : 'Create Task')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
