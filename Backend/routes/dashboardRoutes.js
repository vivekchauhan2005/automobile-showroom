const express = require('express');
const router = express.Router();
const { 
  getDashboardStats,
  getRevenueStats
} = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/revenue', protect, admin, getRevenueStats);

module.exports = router;