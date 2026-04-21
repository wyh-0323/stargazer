const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'stargazer-secret';
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.json({ code: 401, msg: '未登录' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) { res.json({ code: 401, msg: 'token无效' }); }
};
router.get('/profile', auth, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM user_profiles WHERE user_id = ?', [req.userId]);
    res.json({ code: 200, data: users[0] || {} });
  } catch (err) { res.json({ code: 500, msg: '服务器错误' }); }
});
router.post('/profile', auth, async (req, res) => {
  try {
    const { name, birth_date, birth_time, city, hour, minute } = req.body;
    await pool.query('INSERT INTO user_profiles (user_id, name, birth_date, birth_time, city) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=?, birth_date=?, birth_time=?, city=?',
      [req.userId, name, birth_date, birth_time, city, name, birth_date, birth_time, city]);
    res.json({ code: 200, msg: '保存成功' });
  } catch (err) { res.json({ code: 500, msg: '保存失败' }); }
});
module.exports = router;

