const express = require('express');
const router = express.Router();
const { 
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getFeaturedVehicles,
  getBrands
} = require('../controllers/vehicleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAllVehicles);
router.get('/featured', getFeaturedVehicles);
router.get('/brands', getBrands);
router.get('/:id', getVehicleById);
router.post('/', protect, admin, createVehicle);
router.put('/:id', protect, admin, updateVehicle);
router.delete('/:id', protect, admin, deleteVehicle);

module.exports = router;