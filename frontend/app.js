let token = localStorage.getItem('token');
let userId = localStorage.getItem('userId');
if (token) showApp();
async function register() {
  const u = document.getElementById('username').value, p = document.getElementById('password').value;
  if (!u || !p) { alert('请输入用户名和密码'); return; }
  const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p }) });
  alert((await res.json()).msg);
}
async function login() {
  const u = document.getElementById('username').value, p = document.getElementById('password').value;
  if (!u || !p) { alert('请输入用户名和密码'); return; }
  const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p }) });
  const data = await res.json();
  if (data.code === 200) { token = data.token; userId = data.userId; localStorage.setItem('token', token); localStorage.setItem('userId', userId); showApp(); } else { alert(data.msg); }
}
function showApp() { document.getElementById('authSection').classList.add('hidden'); document.getElementById('profileSection').classList.remove('hidden'); document.getElementById('chatSection').classList.remove('hidden'); loadProfile(); }
async function saveProfile() {
  const bd = document.getElementById('birthDate').value, bt = document.getElementById('birthTime').value, c = document.getElementById('city').value;
  if (!bd) { alert('请选择出生日期'); return; }
  const [h, m] = bt.split(':');
  const res = await fetch('/api/user/profile', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ birth_date: bd, birth_time: bt, city: c, hour: parseInt(h), minute: parseInt(m) }) });
  alert((await res.json()).msg);
}
async function loadProfile() {
  const res = await fetch('/api/user/profile', { headers: { 'Authorization': 'Bearer ' + token } });
  const data = await res.json();
  if (data.code === 200 && data.data) {
    if (data.data.birth_date) document.getElementById('birthDate').value = data.data.birth_date;
    if (data.data.birth_time) document.getElementById('birthTime').value = data.data.birth_time;
    if (data.data.city) document.getElementById('city').value = data.data.city;
  }
}
async function sendMessage() {
  const input = document.getElementById('messageInput'), message = input.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  input.value = '';
  const bd = document.getElementById('birthDate').value, bt = document.getElementById('birthTime').value, [h, m] = bt.split(':');
  const res = await fetch('/api/chat/consult', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ message, birthInfo: bd ? { year: new Date(bd).getFullYear(), month: new Date(bd).getMonth() + 1, day: new Date(bd).getDate(), hour: parseInt(h), minute: parseInt(m) } : null }) });
  const data = await res.json();
  addMessage(data.code === 200 ? (data.data.messages?.[0]?.content || '感谢您的提问。') : '服务出现问题，请稍后再试。', 'ai');
}
function addMessage(text, type) { const box = document.getElementById('chatBox'), div = document.createElement('div'); div.className = 'message ' + type; div.textContent = text; box.appendChild(div); box.scrollTop = box.scrollHeight; }

