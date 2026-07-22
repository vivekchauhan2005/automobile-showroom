const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { sendWelcomeEmail } = require('../utils/email');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      address,
      role: email === 'admin@luxurymotors.com' ? 'admin' : 'customer'
    });

    // Add registration activity
    await user.addActivity(
      'login',
      'User registered successfully',
      { email: user.email, method: 'email' }
    );

    await sendWelcomeEmail(email, fullName);

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        loginCount: user.loginCount,
        lastLogin: user.lastLogin,
        activities: user.activities.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Update login tracking
    user.lastLogin = new Date();
    user.loginCount += 1;
    await user.addActivity(
      'login',
      'User logged in successfully',
      { email: user.email, loginCount: user.loginCount }
    );
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        loginCount: user.loginCount,
        lastLogin: user.lastLogin,
        activities: user.activities.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.addActivity(
      'logout',
      'User logged out successfully',
      { email: user.email }
    );
    await user.save();

    res.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate({
        path: 'activities',
        options: { sort: { timestamp: -1 }, limit: 10 }
      });

    res.json({ 
      success: true, 
      user: {
        ...user.toObject(),
        recentActivities: user.activities.slice(0, 10)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address, preferences } = req.body;
    const user = await User.findById(req.user.id);

    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;
    if (preferences) updates.preferences = preferences;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    await user.addActivity(
      'profile_update',
      'Profile updated successfully',
      { updatedFields: Object.keys(updates) }
    );
    await user.save();

    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isPasswordMatch = await user.matchPassword(currentPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    user.password = newPassword;
    await user.addActivity(
      'password_change',
      'Password changed successfully',
      { email: user.email }
    );
    await user.save();

    res.json({ 
      success: true, 
      message: 'Password changed successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getUserActivities = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('activities')
      .populate({
        path: 'activities',
        options: { sort: { timestamp: -1 }, limit: 50 }
      });

    res.json({
      success: true,
      activities: user.activities
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const stats = {
      loginCount: user.loginCount,
      lastLogin: user.lastLogin,
      totalActivities: user.activities.length,
      recentActivities: user.activities.slice(0, 5),
      accountAge: Math.floor((Date.now() - user.createdAt) / (1000 * 60 * 60 * 24))
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};