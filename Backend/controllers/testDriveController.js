const TestDrive = require('../models/TestDrive');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

exports.requestTestDrive = async (req, res) => {
  try {
    const { vehicleId, name, email, phone, date, time, notes } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
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

    // If user is logged in, add activity
    if (req.user) {
      const user = await User.findById(req.user.id);
      await user.addActivity(
        'test_drive',
        `Requested test drive for ${vehicle.name}`,
        { 
          vehicle: vehicle.name,
          testDriveId: testDrive._id,
          date: date,
          time: time
        }
      );
    }

    res.status(201).json({ 
      success: true, 
      testDrive 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getUserTestDrives = async (req, res) => {
  try {
    const testDrives = await TestDrive.find({ user: req.user.id })
      .populate('vehicle', 'name brand price images')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: testDrives.length,
      testDrives 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.updateTestDriveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const testDrive = await TestDrive.findById(req.params.id)
      .populate('vehicle', 'name');

    if (!testDrive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Test drive not found' 
      });
    }

    testDrive.status = status;
    await testDrive.save();
 
    if (testDrive.user) {
      const user = await User.findById(testDrive.user);
      if (user) {
        await user.addActivity(
          'test_drive',
          `Test drive status updated to ${status}`,
          { 
            testDriveId: testDrive._id,
            vehicle: testDrive.vehicle.name,
            status: status
          }
        );
      }
    }

    res.json({ 
      success: true, 
      testDrive 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
exports.getAllTestDrives = async (req, res) => {
  try {
    const testDrives = await TestDrive.find()
      .populate("vehicle", "name brand")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: testDrives.length,
      testDrives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};