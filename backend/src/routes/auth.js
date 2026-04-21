const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'stargazer-secret';
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    res.json({ code: 200, msg: '注册成功' });
  } catch (err) { res.json({ code: 400, msg: '用户名已存在' }); }
});
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await pool.query('SELECT id FROM users WHERE username = ? AND password = ?', [username, password]);
    if (users.length === 0) return res.json({ code: 401, msg: '用户名或密码错误' });
    const token = jwt.sign({ userId: users[0].id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ code: 200, msg: '登录成功', token, userId: users[0].id });
  } catch (err) { res.json({ code: 500, msg: '服务器错误' }); }
});
module.exports = router;

