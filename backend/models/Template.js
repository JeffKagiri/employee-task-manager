const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a template name'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['project', 'task', 'report', 'meeting', 'other'],
    default: 'task',
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt before saving
templateSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Increment usage count
templateSchema.methods.incrementUsage = function () {
  this.usageCount += 1;
  return this.save();
};

// Common task templates
templateSchema.statics.getCommonTemplates = function () {
  return [
    {
      name: 'Weekly Status Report',
      category: 'report',
      content: {
        sections: ['Accomplishments', 'Challenges', 'Next Week Plan', 'Blockers'],
      },
    },
    {
      name: 'Bug Fix Task',
      category: 'task',
      content: {
        steps: ['Reproduce bug', 'Identify root cause', 'Implement fix', 'Test solution', 'Document changes'],
      },
    },
    {
      name: 'Meeting Agenda',
      category: 'meeting',
      content: {
        items: ['Review previous action items', 'Discuss current progress', 'Identify blockers', 'Plan next steps', 'Assign action items'],
      },
    },
  ];
};

module.exports = mongoose.model('Template', templateSchema);