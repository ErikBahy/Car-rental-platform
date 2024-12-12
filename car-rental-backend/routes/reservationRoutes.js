const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Car = require('../models/Car');

// Move the available-cars route BEFORE any :id routes
router.get('/available-cars', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start and end dates are required' });
    }

    // Find all cars that don't have conflicting reservations
    const cars = await Car.find();
    const availableCars = [];

    for (const car of cars) {
      const conflicts = await Reservation.find({
        carId: car._id,
        status: { $in: ['pending', 'confirmed'] },
        $or: [
          {
            pickupDate: { $lte: new Date(endDate) },
            dropoffDate: { $gte: new Date(startDate) }
          }
        ]
      });

      if (conflicts.length === 0) {
        availableCars.push(car);
      }
    }

    res.json(availableCars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('carId')
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific reservation
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('carId');
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  try {
    // Check if car exists
    const car = await Car.findById(req.body.carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check for conflicting reservations
    const conflictingReservation = await Reservation.findOne({
      carId: req.body.carId,
      status: { $ne: 'cancelled' }, // Ignore cancelled reservations
      $or: [
        {
          pickupDate: { $lte: new Date(req.body.dropoffDate) },
          dropoffDate: { $gte: new Date(req.body.pickupDate) }
        }
      ]
    });

    if (conflictingReservation) {
      return res.status(400).json({ 
        message: 'Car is not available for the selected dates' 
      });
    }

    const reservation = new Reservation({
      carId: req.body.carId,
      customer: req.body.customer,
      pickupDate: new Date(req.body.pickupDate),
      dropoffDate: new Date(req.body.dropoffDate)
    });

    const newReservation = await reservation.save();
    await newReservation.populate('carId');
    
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a reservation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('carId');

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get reservations for a specific car
router.get('/car/:carId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ 
      carId: req.params.carId,
      status: { $ne: 'cancelled' }
    }).populate('carId');
    
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check car availability for given dates
router.get('/check-availability/:carId', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const conflicts = await Reservation.find({
      carId: req.params.carId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          pickupDate: { $lte: new Date(endDate) },
          dropoffDate: { $gte: new Date(startDate) }
        }
      ]
    });

    res.json({ 
      available: conflicts.length === 0,
      conflictingReservations: conflicts 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 