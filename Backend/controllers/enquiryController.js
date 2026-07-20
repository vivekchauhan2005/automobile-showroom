const Enquiry = require('../models/Enquiry');

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

    res.status(201).json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('vehicle', 'name brand')
      .sort({ createdAt: -1 });
    res.json({ success: true, enquiries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('vehicle', 'name brand');
    
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.replyEnquiry = async (req, res) => {
  try {
    const { reply } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    enquiry.reply = reply;
    enquiry.status = 'Replied';
    enquiry.repliedAt = new Date();
    await enquiry.save();

    res.json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};