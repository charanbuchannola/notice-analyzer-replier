const cloudinary = require("cloudinary").v2;
// const { url } = require("inspector");
const { Readable } = require("stream");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "stackwave", resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.url,
            public_id: result.public_id,
            asset_id: result.asset_id,
            format: result.format,
          });
        }
      }
    );

    const fileStream = new Readable();
    fileStream.push(imageBuffer);
    fileStream.push(null);

    fileStream.pipe(stream);
  });
};

module.exports = { uploadImage };
