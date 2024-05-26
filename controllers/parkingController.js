const Parking = require('../models/Parking');

exports.createParking = async (req, res) => {
    try {
        const newParking = new Parking(req.body);
        await newParking.save();
        res.status(201).json(newParking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getParkings = async (req, res) => {
    try {
        const parkings = await Parking.find();
        res.status(200).json(parkings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
