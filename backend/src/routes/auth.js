const express = require('express');
const router = express.Router();

const users = [
  { id: 1, username: 'test', password: '123456', email: 'test@example.com' }
];

router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: '用户名已存在' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    password,
    email
  };
  
  users.push(newUser);
  
  res.json({ 
    success: true, 
    message: '注册成功',
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(user => user.username === username && user.password === password);
  
  if (!user) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }
  
  res.json({ 
    success: true, 
    message: '登录成功',
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
});

module.exports = router;