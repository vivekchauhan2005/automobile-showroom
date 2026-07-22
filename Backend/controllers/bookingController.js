const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, bookingTime, amount, notes } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      vehicle: vehicleId,
      bookingTime,
      amount,
      notes,
      status: 'Pending'
    });

    // Add activity to user
    const user = await User.findById(req.user.id);
    await user.addActivity(
      'booking',
      `Booked ${vehicle.name}`,
      { 
        vehicle: vehicle.name,
        bookingId: booking._id,
        amount: amount,
        status: 'Pending'
      }
    );

    res.status(201).json({ 
      success: true, 
      booking: {
        ...booking.toObject(),
        vehicle: vehicle
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('vehicle', 'name brand price images')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: bookings.length,
      bookings 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'fullName email phone')
      .populate('vehicle', 'name brand price images description');
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    res.json({ 
      success: true, 
      booking 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id)
      .populate('vehicle', 'name');

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    booking.status = status;
    await booking.save();

    // Add activity to user
    const user = await User.findById(booking.user);
    await user.addActivity(
      'booking',
      `Booking status updated to ${status}`,
      { 
        bookingId: booking._id,
        vehicle: booking.vehicle.name,
        status: status
      }
    );

    res.json({ 
      success: true, 
      booking 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('vehicle', 'name');

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    booking.status = 'Cancelled';
    await booking.save();

    // Add activity to user
    const user = await User.findById(req.user.id);
    await user.addActivity(
      'booking',
      `Cancelled booking for ${booking.vehicle.name}`,
      { 
        bookingId: booking._id,
        vehicle: booking.vehicle.name
      }
    );

    res.json({ 
      success: true, 
      message: 'Booking cancelled successfully',
      booking 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'fullName email')
      .populate('vehicle', 'name brand price')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: bookings.length,
      bookings 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};