const User = require('../models/User');
const bcrypt = require('bcrypt');
const session = require('express-session');

exports.registerForm = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, phone, password: hashed });
    res.redirect('/auth/login');
  } catch (err) {
    res.render('auth/register', { error: err.message, title: 'Register' });
  }
};

exports.loginForm = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.render('auth/login', { error: 'User not found', title: 'Login' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.render('auth/login', { error: 'Invalid password', title: 'Login' });

    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    res.render('auth/login', { error: err.message, title: 'Login' });
  }
};

exports.forgotForm = (req, res) => {
  res.render('auth/forgot', { title: 'Forgot Password' });
};

exports.forgot = async (req, res) => {
  // Demo: chỉ hiển thị message
  res.render('auth/forgot', { success: 'Reset link sent to your email!', title: 'Forgot Password' });
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
};
