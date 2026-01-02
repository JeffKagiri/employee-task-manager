const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Managers/Admins)
const getUsers = asyncHandler(async (req, res) => {
  // Only managers and admins can view all users
  if (req.user.role === 'employee') {
    res.status(403);
    throw new Error('Not authorized to view all users');
  }

  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Users can only view their own profile unless they're managers/admins
  if (
    req.user.role === 'employee' &&
    user._id.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to view this user');
  }

  res.json(user);
});

// @desc    Update user (by admin/manager)
// @route   PUT /api/users/:id
// @access  Private (Managers/Admins)
const updateUser = asyncHandler(async (req, res) => {
  // Only managers and admins can update other users
  if (req.user.role === 'employee') {
    res.status(403);
    throw new Error('Not authorized to update users');
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update fields
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  user.department = req.body.department || user.department;
  user.position = req.body.position || user.position;
  user.avatar = req.body.avatar || user.avatar;
  user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    department: updatedUser.department,
    position: updatedUser.position,
    avatar: updatedUser.avatar,
    isActive: updatedUser.isActive,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
  // Only admins can delete users
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete users');
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent self-deletion
  if (user._id.toString() === req.user.id) {
    res.status(400);
    throw new Error('Cannot delete your own account');
  }

  await user.deleteOne();
  res.json({ message: 'User removed' });
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private (Managers/Admins)
const getUserStats = asyncHandler(async (req, res) => {
  // Only managers and admins can view user statistics
  if (req.user.role === 'employee') {
    res.status(403);
    throw new Error('Not authorized to view user statistics');
  }

  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const usersByRole = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } }
  ]);
  const usersByDepartment = await User.aggregate([
    { $group: { _id: '$department', count: { $sum: 1 } } }
  ]);

  res.json({
    totalUsers,
    activeUsers,
    inactiveUsers: totalUsers - activeUsers,
    usersByRole: usersByRole.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {}),
    usersByDepartment: usersByDepartment.reduce((acc, curr) => {
      acc[curr._id || 'Not specified'] = curr.count;
      return acc;
    }, {}),
  });
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
};