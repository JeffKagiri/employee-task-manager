const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
} = require('../controllers/userController');

// All routes are protected
router.use(protect);

// Manager and admin routes
router.route('/')
  .get(authorize('manager', 'admin'), getUsers);

router.route('/stats')
  .get(authorize('manager', 'admin'), getUserStats);

router.route('/:id')
  .get(getUserById)
  .put(authorize('manager', 'admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;