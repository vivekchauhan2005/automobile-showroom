const express = require('express');
const router = express.Router();
const { 
  requestTestDrive,
  getUserTestDrives,
  getAllTestDrives,
  updateTestDriveStatus
} = require('../controllers/testDriveController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', requestTestDrive);
router.get('/user', protect, getUserTestDrives);
router.get('/admin/all', protect, admin, getAllTestDrives);
router.put('/:id/status', protect, admin, updateTestDriveStatus);

module.exports = router;