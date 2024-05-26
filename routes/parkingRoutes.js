const express = require('express');
const router = express.Router();
const { createParking, getParkings } = require('../controllers/parkingController');

router.post('/', createParking);
router.get('/', getParkings);

module.exports = router;
