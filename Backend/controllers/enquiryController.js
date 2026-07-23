// Get enquiries of logged-in user
const Enquiry = require("../models/Enquiry");
const User = require("../models/User");

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
      status: "New",
    });

    if (req.user) {
      const user = await User.findById(req.user.id);
      if (user && user.addActivity) {
        await user.addActivity(
          "enquiry",
          `Submitted enquiry: ${subject}`,
          {
            enquiryId: enquiry._id,
            subject,
            vehicleId,
          }
        );
      }
    }

    res.status(201).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("vehicle", "name brand")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUserEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ email: req.user.email })
      .populate("vehicle", "name brand")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get enquiry by ID
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate("vehicle", "name brand");

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reply to enquiry
exports.replyEnquiry = async (req, res) => {
  try {
    const { reply } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    enquiry.reply = reply;
    enquiry.status = "Replied";
    enquiry.repliedAt = new Date();

    await enquiry.save();

    res.json({
      success: true,
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};