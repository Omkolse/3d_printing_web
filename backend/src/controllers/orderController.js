const Order = require('../models/Order');
const { sendEmail } = require('../utils/email');
const path = require('path');

exports.createOrder = async (req, res) => {
  try {
    const user = req.user;
    if (!req.file) return res.status(400).json({ msg: 'file required' });

    const { material, color, infill, quantity, deliveryOption } = req.body;
    const filename = req.file.filename;
    const filePath = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

    const order = new Order({
      customerId: user._id,
      customerName: user.name || '',
      customerEmail: user.email,
      filePath,
      filename,
      material,
      color,
      infill: Number(infill || 0),
      quantity: Number(quantity || 1),
      deliveryOption,
      status: 'submitted'
    });
    await order.save();

    // notify owner
    const ownerEmail = process.env.OWNER_EMAIL;
    if (ownerEmail) {
      const subject = `New 3D print order #${order._id}`;
      const body = `New order submitted by ${user.email}\nOrder ID: ${order._id}\nMaterial: ${material}\nQuantity: ${order.quantity}\nDownload: ${filePath}`;
      await sendEmail(ownerEmail, subject, body);
    }

    res.status(201).json({ msg: 'order submitted', orderId: order._id });
  } catch (err) {
    console.error('createOrder error', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.myOrders = async (req, res) => {
  try {
    const user = req.user;
    const orders = await Order.find({ customerId: user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('myOrders', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.adminListOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('adminListOrders', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.adminUpdateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    if (data.priceEstimate !== undefined) order.priceEstimate = Number(data.priceEstimate);
    if (data.timeEstimateHours !== undefined) order.timeEstimateHours = Number(data.timeEstimateHours);
    if (data.status) order.status = data.status;
    if (data.ownerNotes !== undefined) order.ownerNotes = data.ownerNotes;

    await order.save();

    if (data.notify !== false) {
      const subj = `Update on your 3D print order #${order._id}`;
      const body = `Hello ${order.customerName || order.customerEmail},\n\nYour order (ID ${order._id}) has an update:\nStatus: ${order.status}\nPrice estimate: ${order.priceEstimate || 'N/A'}\nTime estimate (hrs): ${order.timeEstimateHours || 'N/A'}\nNotes: ${order.ownerNotes || 'none'}`;
      await sendEmail(order.customerEmail, subj, body);
    }

    res.json({ msg: 'order updated' });
  } catch (err) {
    console.error('adminUpdateOrder', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.confirmOrder = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    if (order.customerId.toString() !== user._id.toString()) return res.status(403).json({ msg: 'Access denied' });
    if (order.status !== 'quoted') return res.status(400).json({ msg: 'Order not ready to confirm' });

    order.status = 'confirmed';
    await order.save();

    await sendEmail(process.env.OWNER_EMAIL, `Order #${order._id} confirmed by customer`, `Order #${order._id} confirmed by ${user.email}`);
    await sendEmail(order.customerEmail, `Order #${order._id} confirmed`, `Your order #${order._id} is confirmed. We'll proceed to printing.`);

    res.json({ msg: 'order confirmed' });
  } catch (err) {
    console.error('confirmOrder', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = 'completed';
    await order.save();

    await sendEmail(order.customerEmail, `Order #${order._id} completed`, `Your order #${order._id} is complete. Thank you!`);
    res.json({ msg: 'order marked complete' });
  } catch (err) {
    console.error('markComplete', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
