const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { cloudinary, upload } = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

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
    console.log('Attempting to find car with ID:', req.params.id);
    const car = await Car.findById(req.params.id);
    console.log('Database response:', car);
    
    if (!car) {
      console.log('Car not found');
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
});

// Create a new car
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    console.log('\n--- Request Details ---');
    console.log('Headers:', req.headers);
    console.log('\nFiles received:', req.files ? req.files.length : 0);
    
    // First, validate that we received files
    if (!req.files || req.files.length === 0) {
      throw new Error('At least one image is required');
    }

    // Log each file's details
    req.files.forEach((file, index) => {
      console.log(`\nFile ${index + 1}:`, {
        fieldname: file.fieldname,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      });

      // Verify file exists
      if (!fs.existsSync(file.path)) {
        throw new Error(`File not found at path: ${file.path}`);
      }
    });

    // Parse carData first to validate it
    let carData;
    try {
      carData = typeof req.body.carData === 'string' 
        ? JSON.parse(req.body.carData)
        : req.body.carData;
    } catch (error) {
      throw new Error('Invalid carData format: ' + error.message);
    }

    // Upload images to Cloudinary one by one
    const uploadedImages = [];
    for (const file of req.files) {
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            file.path,
            {
              folder: 'car-rental',
              resource_type: 'auto'
            },
            (error, result) => {
              // Delete the temporary file regardless of success/failure
              fs.unlink(file.path, err => {
                if (err) console.error('Error deleting temp file:', err);
              });

              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                console.log('Cloudinary upload success:', result.secure_url);
                resolve(result);
              }
            }
          );
        });

        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id
        });
      } catch (error) {
        throw new Error(`Failed to upload image ${file.originalname}: ${error.message}`);
      }
    }

    // Create new car with uploaded images
    const car = new Car({
      ...carData,
      photos: uploadedImages,
      favouriteImage: {
        url: uploadedImages[0].url,
        publicId: uploadedImages[0].publicId
      },
      isFavourite: true
    });

    const newCar = await car.save();
    res.status(201).json(newCar);

  } catch (err) {
    console.error('Full error:', err);
    res.status(400).json({ 
      message: err.message,
      details: err.errors ? Object.values(err.errors).map(e => e.message) : null
    });
  }
});

// Update a car
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    console.log('1. Received PUT request for ID:', req.params.id);
    console.log('2. Request body:', req.body);
    
    const car = await Car.findById(req.params.id);
    console.log('3. Found car in database:', car);
    
    if (!car) {
      console.log('Car not found!');
      return res.status(404).json({ message: 'Car not found' });
    }

    // Parse the car data
    const carData = JSON.parse(req.body.carData);
    console.log('4. Parsed car data:', carData);

    // Update fields one by one with logging
    console.log('5. Updating fields...');
    
    car.make = carData.make;
    car.model = carData.model;
    car.registrationYear = carData.registrationYear;
    car.price = carData.price;
    car.transmission = carData.transmission;
    car.fuelType = carData.fuelType;
    car.seating = carData.seating;
    car.motorPower = carData.motorPower;
    car.features = carData.features;

    console.log('6. Updated car object before save:', car);

    // Try saving with error catching
    try {
      const updatedCar = await car.save();
      console.log('7. Save successful. Updated car:', updatedCar);
      res.json(updatedCar);
    } catch (saveError) {
      console.error('Save error:', saveError);
      throw saveError;
    }

  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Delete images from Cloudinary
    const deletePromises = car.photos.map(photo => 
      new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(photo.publicId, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      })
    );

    await Promise.all(deletePromises);
    await car.deleteOne();
    
    res.json({ message: 'Car and associated images deleted successfully' });
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).json({ message: err.message });
  }
});

// Add this test endpoint
router.post('/test-upload', upload.single('image'), async (req, res) => {
  try {
    console.log('Test upload received:', req.file);
    if (!req.file) {
      throw new Error('No file received');
    }
    res.json({ 
      message: 'File received',
      file: {
        originalname: req.file.originalname,
        size: req.file.size,
        path: req.file.path
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
