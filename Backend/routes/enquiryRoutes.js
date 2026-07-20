const express = require('express');
const router = express.Router();
const { 
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  replyEnquiry
} = require('../controllers/enquiryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', submitEnquiry);
router.get('/admin/all', protect, admin, getAllEnquiries);
router.get('/:id', protect, admin, getEnquiryById);
router.put('/:id/reply', protect, admin, replyEnquiry);

module.exports = router;