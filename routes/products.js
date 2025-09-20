const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Danh sách sản phẩm
router.get('/', productController.index);

// Form tạo sản phẩm
router.get('/create', productController.createForm);
router.post('/create', productController.create);

// Form sửa sản phẩm
router.get('/:id/edit', productController.editForm);
router.post('/:id/edit', productController.update);   // 👈 quan trọng

// Xóa sản phẩm
router.get('/:id/delete', productController.remove);

module.exports = router;
