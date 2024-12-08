require('dotenv').config();

console.log('Cloudinary Config:');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET);

const { cloudinary } = require('./config/cloudinary');
console.log('\nCloudinary Config Object:');
console.log(cloudinary.config()); 