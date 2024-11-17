const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new car
router.post('/', async (req, res) => {
  const car = new Car({
    make: req.body.make,
    model: req.body.model,
    registrationYear: req.body.registrationYear,
    price: req.body.price,
    isFavourite: req.body.isFavourite || false,
    favouriteImage: req.body.isFavourite ? req.body.favouriteImage : null,
    transmission: req.body.transmission,
    fuelType: req.body.fuelType,
    seating: req.body.seating,
    motorPower: req.body.motorPower,
    features: req.body.features,
    photos: req.body.photos,
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a car
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.make = req.body.make != null ? req.body.make : car.make;
    car.model = req.body.model != null ? req.body.model : car.model;
    car.registrationYear = req.body.registrationYear != null ? req.body.registrationYear : car.registrationYear;
    car.price = req.body.price != null ? req.body.price : car.price;
    car.isFavourite = req.body.isFavourite != null ? req.body.isFavourite : car.isFavourite;
    car.favouriteImage = req.body.isFavourite ? req.body.favouriteImage : car.favouriteImage;
    car.transmission = req.body.transmission != null ? req.body.transmission : car.transmission;
    car.fuelType = req.body.fuelType != null ? req.body.fuelType : car.fuelType;
    car.seating = req.body.seating != null ? req.body.seating : car.seating;
    car.motorPower = req.body.motorPower != null ? req.body.motorPower : car.motorPower;
    car.features = req.body.features != null ? req.body.features : car.features;
    car.photos = req.body.photos != null ? req.body.photos : car.photos;

    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await car.deleteOne(); // Use deleteOne to delete the car
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
