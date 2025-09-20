const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const filter = {};
  if (req.query.q) filter.name = new RegExp(req.query.q, 'i');
  if (req.query.supplier) filter.supplier = req.query.supplier; // 👈 dùng đúng field

  const products = await Product.find(filter).populate('supplier').lean(); // 👈 populate supplier
  res.render('products/index', { products, title: 'Products' });
};

exports.createForm = async (req, res) => {
  const suppliers = await Supplier.find().lean();
  res.render('products/form', { product: {}, suppliers, title: 'Create Product' });
};

// exports.create = async (req, res) => {
//   try {
//     await Product.create(req.body);
//     res.redirect('/products');
//   } catch (err) {
//     const suppliers = await Supplier.find().lean();
//     res.render('products/form', { product: req.body, suppliers, error: err.message, title: 'Create Product' });
//   }
// };

exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  const suppliers = await Supplier.find().lean();
  res.render('products/form', { product, suppliers, title: 'Edit Product' });
};

// exports.update = async (req, res) => {
//   try {
//     await Product.findByIdAndUpdate(req.params.id, req.body);
//     res.redirect('/products');
//   } catch (err) {
//     const suppliers = await Supplier.find().lean();
//     res.render('products/form', { product: { ...req.body, _id: req.params.id }, suppliers, error: err.message, title: 'Edit Product' });
//   }
// };
exports.create = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body; // lấy dữ liệu form
    await Product.create({ name, price, quantity, supplier }); // map chính xác field supplier
    res.redirect('/products');
  } catch (err) {
    console.error("❌ Product create error:", err.message);
    const suppliers = await Supplier.find().lean();
    res.render('products/form', { 
      product: req.body, 
      suppliers, 
      error: err.message, 
      title: 'Create Product' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
    res.redirect('/products');
  } catch (err) {
    console.error("❌ Product update error:", err.message);
    const suppliers = await Supplier.find().lean();
    res.render('products/form', { 
      product: { _id: req.params.id, ...req.body }, 
      suppliers, 
      error: err.message, 
      title: 'Edit Product' 
    });
  }
};

exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
