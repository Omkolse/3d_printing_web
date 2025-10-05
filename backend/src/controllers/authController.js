const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
const OWNER_EMAIL = (process.env.OWNER_EMAIL || '').toLowerCase();

function signToken(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
  try {
    const { email, password, name, phone, address, photoUrl } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'email and password are required' });

    const normalized = email.toLowerCase();
    const existing = await User.findOne({ email: normalized });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const role = (normalized === OWNER_EMAIL) ? 'owner' : 'customer';

    const user = new User({ email: normalized, password: hashed, name, phone, address, photoUrl, role });
    await user.save();

    const token = signToken(user);
    res.status(201).json({ accessToken: token, role: user.role, email: user.email });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalized = (email || '').toLowerCase();
    const user = await User.findOne({ email: normalized });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: 'Invalid credentials' });

    // if owner email changed in .env, enforce role
    if (normalized === OWNER_EMAIL && user.role !== 'owner') {
      user.role = 'owner';
      await user.save();
    }

    const token = signToken(user);
    res.json({ accessToken: token, role: user.role, email: user.email });
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.me = async (req, res) => {
  const u = req.user;
  res.json({
    id: u._id,
    email: u.email,
    name: u.name,
    phone: u.phone,
    address: u.address,
    photoUrl: u.photoUrl,
    role: u.role
  });
};
