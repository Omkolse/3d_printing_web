const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String },
  customerEmail: { type: String },
  filePath: { type: String }, // local path or S3 URL
  filename: { type: String },
  material: { type: String },
  color: { type: String },
  infill: { type: Number },
  quantity: { type: Number, default: 1 },
  deliveryOption: { type: String },
  status: { 
    type: String,
    enum: ['submitted','quoted','confirmed','printing','shipped','completed','cancelled'],
    default: 'submitted'
  },
  priceEstimate: { type: Number },
  timeEstimateHours: { type: Number },
  ownerNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
