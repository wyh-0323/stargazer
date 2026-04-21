const express = require('express');
const router = express.Router();
const astrologyKnowledge = require('../astrologyKnowledge');

function generateAIResponse(userMessage, userInfo) {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('星盘') || lowerMessage.includes('解读') || lowerMessage.includes('占星')) {
    return generateAstrologyResponse(userInfo);
  }
  
  if (lowerMessage.includes('太阳')) {
    return astrologyKnowledge.planets.sun.description + ' ' + astrologyKnowledge.planets.sun.signs.leo;
  }
  if (lowerMessage.includes('月亮')) {
    return astrologyKnowledge.planets.moon.description + ' ' + astrologyKnowledge.planets.moon.signs.cancer;
  }
  if (lowerMessage.includes('水星')) {
    return astrologyKnowledge.planets.mercury.description + ' ' + astrologyKnowledge.planets.mercury.signs.gemini;
  }
  if (lowerMessage.includes('金星')) {
    return astrologyKnowledge.planets.venus.description + ' ' + astrologyKnowledge.planets.venus.signs.libra;
  }
  if (lowerMessage.includes('火星')) {
    return astrologyKnowledge.planets.mars.description + ' ' + astrologyKnowledge.planets.mars.signs.aries;
  }
  
  if (lowerMessage.includes('宫位')) {
    return '宫位代表了人生的不同领域。例如，第一宫代表自我和个性，第二宫代表财富和价值观，第三宫代表沟通和学习，第四宫代表家庭和根源，第五宫代表创造力和爱情，第六宫代表工作和健康，第七宫代表关系和婚姻，第八宫代表深度和转化，第九宫代表哲学和高等教育，第十宫代表事业和声誉，第十一宫代表朋友和团体，第十二宫代表潜意识和灵性。';
  }
  
  if (lowerMessage.includes('相位')) {
    return '相位是行星之间的角度关系，影响着能量的相互作用。合相（0度）代表能量融合，六分相（60度）代表和谐支持，四分相（90度）代表挑战成长，三分相（120度）代表天赋优势，对分相（180度）代表对立平衡。';
  }
  
  if (lowerMessage.includes('复杂') || lowerMessage.includes('深度') || lowerMessage.includes('详细') || lowerMessage.includes('一对一')) {
    return '我注意到你的问题比较复杂，可能需要专业占星师的深度解读。建议你预约专业咨询获取更详细的分析。';
  }
  
  const defaultResponses = [
    "欢迎使用 Stargazer 占星师！请提供你的出生信息，我将为你生成星盘并解读。",
    "你想了解星盘中的哪个方面？例如：行星、宫位、相位或综合解读。",
    "星盘是了解自我和人生方向的有力工具，它可以帮助你理解自己的天赋、挑战和成长机会。",
    "不同的行星在星盘中代表不同的能量和特质，它们的位置和相位会影响你的性格和人生经历。",
    "宫位代表了人生的不同领域，从自我认同到人际关系，从事业到灵性成长。"
  ];
  
  const randomIndex = Math.floor(Math.random() * defaultResponses.length);
  return defaultResponses[randomIndex];
}

function generateAstrologyResponse(userInfo) {
  const mockChart = {
    sun: { sign: 'leo', house: 5 },
    moon: { sign: 'cancer', house: 4 },
    mercury: { sign: 'virgo', house: 6 },
    venus: { sign: 'libra', house: 7 },
    mars: { sign: 'aries', house: 1 },
    jupiter: { sign: 'sagittarius', house: 9 },
    saturn: { sign: 'capricorn', house: 10 },
    uranus: { sign: 'aquarius', house: 11 },
    neptune: { sign: 'pisces', house: 12 },
    pluto: { sign: 'scorpio', house: 8 },
    ascendant: 'gemini',
    aspects: [
      { planet1: 'sun', planet2: 'moon', aspect: 'trine' },
      { planet1: 'mercury', planet2: 'venus', aspect: 'sextile' },
      { planet1: 'mars', planet2: 'saturn', aspect: 'square' }
    ]
  };
  
  let response = '根据你的星盘，我看到了以下关键信息：\n\n';
  
  response += `上升星座：${astrologyKnowledge.ascendant[mockChart.ascendant]}\n\n`;
  
  response += `太阳在${astrologyKnowledge.planets.sun.signs[mockChart.sun.sign]}，位于第${mockChart.sun.house}宫（${astrologyKnowledge.houses[mockChart.sun.house].name}）。${astrologyKnowledge.interpretationRules.planetInHouse('sun', mockChart.sun.house)}\n\n`;
  
  response += `月亮在${astrologyKnowledge.planets.moon.signs[mockChart.moon.sign]}，位于第${mockChart.moon.house}宫（${astrologyKnowledge.houses[mockChart.moon.house].name}）。${astrologyKnowledge.interpretationRules.planetInHouse('moon', mockChart.moon.house)}\n\n`;
  
  response += `水星在${astrologyKnowledge.planets.mercury.signs[mockChart.mercury.sign]}，位于第${mockChart.mercury.house}宫（${astrologyKnowledge.houses[mockChart.mercury.house].name}）。${astrologyKnowledge.interpretationRules.planetInHouse('mercury', mockChart.mercury.house)}\n\n`;
  
  response += `金星在${astrologyKnowledge.planets.venus.signs[mockChart.venus.sign]}，位于第${mockChart.venus.house}宫（${astrologyKnowledge.houses[mockChart.venus.house].name}）。${astrologyKnowledge.interpretationRules.planetInHouse('venus', mockChart.venus.house)}\n\n`;
  
  response += `火星在${astrologyKnowledge.planets.mars.signs[mockChart.mars.sign]}，位于第${mockChart.mars.house}宫（${astrologyKnowledge.houses[mockChart.mars.house].name}）。${astrologyKnowledge.interpretationRules.planetInHouse('mars', mockChart.mars.house)}\n\n`;
  
  response += '重要相位：\n';
  mockChart.aspects.forEach(aspect => {
    response += `- ${astrologyKnowledge.interpretationRules.planetAspect(aspect.planet1, aspect.planet2, aspect.aspect)}\n`;
  });
  
  response += '\n总结：你的星盘显示你是一个充满创造力和热情的人，重视家庭和安全感，思维敏捷，注重细节，在人际关系中追求和谐与平衡。你充满活力，行动迅速，但有时可能会有些冲动。你喜欢探索和学习，对哲学和宗教有浓厚的兴趣，有责任感和毅力，能够通过努力实现自己的目标。思想开放，喜欢创新和变革，富有想象力和直觉，可能对艺术和神秘学有兴趣。有强烈的意志力和洞察力，能够深刻理解事物的本质。';
  
  return response;
}

router.post('/send', (req, res) => {
  const { message, userInfo } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: '消息不能为空' });
  }
  
  const aiResponse = generateAIResponse(message, userInfo);
  
  res.json({ 
    success: true, 
    message: aiResponse 
  });
});

router.post('/feedback', (req, res) => {
  const { messageId, feedback } = req.body;
  
  if (!messageId || !feedback) {
    return res.status(400).json({ error: '反馈信息不完整' });
  }
  
  console.log('收到反馈:', { messageId, feedback });
  
  res.json({ 
    success: true, 
    message: '反馈已收到，感谢您的意见！' 
  });
});

router.get('/history', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: '用户ID不能为空' });
  }
  
  const chatHistory = [
    { role: 'user', content: '你好，能帮我解读一下星盘吗？', timestamp: new Date().toISOString() },
    { role: 'assistant', content: '当然可以！请提供你的出生信息，我将为你生成星盘并解读。', timestamp: new Date().toISOString() }
  ];
  
  res.json({ 
    success: true, 
    history: chatHistory 
  });
});

module.exports = router;