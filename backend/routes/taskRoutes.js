const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getUserTasks,
  updateTaskStatus,
  addComment,
  getTaskStatistics,
} = require('../controllers/taskController');

// All routes are protected
router.use(protect);

router.route('/')
  .post(createTask)
  .get(getTasks);

router.route('/my-tasks')
  .get(getUserTasks);

router.route('/statistics')
  .get(getTaskStatistics);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.route('/:id/status')
  .put(updateTaskStatus);

router.route('/:id/comments')
  .post(addComment);

module.exports = router;