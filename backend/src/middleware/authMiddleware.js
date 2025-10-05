const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET not set in .env");
  process.exit(1);
}

async function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Authorization header missing' });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ msg: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token', error: err.message });
  }
}

function ownerRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ msg: 'Auth required' });
  if (req.user.role !== 'owner') return res.status(403).json({ msg: 'Owner access required' });
  next();
}

module.exports = { authRequired, ownerRequired };
