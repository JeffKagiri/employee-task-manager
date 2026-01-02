const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  htmlContent: {
    type: String,
    required: true,
  },
  cssContent: {
    type: String,
    default: '',
  },
  jsContent: {
    type: String,
    default: '',
  },
  thumbnail: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Website', websiteSchema);