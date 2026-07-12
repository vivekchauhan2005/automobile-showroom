const Vehicle = require('../models/Vehicle');

 
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 
exports.addVehicle = async (req, res) => {
    const newVehicle = new Vehicle(req.body);
    try {
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};