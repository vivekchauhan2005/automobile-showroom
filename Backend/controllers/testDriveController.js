const TestDrive = require('../models/TestDrive');
const Vehicle = require('../models/Vehicle');

exports.requestTestDrive = async (req, res) => {
  try {
    const { vehicleId, name, email, phone, date, time, notes } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const testDrive = await TestDrive.create({
      user: req.user ? req.user.id : null,
      vehicle: vehicleId,
      name,
      email,
      phone,
      date,
      time,
      notes,
      status: 'Pending'
    });

    res.status(201).json({ success: true, testDrive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserTestDrives = async (req, res) => {
  try {
    const testDrives = await TestDrive.find({ user: req.user.id })
      .populate('vehicle', 'name brand price images')
      .sort({ createdAt: -1 });
    res.json({ success: true, testDrives });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTestDrives = async (req, res) => {
  try {
    const testDrives = await TestDrive.find()
      .populate('user', 'fullName email')
      .populate('vehicle', 'name brand price')
      .sort({ createdAt: -1 });
    res.json({ success: true, testDrives });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTestDriveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const testDrive = await TestDrive.findById(req.params.id);

    if (!testDrive) {
      return res.status(404).json({ message: 'Test drive not found' });
    }

    testDrive.status = status;
    await testDrive.save();

    res.json({ success: true, testDrive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};