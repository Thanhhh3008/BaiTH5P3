const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Danh sách
router.get('/', supplierController.index);

// Form tạo
router.get('/create', supplierController.createForm);
router.post('/create', supplierController.create);

// Form sửa
router.get('/:id/edit', supplierController.editForm);
router.post('/:id/edit', supplierController.update); // 👈 cần dòng này

// Xóa
router.get('/:id/delete', supplierController.remove);

module.exports = router;
