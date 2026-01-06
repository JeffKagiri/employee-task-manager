const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'review', 'completed'],
    default: 'todo',
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add a due date'],
  },
  assignedBy: {
    type: String,
    default: 'Self',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);