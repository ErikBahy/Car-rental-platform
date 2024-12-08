const { cloudinary } = require('./config/cloudinary');
const fs = require('fs');
const path = require('path');

async function testCloudinaryUpload() {
  try {
    // Path to a test image
    const imagePath = path.join(__dirname, 'landrover.jpg');
    
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'car-rental-test'
    });
    
    console.log('Upload successful!');
    console.log('Image URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    
    // Test deletion
    await cloudinary.uploader.destroy(result.public_id);
    console.log('Image deleted successfully!');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testCloudinaryUpload();