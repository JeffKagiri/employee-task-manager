const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    assignedTo,
    priority,
    dueDate,
    estimatedHours,
    tags,
  } = req.body;

  const task = await Task.create({
    title,
    description,
    assignedTo,
    assignedBy: req.user.id,
    priority: priority || 'medium',
    dueDate,
    estimatedHours,
    tags,
  });

  const populatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email avatar')
    .populate('assignedBy', 'name email');

  res.status(201).json(populatedTask);
});

// @desc    Get all tasks (with filters)
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const {
    status,
    priority,
    assignedTo,
    startDate,
    endDate,
    page = 1,
    limit = 20,
  } = req.query;

  const query = {};

  // Build query based on filters
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignedTo) query.assignedTo = assignedTo;
  
  // Date range filter
  if (startDate || endDate) {
    query.dueDate = {};
    if (startDate) query.dueDate.$gte = new Date(startDate);
    if (endDate) query.dueDate.$lte = new Date(endDate);
  }

  // Check user role for task visibility
  if (req.user.role === 'employee') {
    query.$or = [
      { assignedTo: req.user.id },
      { assignedBy: req.user.id }
    ];
  }

  const tasks = await Task.find(query)
    .populate('assignedTo', 'name email avatar')
    .populate('assignedBy', 'name email')
    .sort('-createdAt')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Task.countDocuments(query);

  res.json({
    tasks,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    totalTasks: count,
  });
});

// @desc    Get user's tasks
// @route   GET /api/tasks/my-tasks
// @access  Private
const getUserTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id })
    .populate('assignedBy', 'name email')
    .sort('-createdAt');

  // Calculate task statistics
  const statistics = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => {
      if (!t.dueDate) return false;
      return t.status !== 'completed' && new Date(t.dueDate) < new Date();
    }).length,
  };

  res.json({ tasks, statistics });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignedTo', 'name email avatar department position')
    .populate('assignedBy', 'name email')
    .populate('comments.user', 'name email avatar');

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check permissions
  if (
    req.user.role === 'employee' &&
    task.assignedTo._id.toString() !== req.user.id &&
    task.assignedBy._id.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to view this task');
  }

  res.json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check permissions
  if (
    req.user.role === 'employee' &&
    task.assignedTo.toString() !== req.user.id &&
    task.assignedBy.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to update this task');
  }

  // Update fields
  const allowedUpdates = [
    'title',
    'description',
    'priority',
    'dueDate',
    'estimatedHours',
    'tags',
    'progress',
  ];

  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined) {
      task[field] = req.body[field];
    }
  });

  // Only managers/admins can reassign tasks
  if (req.user.role !== 'employee' && req.body.assignedTo) {
    task.assignedTo = req.body.assignedTo;
  }

  const updatedTask = await task.save();
  const populatedTask = await Task.findById(updatedTask._id)
    .populate('assignedTo', 'name email avatar')
    .populate('assignedBy', 'name email');

  res.json(populatedTask);
});

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private
const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status, progress } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check if user is assigned to the task
  if (
    task.assignedTo.toString() !== req.user.id &&
    req.user.role === 'employee'
  ) {
    res.status(403);
    throw new Error('Not authorized to update this task');
  }

  const updateData = { status };
  if (progress !== undefined) updateData.progress = progress;
  
  if (status === 'completed') {
    updateData.completedAt = Date.now();
    updateData.progress = 100;
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  )
    .populate('assignedTo', 'name email')
    .populate('assignedBy', 'name email');

  res.json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Managers/Admins only)
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Only managers/admins can delete tasks
  if (req.user.role === 'employee') {
    res.status(403);
    throw new Error('Not authorized to delete tasks');
  }

  await task.deleteOne();
  res.json({ message: 'Task removed' });
});

// @desc    Add comment to task
// @route   POST /api/tasks/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check if user is related to the task
  if (
    req.user.role === 'employee' &&
    task.assignedTo.toString() !== req.user.id &&
    task.assignedBy.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to comment on this task');
  }

  task.comments.push({
    user: req.user.id,
    text,
  });

  await task.save();
  
  const updatedTask = await Task.findById(req.params.id)
    .populate('comments.user', 'name email avatar');

  res.json(updatedTask);
});

// @desc    Get task statistics
// @route   GET /api/tasks/statistics
// @access  Private
const getTaskStatistics = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;
  
  let query = {};
  if (role === 'employee') {
    query.assignedTo = userId;
  }

  const tasks = await Task.find(query);
  
  const statistics = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
    overdueTasks: tasks.filter(t => {
      if (!t.dueDate || t.status === 'completed') return false;
      return new Date(t.dueDate) < new Date();
    }).length,
    tasksByPriority: {
      low: tasks.filter(t => t.priority === 'low').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      high: tasks.filter(t => t.priority === 'high').length,
      urgent: tasks.filter(t => t.priority === 'urgent').length,
    },
  };

  // Calculate completion rate
  statistics.completionRate = tasks.length > 0 
    ? Math.round((statistics.completedTasks / tasks.length) * 100)
    : 0;

  // If manager or admin, add team statistics
  if (role !== 'employee') {
    const allTasks = await Task.find();
    statistics.teamTotalTasks = allTasks.length;
    statistics.teamCompletedTasks = allTasks.filter(t => t.status === 'completed').length;
    statistics.teamCompletionRate = allTasks.length > 0 
      ? Math.round((statistics.teamCompletedTasks / allTasks.length) * 100)
      : 0;
    
    // Tasks by status for charts
    statistics.teamTasksByStatus = {
      todo: allTasks.filter(t => t.status === 'todo').length,
      inProgress: allTasks.filter(t => t.status === 'in_progress').length,
      review: allTasks.filter(t => t.status === 'review').length,
      completed: statistics.teamCompletedTasks,
    };
  }

  res.json(statistics);
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getUserTasks,
  updateTaskStatus,
  addComment,
  getTaskStatistics,
};