const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Accept only .stl, .step, .stp
const allowedExt = ['.stl', '.step', '.stp'];
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/\s+/g, '_');
    cb(null, `${req.user ? req.user._id : 'anon'}_${ts}_${safe}`);
  }
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExt.includes(ext)) {
    return cb(new Error('Only .stl, .step, .stp files are allowed'), false);
  }
  cb(null, true);
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } }); // max 50MB

module.exports = upload;
