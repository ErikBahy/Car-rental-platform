const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

const ReservationSchema = new mongoose.Schema({
  // Reference to the Car model (One-to-Many)
  carId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Car',
    required: true 
  },
  
  // Embedded customer details (One-to-One)
  customer: { 
    type: CustomerSchema, 
    required: true 
  },
  
  // Reservation dates
  pickupDate: { 
    type: Date, 
    required: true 
  },
  dropoffDate: { 
    type: Date, 
    required: true 
  },
  
  // Reservation status
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Timestamps for when the reservation was created/updated
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add index for better query performance
ReservationSchema.index({ carId: 1, pickupDate: 1, dropoffDate: 1 });

module.exports = mongoose.model('Reservation', ReservationSchema); 