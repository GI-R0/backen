const multer = require('multer');
const { cloudinary } = require('../utils/cloudinary');

const storage = multer.diskStorage({});
const upload = multer({ storage });

module.exports = upload;
