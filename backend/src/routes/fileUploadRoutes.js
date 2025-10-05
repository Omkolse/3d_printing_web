const express = require('express');
const router = express.Router();
const path = require('path');

// If you're using local storage we already serve /uploads via express.static in server.js.
// This route is optional for extra metadata or checks.
router.get('/ping', (req, res) => res.json({ uploads: true }));

module.exports = router;
