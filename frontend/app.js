let userInfo = {};
let chatHistory = [];
let currentChart = null;

function generateChart() {
  const birthDate = document.getElementById('birthDate').value;
  const birthTime = document.getElementById('birthTime').value;
  const birthProvince = document.getElementById('birthProvince').value;
  const birthCity = document.getElementById('birthCity').value;
  const birthDistrict = document.getElementById('birthDistrict').value;
  const chartType = document.getElementById('chartType').value;
  const transitDate = document.getElementById('transitDate').value;
  
  if (!birthDate || !birthTime || !birthProvince || !birthCity) {
    alert('请填写完整的出生信息');
    return;
  }
  
  document.getElementById('chartLoading').style.display = 'block';
  document.getElementById('chartImage').style.display = 'none';
  document.getElementById('chartError').style.display = 'none';
  
  userInfo = {
    birthDate,
    birthTime,
    birthProvince,
    birthCity,
    birthDistrict,
    chartType,
    transitDate
  };
  
  setTimeout(() => {
    const chartUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=astrological%20birth%20chart%20with%20planets%20and%20houses&image_size=square_hd`;
    
    document.getElementById('chartImage').src = chartUrl;
    document.getElementById('chartImage').style.display = 'block';
    document.getElementById('chartLoading').style.display = 'none';
    
    currentChart = {
      type: chartType,
      url: chartUrl,
      generatedAt: new Date().toISOString()
    };
    
    sendMessage('请为我解读这个星盘');
  }, 2000);
}

function sendMessage(message = null) {
  const chatInput = document.getElementById('chatInput');
  const chatContainer = document.getElementById('chatContainer');
  
  const userMessage = message || chatInput.value.trim();
  if (!userMessage) return;
  
  if (!message) chatInput.value = '';
  
  const userMessageElement = document.createElement('div');
  userMessageElement.className = 'message user-message';
  userMessageElement.textContent = userMessage;
  chatContainer.appendChild(userMessageElement);
  
  chatHistory.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date().toISOString()
  });
  
  chatContainer.scrollTop = chatContainer.scrollHeight;
  
  const typingElement = document.createElement('div');
  typingElement.className = 'message ai-message';
  typingElement.id = 'ai-typing';
  typingElement.textContent = '正在思考...';
  chatContainer.appendChild(typingElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  
  setTimeout(() => {
    document.getElementById('ai-typing').remove();
    
    const aiResponse = generateAIResponse(userMessage);
    
    const aiMessageElement = document.createElement('div');
    aiMessageElement.className = 'message ai-message';
    aiMessageElement.innerHTML = aiResponse;
    chatContainer.appendChild(aiMessageElement);
    
    chatHistory.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString()
    });
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 1500);
}

function generateAIResponse(userMessage) {
  const responses = [
    "根据你的星盘，我看到你是一个充满创造力和热情的人。太阳落在狮子座，给你带来了领导力和自信。",
    "你的月亮在巨蟹座，这意味着你情感丰富，重视家庭和安全感。",
    "水星在处女座，说明你思维敏捷，注重细节，善于分析问题。",
    "金星在天秤座，你追求和谐与平衡，在人际关系中注重公平与美感。",
    "火星在白羊座，你充满活力，行动迅速，但有时可能会有些冲动。",
    "木星在射手座，你喜欢探索和学习，对哲学和宗教有浓厚的兴趣。",
    "土星在摩羯座，你有责任感和毅力，能够通过努力实现自己的目标。",
    "天王星在水瓶座，你思想开放，喜欢创新和变革。",
    "海王星在双鱼座，你富有想象力和直觉，可能对艺术和神秘学有兴趣。",
    "冥王星在天蝎座，你有强烈的意志力和洞察力，能够深刻理解事物的本质。",
    "你的上升星座是双子座，给你带来了灵活的思维和良好的沟通能力。",
    "根据当前的行运，水星即将进入你的事业宫，这可能会带来新的工作机会。",
    "金星与木星形成和谐相位，这是一个有利于人际关系和财务的时期。",
    "火星与土星形成紧张相位，你可能会遇到一些挑战，但这也是成长的机会。",
    "你的星盘中有大三角格局，这表明你在某些领域有特别的天赋和优势。",
    "我注意到你的问题比较复杂，可能需要专业占星师的深度解读。建议你预约专业咨询获取更详细的分析。",
    "你的星盘显示你在未来几个月可能会有重要的人生转变，这是一个自我成长的好时机。",
    "根据你的星盘，你适合从事需要创造力和表达能力的工作，如艺术、教育或传媒。",
    "你的人际关系宫位显示你在感情方面可能会有新的发展，保持开放的心态。",
    "财务方面，你的星盘显示近期可能会有意外的收入，但也需要注意合理规划。"
  ];
  
  const randomIndex = Math.floor(Math.random() * responses.length);
  let response = responses[randomIndex];
  
  if (currentChart) {
    response += `<br><br>参考星盘：<br><img src="${currentChart.url}" style="max-width: 100%; border-radius: 8px; margin-top: 10px;">`;
  }
  
  return response;
}

function submitFeedback(type) {
  const feedbackBtns = document.querySelectorAll('.feedback-btn');
  feedbackBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  console.log('Feedback submitted:', type);
  
  setTimeout(() => {
    alert('感谢您的反馈！您的意见将帮助我们改进AI的解读能力。');
  }, 500);
}

function showPayment() {
  document.getElementById('paymentModal').style.display = 'flex';
}

function closePayment() {
  document.getElementById('paymentModal').style.display = 'none';
}

function processPayment() {
  const consultationType = document.getElementById('consultationType').value;
  const contactInfo = document.getElementById('contactInfo').value;
  const consultationDate = document.getElementById('consultationDate').value;
  const consultationTime = document.getElementById('consultationTime').value;
  const consultationTopic = document.getElementById('consultationTopic').value;
  
  if (!contactInfo || !consultationDate || !consultationTime || !consultationTopic) {
    alert('请填写完整的预约信息');
    return;
  }
  
  console.log('Payment processing:', {
    consultationType,
    contactInfo,
    consultationDate,
    consultationTime,
    consultationTopic
  });
  
  setTimeout(() => {
    alert('预约成功！专业占星师将在约定时间与您联系。');
    closePayment();
  }, 1500);
}

function saveChatHistory() {
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  localStorage.setItem('currentChart', JSON.stringify(currentChart));
}

function loadChatHistory() {
  const savedHistory = localStorage.getItem('chatHistory');
  const savedUserInfo = localStorage.getItem('userInfo');
  const savedChart = localStorage.getItem('currentChart');
  
  if (savedHistory) chatHistory = JSON.parse(savedHistory);
  if (savedUserInfo) userInfo = JSON.parse(savedUserInfo);
  if (savedChart) currentChart = JSON.parse(savedChart);
  
  if (chatHistory.length > 0) {
    const chatContainer = document.getElementById('chatContainer');
    chatHistory.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.className = `message ${message.role === 'user' ? 'user-message' : 'ai-message'}`;
      messageElement.innerHTML = message.content;
      chatContainer.appendChild(messageElement);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  if (userInfo.birthDate) {
    document.getElementById('birthDate').value = userInfo.birthDate;
    document.getElementById('birthTime').value = userInfo.birthTime;
    document.getElementById('birthProvince').value = userInfo.birthProvince;
    document.getElementById('birthCity').value = userInfo.birthCity;
    document.getElementById('birthDistrict').value = userInfo.birthDistrict;
    document.getElementById('chartType').value = userInfo.chartType;
    if (userInfo.transitDate) {
      document.getElementById('transitDate').value = userInfo.transitDate;
    }
  }
  
  if (currentChart) {
    document.getElementById('chartImage').src = currentChart.url;
    document.getElementById('chartImage').style.display = 'block';
  }
}

setInterval(saveChatHistory, 5000);

window.onload = function() {
  if (typeof initProvinces === 'function') {
    initProvinces();
  }
  
  loadChatHistory();
  
  if (chatHistory.length === 0) {
    const chatContainer = document.getElementById('chatContainer');
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'message ai-message';
    welcomeMessage.innerHTML = '欢迎使用 Stargazer 占星师！请输入您的出生信息并生成星盘，然后我将为您提供专业的占星解读。';
    chatContainer.appendChild(welcomeMessage);
  }
};