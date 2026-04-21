const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();
const { spawn } = require('child_process');
const JWT_SECRET = process.env.JWT_SECRET || 'stargazer-secret';
const COZE_API_KEY = process.env.COZE_API_KEY;
const COZE_BOT_ID = process.env.COZE_BOT_ID;
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.json({ code: 401, msg: '未登录' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) { res.json({ code: 401, msg: 'token无效' }); }
};
function calcChart(data) {
  return new Promise((resolve, reject) => {
    const code = `import sys; sys.path.insert(0, '/var/www/stargazer'); from generate_chart import get_planet_positions, get_houses, calc_jd; jd = calc_jd(${data.year}, ${data.month}, ${data.day}, ${data.hour||12}, ${data.minute||0}, 8); import json; print(json.dumps({'positions': get_planet_positions(jd), 'houses': get_houses(jd, 0, 0)}))`;
    const py = spawn('python3', ['-c', code]);
    let result = '';
    py.stdout.on('data', d => result += d);
    py.on('close', code => code === 0 ? resolve(JSON.parse(result)) : reject(new Error('计算失败')));
    py.on('error', reject);
  });
}
function formatChart(data) {
  const signs = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
  const planets = { Sun: '太阳', Moon: '月亮', Mercury: '水星', Venus: '金星', Mars: '火星', Jupiter: '木星', Saturn: '土星', Uranus: '天王星', Neptune: '海王星', Pluto: '冥王星' };
  let text = '\n\n【星盘数据】\n';
  for (const [k, n] of Object.entries(planets)) {
    if (data.positions && data.positions[k] !== undefined) {
      const deg = data.positions[k];
      text += `${n}：${signs[Math.floor(deg/30)%12]} ${Math.round(deg%30)}°\n`;
    }
  }
  if (data.houses) {
    text += `上升点(ASC)：${signs[Math.floor(data.houses.ASC/30)%12]} ${Math.round(data.houses.ASC%30)}°\n`;
    text += `天顶(MC)：${signs[Math.floor(data.houses.MC/30)%12]} ${Math.round(data.houses.MC%30)}°\n`;
  }
  return text;
}
router.post('/consult', auth, async (req, res) => {
  try {
    const { message, birthInfo } = req.body;
    if (!message) return res.json({ code: 400, msg: '消息不能为空' });
    let chartContext = '';
    if (birthInfo && birthInfo.year && birthInfo.month && birthInfo.day) {
      try {
        const chartData = await calcChart(birthInfo);
        chartContext = formatChart(chartData);
      } catch (e) { console.error('星盘计算错误:', e); }
    }
    const fullMessage = birthInfo ? `出生信息：${birthInfo.year}年${birthInfo.month}月${birthInfo.day}日 ${birthInfo.hour||12}:${birthInfo.minute||0}\n${chartContext}\n\n问题：${message}` : message;
    // Coze API v3
    const cozeRes = await axios.post('https://api.coze.cn/v3/chat', {
      bot_id: COZE_BOT_ID,
      user_id: String(req.userId),
      stream: false,
      auto_save_history: true,
      additional_messages: [{ role: 'user', type: 'question', content: fullMessage, content_type: 'text' }]
    }, { headers: { 'Authorization': `Bearer ${COZE_API_KEY}`, 'Content-Type': 'application/json' } });
    // 轮询获取结果
    const chatId = cozeRes.data.data.id;
    const conversationId = cozeRes.data.data.conversation_id;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const statusRes = await axios.get(`https://api.coze.cn/v3/chat/retrieve?chat_id=${chatId}&conversation_id=${conversationId}`, {
        headers: { 'Authorization': `Bearer ${COZE_API_KEY}` }
      });
      if (statusRes.data.data.status === 'completed') {
        const msgRes = await axios.get(`https://api.coze.cn/v3/chat/message/list?chat_id=${chatId}&conversation_id=${conversationId}`, {
          headers: { 'Authorization': `Bearer ${COZE_API_KEY}` }
        });
        const reply = msgRes.data.data.find(m => m.role === 'assistant');
        return res.json({ code: 200, data: { content: reply?.content || '感谢您的提问。' } });
      }
    }
    res.json({ code: 200, data: { content: '咨询处理中，请稍后重试。' } });
  } catch (err) {
    console.error(err.message);
    res.json({ code: 500, msg: '咨询失败: ' + err.message });
  }
});
module.exports = router;

