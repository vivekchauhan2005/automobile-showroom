const express = require('express');
const router = express.Router();
const { 
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  replyEnquiry,
  getUserEnquiries
} = require('../controllers/enquiryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', submitEnquiry);
router.get('/user', protect, getUserEnquiries);
router.get('/admin/all', protect, admin, getAllEnquiries);
router.get('/:id', protect, admin, getEnquiryById);
router.put('/:id/reply', protect, admin, replyEnquiry);

module.exports = router;