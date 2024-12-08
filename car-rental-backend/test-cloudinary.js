require('dotenv').config();
const { cloudinary } = require('./config/cloudinary');
const path = require('path');

async function testCloudinaryUpload() {
  try {
    console.log('Starting upload test...');
    
    // Test image path (make sure this image exists)
    const imagePath = path.join(__dirname, 'landrover.jpg');
    
    console.log('Attempting to upload:', imagePath);
    
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'car-rental-test',
      resource_type: 'auto'
    });
    
    console.log('\nUpload successful! ✅');
    console.log('Image URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    
  } catch (error) {
    console.error('Upload failed! ❌');
    console.error('Error:', error.message);
    console.error('Full error:', error);
  }
}

testCloudinaryUpload(); 