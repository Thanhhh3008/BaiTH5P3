const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Trang chủ
router.get('/', async (req, res) => {
  const suppliers = await Supplier.find().lean();
  res.render('index', { suppliers, title: 'Home' });
});

module.exports = router;
