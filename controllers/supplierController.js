const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const suppliers = await Supplier.find().lean();
  res.render('suppliers/index', { suppliers, title: 'Suppliers' });
};

exports.createForm = (req, res) => {
  res.render('suppliers/form', { supplier: {}, title: 'Create Supplier' });
};

exports.create = async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.redirect('/suppliers');
  } catch (err) {
    res.render('suppliers/form', { supplier: req.body, error: err.message, title: 'Create Supplier' });
  }
};

exports.editForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id).lean();
  res.render('suppliers/form', { supplier, title: 'Edit Supplier' });
};

exports.update = async (req, res) => {
  try {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/suppliers');
  } catch (err) {
    const supplier = await Supplier.findById(req.params.id).lean();
    res.render('suppliers/form', { supplier, error: err.message, title: 'Edit Supplier' });
  }
};

exports.remove = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
};
