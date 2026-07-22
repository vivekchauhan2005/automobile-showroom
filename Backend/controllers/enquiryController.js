const Enquiry = require('../models/Enquiry');
const User = require('../models/User');

exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message, vehicleId } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      vehicle: vehicleId || null,
      status: 'New'
    });

    // If user is logged in, add activity
    if (req.user) {
      const user = await User.findById(req.user.id);
      await user.addActivity(
        'enquiry',
        `Submitted enquiry: ${subject}`,
        { 
          enquiryId: enquiry._id,
          subject: subject,
          vehicleId: vehicleId
        }
      );
    }

    res.status(201).json({ 
      success: true, 
      enquiry 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('vehicle', 'name brand')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: enquiries.length,
      enquiries 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};