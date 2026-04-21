let token = localStorage.getItem('token');
let userId = localStorage.getItem('userId');
let selectedGender = 0;

if (token) showApp();

// 初始化省份选择器
function initProvinces() {
  const provinces = getProvinces();
  ['birthProvince', 'liveProvince'].forEach(id => {
    const sel = document.getElementById(id);
    sel.innerHTML = '<option value="">请选择</option>';
    provinces.forEach(p => sel.innerHTML += `<option value="${p}">${p}</option>`);
  });
}

// 更新城市列表
function updateCities(type) {
  const province = document.getElementById(type + 'Province').value;
  const cities = getCities(province);
  const citySel = document.getElementById(type + 'City');
  citySel.innerHTML = '<option value="">请选择</option>';
  cities.forEach(c => citySel.innerHTML += `<option value="${c}">${c}</option>`);
  document.getElementById(type + 'District').innerHTML = '<option value="">可不填</option>';
}

// 更新区县列表
function updateDistricts(type) {
  const province = document.getElementById(type + 'Province').value;
  const city = document.getElementById(type + 'City').value;
  const districts = getDistricts(province, city);
  const distSel = document.getElementById(type + 'District');
  distSel.innerHTML = '<option value="">可不填</option>';
  districts.forEach(d => distSel.innerHTML += `<option value="${d}">${d}</option>`);
}

// 性别选择
function setGender(g) {
  selectedGender = g;
  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.gender) === g);
  });
}

// 注册
async function register() {
  const u = document.getElementById('username').value, p = document.getElementById('password').value;
  if (!u || !p) return alert('请输入用户名和密码');
  const res = await fetch('/api/auth/register', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: u, password: p})
  });
  alert((await res.json()).msg);
}

// 登录
async function login() {
  const u = document.getElementById('username').value, p = document.getElementById('password').value;
  if (!u || !p) return alert('请输入用户名和密码');
  const res = await fetch('/api/auth/login', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: u, password: p})
  });
  const data = await res.json();
  if (data.code === 200) {
    token = data.token; userId = data.userId;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    showApp();
  } else alert(data.msg);
}

// 显示主界面
function showApp() {
  document.getElementById('authSection').classList.add('hidden');
  document.getElementById('profileSection').classList.remove('hidden');
  document.getElementById('chatSection').classList.remove('hidden');
  initProvinces();
  loadProfile();
}

// 保存信息
async function saveProfile() {
  const birthDate = document.getElementById('birthDate').value;
  const birthTime = document.getElementById('birthTime').value;
  if (!birthDate) return alert('请选择出生日期');
  if (!birthTime) return alert('请选择出生时间');
  
  const birthProvince = document.getElementById('birthProvince').value;
  const birthCity = document.getElementById('birthCity').value;
  const birthDistrict = document.getElementById('birthDistrict').value;
  const liveProvince = document.getElementById('liveProvince').value;
  const liveCity = document.getElementById('liveCity').value;
  const liveDistrict = document.getElementById('liveDistrict').value;
  
  // 计算经纬度
  const birthCoords = getCoords(birthProvince, birthCity, birthDistrict);
  const liveCoords = getCoords(liveProvince, liveCity, liveDistrict);
  const birthPlace = [birthProvince, birthCity, birthDistrict].filter(Boolean).join('');
  const currentResidence = [liveProvince, liveCity, liveDistrict].filter(Boolean).join('');
  
  const [h, m] = birthTime.split(':');
  const birthLocation = birthCoords ? `${birthCoords.lat},${birthCoords.lon}` : '';
  const liveLocation = liveCoords ? `${liveCoords.lat},${liveCoords.lon}` : '';
  
  const res = await fetch('/api/user/profile', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    body: JSON.stringify({
      birth_date: birthDate, birth_time: birthTime, city: birthCity,
      birthplace: birthPlace, current_residence: currentResidence,
      gender: selectedGender, latitude: birthCoords?.lat || 0, longitude: birthCoords?.lon || 0
    })
  });
  const data = await res.json();
  if (data.code === 200) {
    alert('保存成功！');
    localStorage.setItem('birthInfo', JSON.stringify({
      year: new Date(birthDate).getFullYear(),
      month: new Date(birthDate).getMonth() + 1,
      day: new Date(birthDate).getDate(),
      hour: parseInt(h), minute: parseInt(m),
      birthProvince, birthCity, birthDistrict,
      liveProvince, liveCity, liveDistrict,
      latitude: birthCoords?.lat || 0, longitude: birthCoords?.lon || 0
    }));
  } else alert(data.msg);
}

// 加载信息
async function loadProfile() {
  const res = await fetch('/api/user/profile', {headers: {'Authorization': 'Bearer ' + token}});
  const data = await res.json();
  if (data.code === 200 && data.data) {
    const d = data.data;
    if (d.birth_date) document.getElementById('birthDate').value = d.birth_date;
    if (d.birth_time) document.getElementById('birthTime').value = d.birth_time;
    if (d.gender) { selectedGender = d.gender; setGender(d.gender); }
    if (d.birthplace) {
      const parts = d.birthplace.match(/[^市、区、县]+/g) || [];
      if (parts[0] && document.getElementById('birthProvince')) {
        document.getElementById('birthProvince').value = parts[0];
        updateCities('birth');
        if (parts[1]) {
          document.getElementById('birthCity').value = parts[1];
          updateDistricts('birth');
          if (parts[2]) document.getElementById('birthDistrict').value = parts[2];
        }
      }
    }
    if (d.current_residence) {
      const parts = d.current_residence.match(/[^市、区、县]+/g) || [];
      if (parts[0] && document.getElementById('liveProvince')) {
        document.getElementById('liveProvince').value = parts[0];
        updateCities('live');
        if (parts[1]) {
          document.getElementById('liveCity').value = parts[1];
          updateDistricts('live');
          if (parts[2]) document.getElementById('liveDistrict').value = parts[2];
        }
      }
    }
  }
}

// 发送消息
async function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  input.value = '';
  addLoading();
  
  const birthDate = document.getElementById('birthDate').value;
  const birthTime = document.getElementById('birthTime').value;
  const [h, m] = (birthTime || '12:00').split(':');
  
  const birthInfo = birthDate ? {
    year: new Date(birthDate).getFullYear(),
    month: new Date(birthDate).getMonth() + 1,
    day: new Date(birthDate).getDate(),
    hour: parseInt(h), minute: parseInt(m),
    gender: selectedGender
  } : null;
  
  try {
    const res = await fetch('/api/chat/consult', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      body: JSON.stringify({message, birthInfo})
    });
    const data = await res.json();
    removeLoading();
    if (data.code === 200) {
      const content = data.data?.messages?.[0]?.content || '感谢您的提问。';
      addMessage(content, 'ai');
    } else {
      addMessage('服务出现问题，请稍后再试。', 'ai');
    }
  } catch (e) {
    removeLoading();
    addMessage('网络错误，请检查连接。', 'ai');
  }
}

function addMessage(text, type) {
  const box = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = 'message ' + type;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function addLoading() {
  const box = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = 'message ai loading';
  div.id = 'loadingMsg';
  div.textContent = '✨ 星象解读中...';
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function removeLoading() {
  const el = document.getElementById('loadingMsg');
  if (el) el.remove();
}
