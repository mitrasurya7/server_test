const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf||PDF)$/)) {
      return cb(new Error("Only PDF files are allowed!"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
