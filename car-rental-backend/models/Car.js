const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  registrationYear: { type: Number, required: true },
  price: { type: Number, required: true },
  isFavourite: { type: Boolean, default: false },
  favouriteImage: {
    url: { type: String, required: function() { return this.isFavourite; } },
    publicId: { type: String, required: function() { return this.isFavourite; } }
  },
  transmission: { type: String, required: true },
  fuelType: { type: String, required: true },
  seating: { type: Number, required: true },
  motorPower: { type: String, required: true },
  features: { type: [String], required: true },
  photos: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  }],
});

module.exports = mongoose.model('Car', CarSchema);
