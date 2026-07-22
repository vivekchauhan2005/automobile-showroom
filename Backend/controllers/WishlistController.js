const Wishlist = require('../models/Wishlist');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

exports.addToWishlist = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }

    const existing = await Wishlist.findOne({
      user: req.user.id,
      vehicle: vehicleId
    });

    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vehicle already in wishlist' 
      });
    }

    const wishlistItem = await Wishlist.create({
      user: req.user.id,
      vehicle: vehicleId
    });

    // Add activity
    const user = await User.findById(req.user.id);
    await user.addActivity(
      'wishlist',
      `Added ${vehicle.name} to wishlist`,
      { 
        vehicleId: vehicleId,
        vehicleName: vehicle.name
      }
    );

    res.status(201).json({ 
      success: true, 
      wishlistItem 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id)
      .populate('vehicle', 'name');

    if (!wishlistItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wishlist item not found' 
      });
    }

    if (wishlistItem.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const vehicleName = wishlistItem.vehicle.name;
    await wishlistItem.deleteOne();

    // Add activity
    const user = await User.findById(req.user.id);
    await user.addActivity(
      'wishlist',
      `Removed ${vehicleName} from wishlist`,
      { vehicleName }
    );

    res.json({ 
      success: true, 
      message: 'Removed from wishlist' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id })
      .populate('vehicle')
      .sort({ addedAt: -1 });
    
    res.json({ 
      success: true, 
      count: wishlist.length,
      wishlist 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};