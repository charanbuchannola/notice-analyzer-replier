const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, 
});


const uploadToCloudinary = (fileBuffer, originalFilename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw', // For non-image files like PDF
        public_id: `tax_notices/${Date.now()}-${originalFilename.replace(/\s+/g, '_')}`, // Optional: set a public_id or let Cloudinary generate
        // folder: "tax_notices", // You can organize uploads into folders
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

module.exports = { cloudinary, uploadToCloudinary };