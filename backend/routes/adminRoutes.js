const express = require('express');
const {
  getDashboardAnalytics,
  getAllCustomers,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/analytics', protect, admin, getDashboardAnalytics);
router.get('/customers', protect, admin, getAllCustomers);

module.exports = router;
