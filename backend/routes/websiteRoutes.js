const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createWebsite,
  getWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
  publishWebsite,
} = require('../controllers/websiteController');

router.route('/')
  .post(protect, createWebsite)
  .get(protect, getWebsites);

router.route('/:id')
  .get(protect, getWebsiteById)
  .put(protect, updateWebsite)
  .delete(protect, deleteWebsite);

router.route('/:id/publish')
  .post(protect, publishWebsite);

module.exports = router;