const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.get('/register', authCtrl.registerForm);
router.post('/register', authCtrl.register);
router.get('/login', authCtrl.loginForm);
router.post('/login', authCtrl.login);
router.get('/forgot', authCtrl.forgotForm);
router.post('/forgot', authCtrl.forgot);
router.get('/logout', authCtrl.logout);

module.exports = router;
