const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // hashed with bcrypt
  phone: { type: String },
  address: { type: String },
  photoUrl: { type: String },
  role: { type: String, enum: ['customer', 'owner'], default: 'customer' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
