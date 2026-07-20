const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');
const TestDrive = require('../models/TestDrive');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalBookings = await Booking.countDocuments();
    const totalEnquiries = await Enquiry.countDocuments();
    const totalTestDrives = await TestDrive.countDocuments();

    const recentBookings = await Booking.find()
      .populate('user', 'fullName')
      .populate('vehicle', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalVehicles,
        totalCustomers,
        totalBookings,
        totalEnquiries,
        totalTestDrives
      },
      recentBookings,
      recentEnquiries
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRevenueStats = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $match: { status: 'Completed' }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalRevenue: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};