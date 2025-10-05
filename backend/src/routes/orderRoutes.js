const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const { authRequired, ownerRequired } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// create order (customer) -> multipart/form-data
router.post('/', authRequired, upload.single('file'), orderCtrl.createOrder);

// list my orders
router.get('/my', authRequired, orderCtrl.myOrders);

// customer confirm order
router.post('/:id/confirm', authRequired, orderCtrl.confirmOrder);

// owner: list all orders
router.get('/admin', authRequired, ownerRequired, orderCtrl.adminListOrders);

// owner: update order
router.put('/admin/:id', authRequired, ownerRequired, orderCtrl.adminUpdateOrder);

// owner: mark complete
router.post('/admin/:id/complete', authRequired, ownerRequired, orderCtrl.markComplete);

module.exports = router;
