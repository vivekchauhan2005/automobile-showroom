const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  logout,
  getProfile, 
  updateProfile, 
  changePassword,
  getUserActivities,
  getDashboardStats
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.get('/activities', protect, getUserActivities);
router.get('/dashboard-stats', protect, getDashboardStats);

module.exports = router;