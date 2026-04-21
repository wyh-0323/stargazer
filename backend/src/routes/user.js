const express = require('express');
const router = express.Router();

const users = [
  { id: 1, username: 'test', password: '123456', email: 'test@example.com', name: '测试用户' }
];

router.get('/info', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: '用户ID不能为空' });
  }
  
  const user = users.find(user => user.id == userId);
  
  if (!user) {
    return res.status(404).json({ error: '用户不存在' });
  }
  
  res.json({ 
    success: true, 
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name
    }
  });
});

router.put('/update', (req, res) => {
  const { userId, name, email } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: '用户ID不能为空' });
  }
  
  const user = users.find(user => user.id == userId);
  
  if (!user) {
    return res.status(404).json({ error: '用户不存在' });
  }
  
  if (name) user.name = name;
  if (email) user.email = email;
  
  res.json({ 
    success: true, 
    message: '用户信息更新成功',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name
    }
  });
});

router.post('/booking', (req, res) => {
  const { userId, consultationType, contactInfo, consultationDate, consultationTime, consultationTopic } = req.body;
  
  if (!userId || !consultationType || !contactInfo || !consultationDate || !consultationTime || !consultationTopic) {
    return res.status(400).json({ error: '预约信息不完整' });
  }
  
  console.log('收到预约:', {
    userId,
    consultationType,
    contactInfo,
    consultationDate,
    consultationTime,
    consultationTopic
  });
  
  res.json({ 
    success: true, 
    message: '预约成功！专业占星师将在约定时间与您联系。' 
  });
});

router.get('/bookings', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: '用户ID不能为空' });
  }
  
  const bookings = [
    {
      id: 1,
      consultationType: '60min',
      contactInfo: '13800138000',
      consultationDate: '2024-01-15',
      consultationTime: '14:00',
      consultationTopic: '职业发展',
      status: '已完成',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      consultationType: '30min',
      contactInfo: '13800138000',
      consultationDate: '2024-01-20',
      consultationTime: '10:30',
      consultationTopic: '感情关系',
      status: '待确认',
      createdAt: new Date().toISOString()
    }
  ];
  
  res.json({ 
    success: true, 
    bookings 
  });
});

module.exports = router;