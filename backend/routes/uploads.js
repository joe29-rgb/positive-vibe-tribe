var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  var uploadStream = cloudinary.uploader.upload_stream(function (error, result) {
    if (error) {
      return next(error);
    }
    res.json({ url: result.secure_url });
  });

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
});

module.exports = router;
