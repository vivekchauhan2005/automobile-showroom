const express = require('express');
const router = express.Router();
const { 
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, admin, updateBookingStatus);
router.get('/admin/all', protect, admin, getAllBookings);

module.exports = router;