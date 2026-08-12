// 初始化 Supabase 客户端
const SUPABASE_URL = "https://wvjhfgiducuuhfhcliwa.supabase.co";
const SUPABASE_KEY = "sb_publishable_VUPDGBBjTjkJHjAPF2rkLA_FwyCekkG";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 23 位練習生完整資料庫
const mockTrainees = [
  { name: "吕政熙", group: "蓉（成都）", birthday: "2012.02.20", joinedDate: "2025.01.18", photo: "吕政熙.jpg" },
  { name: "杨云皓", group: "蓉（成都）", birthday: "2012.07.08", joinedDate: "2025.12.26", photo: "杨云皓.jpg" },
  { name: "侯王子", group: "渝（重庆）", birthday: "2012.10.01", joinedDate: "2025.12.26", photo: "侯王子.jpg" },
  { name: "刘禹辰", group: "渝（重庆）", birthday: "2012.10.02", joinedDate: "2025.12.26", photo: "刘禹辰.jpg" },
  { name: "余政霖", group: "渝（重庆）", birthday: "2012.11.15", joinedDate: "2025.12.26", photo: "余政霖.jpg" },
  { name: "高铭阳", group: "蓉（成都）", birthday: "2012.11.17", joinedDate: "2025.07.12", photo: "高铭阳.jpg" },
  { name: "杨子豪", group: "五代练习生", birthday: "2013.03.15", joinedDate: "2025.08.05", photo: "杨子豪.jpg" },
  { name: "宋金泽", group: "五代练习生", birthday: "2013.04.02", joinedDate: "2025.08.05", photo: "宋金泽.jpg" },
  { name: "任玄哲", group: "蓉（成都）", birthday: "2013.09.05", joinedDate: "2025.12.26", photo: "任玄哲.jpg" },
  { name: "皮子渝", group: "五代练习生", birthday: "2013.09.16", joinedDate: "2026.07.16", photo: "皮子渝.jpg" },
  { name: "智恩涵", group: "蓉（成都）", birthday: "2013.09.24", joinedDate: "2025.02.24", photo: "智恩涵.jpg" },
  { name: "沈子航", group: "蓉（成都）", birthday: "2013.11.21", joinedDate: "2025.07.12", photo: "沈子航.jpg" },
  { name: "杨林好", group: "蓉（成都）", birthday: "2013.12.17", joinedDate: "2025.12.26", photo: "杨林好.jpg" },
  { name: "朱映宸", group: "渝（重庆）", birthday: "2013.12.19", joinedDate: "2025.01.18", photo: "朱映宸.jpg" },
  { name: "张誉严", group: "渝（重庆）", birthday: "2014.03.26", joinedDate: "2025.12.26", photo: "张誉严.jpg" },
  { name: "陈璟翊", group: "蓉（成都）", birthday: "2014.04.23", joinedDate: "2026.05.17", photo: "陈璟翊.jpg" },
  { name: "胡阿米", group: "渝（重庆）", birthday: "2014.05.01", joinedDate: "2025.12.26", photo: "胡阿米.jpg" },
  { name: "魏新航", group: "渝（重庆）", birthday: "2014.06.27", joinedDate: "2025.12.26", photo: "魏新航.jpg" },
  { name: "佟弋", group: "渝（重庆）", birthday: "2014.07.07", joinedDate: "2025.12.26", photo: "佟弋.jpg" },
  { name: "赵俊羽", group: "蓉（成都）", birthday: "2014.08.24", joinedDate: "2025.12.26", photo: "赵俊羽.jpg" },
  { name: "刘瀚辰", group: "渝（重庆）", birthday: "2014.09.21", joinedDate: "2025.07.12", photo: "刘瀚辰.jpg" },
  { name: "陈燊", group: "蓉（成都）", birthday: "2014.09.23", joinedDate: "2025.12.26", photo: "陈燊.jpg" },
  { name: "越艺晨", group: "渝（重庆）", birthday: "2014.10.31", joinedDate: "2026.05.17", photo: "越艺晨.jpg" }
]
// 1. 页面 Tab 切换
function switchTab(tabName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${tabName}`).classList.add('active');

  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('text-gray-800', 'font-bold');
    b.classList.add('text-gray-600');
  });

  const activeBtn = document.getElementById(`btn-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.add('text-gray-800', 'font-bold');
    activeBtn.classList.remove('text-gray-600');
  }
}

// 2. 从 Supabase 读取物料 (status = 'approved')
async function fetchApprovedMedia() {
  const homeMediaList = document.getElementById('home-media-list');
  const mediaFullList = document.getElementById('media-full-list');
  
  if (!homeMediaList || !mediaFullList) return;

  homeMediaList.innerHTML = '';
  mediaFullList.innerHTML = '';

  const { data, error } = await _supabase
    .from('media')
    .select('*')
    .eq('status', 'approved');

  if (error) {
    console.error('读取物料失败:', error);
    homeMediaList.innerHTML = `<div class="text-xs text-red-400 text-center py-2">读取失败：${error.message}</div>`;
    return;
  }

  if (!data || data.length === 0) {
    homeMediaList.innerHTML = `<div class="text-xs text-gray-400 text-center py-2">暂无已审核物料</div>`;
    mediaFullList.innerHTML = `<div class="text-xs text-gray-400 text-center py-2">暂无已审核物料</div>`;
    return;
  }

  data.forEach(m => {
    const item = document.createElement('div');
    item.className = "bg-white p-3 rounded-2xl shadow-sm border border-gray-100 space-y-1";
    item.innerHTML = `
      <span class="text-[10px] text-gray-400 block">${m.date || '未知日期'}</span>
      <p class="text-xs font-medium text-gray-700">${m.title}</p>
      ${m.url ? `<a href="${m.url}" target="_blank" class="text-[10px] text-blue-500 hover:underline">查看链接 →</a>` : ''}
    `;
    homeMediaList.appendChild(item);
    mediaFullList.appendChild(item.cloneNode(true));
  });
}

// 3. 读取已审核匿名留言墙 (status = 'approved')，區分告白與爆料標籤
async function fetchApprovedMessages() {
  const messagesList = document.getElementById('home-messages-list');
  if (!messagesList) return;

  messagesList.innerHTML = '';

  const { data, error } = await _supabase
    .from('messages')
    .select('*')
    .eq('status', 'approved');

  if (error) {
    console.error('读取留言失败:', error);
    messagesList.innerHTML = `<div class="text-xs text-gray-400 text-center py-2">暂无留言</div>`;
    return;
  }

  if (!data || data.length === 0) {
    messagesList.innerHTML = `<div class="text-xs text-gray-400 text-center py-2">暂无匿名投稿，快来悄悄投稿第一条吧！</div>`;
    return;
  }

  data.forEach(msg => {
    const card = document.createElement('div');
    const isBaoLiao = msg.type === '爆料';
    
    card.className = isBaoLiao 
      ? "bg-amber-50/80 p-3 rounded-2xl shadow-sm space-y-1 border border-amber-100" 
      : "bg-[#EBF2F8] p-3 rounded-2xl shadow-sm space-y-1 border border-blue-50";

    card.innerHTML = `
      <div class="flex justify-between items-center text-[10px]">
        <span class="font-bold text-gray-600">${isBaoLiao ? '🔥 爆料鹅' : '💌 告白鹅'}</span>
        <span class="${isBaoLiao ? 'bg-amber-100 text-amber-700' : 'bg-white/80 text-blue-500'} px-2 py-0.5 rounded-full font-medium">TO: ${msg.target || '全体'}</span>
      </div>
      <p class="text-xs text-gray-700 leading-relaxed pt-1">${msg.content}</p>
    `;
    messagesList.appendChild(card);
  });
}

// 4. 粉絲匿名投稿 (新增 type 欄位)
async function submitGuestbookMessage() {
  const type = document.getElementById('msg-type').value;
  const target = document.getElementById('msg-target').value;
  const content = document.getElementById('msg-content').value.trim();

  if (!content) {
    alert('请填写投稿内容！');
    return;
  }

  const { error } = await _supabase.from('messages').insert([
    { type, target, content, status: 'pending' }
  ]);

  if (error) {
    alert('投稿失败：' + error.message);
  } else {
    alert('匿名投稿成功！已送交站长审核，通过后就会展示在留言墙上～');
    document.getElementById('msg-content').value = '';
    closeGuestbookModal();
  }
}

// 5. 管理員獲取待審核物料與匿名留言
async function fetchPendingMedia() {
  const pendingList = document.getElementById('pending-list');
  if (!pendingList) return;
  pendingList.innerHTML = '';

  const { data, error } = await _supabase.from('media').select('*').eq('status', 'pending');

  if (error || !data || data.length === 0) {
    pendingList.innerHTML = `<div class="text-xs text-gray-400">目前没有待审核物料</div>`;
    return;
  }

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = "p-2 bg-amber-50 rounded-lg flex justify-between items-center text-xs";
    const encodedTitle = encodeURIComponent(item.title);
    div.innerHTML = `
      <div>
        <p class="font-bold text-gray-800">${item.title}</p>
        <p class="text-[10px] text-gray-500">${item.date || '无日期'}</p>
      </div>
      <div class="space-x-1">
        <button onclick="approveMedia('${encodedTitle}')" class="px-2 py-1 bg-green-500 text-white text-[10px] rounded">通过</button>
        <button onclick="rejectMedia('${encodedTitle}')" class="px-2 py-1 bg-red-400 text-white text-[10px] rounded">驳回</button>
      </div>
    `;
    pendingList.appendChild(div);
  });
}

async function fetchPendingMessages() {
  const pendingMessagesList = document.getElementById('pending-messages-list');
  if (!pendingMessagesList) return;
  pendingMessagesList.innerHTML = '';

  const { data, error } = await _supabase.from('messages').select('*').eq('status', 'pending');

  if (error || !data || data.length === 0) {
    pendingMessagesList.innerHTML = `<div class="text-xs text-gray-400">目前没有待审核留言</div>`;
    return;
  }

  data.forEach(msg => {
    const div = document.createElement('div');
    div.className = "p-2 bg-pink-50 rounded-lg space-y-1 text-xs";
    const encodedContent = encodeURIComponent(msg.content);
    div.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="font-bold text-gray-800">[${msg.type || '告白'}] 🤫 匿名 ➔ ${msg.target}</span>
        <div class="space-x-1">
          <button onclick="approveMessage('${encodedContent}')" class="px-2 py-0.5 bg-green-500 text-white text-[10px] rounded">通过</button>
          <button onclick="rejectMessage('${encodedContent}')" class="px-2 py-0.5 bg-red-400 text-white text-[10px] rounded">驳回</button>
        </div>
      </div>
      <p class="text-gray-600 text-[11px]">${msg.content}</p>
    `;
    pendingMessagesList.appendChild(div);
  });
}

// 6. 審核操作
async function approveMedia(encodedTitle) {
  const title = decodeURIComponent(encodedTitle);
  const { error } = await _supabase.from('media').update({ status: 'approved' }).eq('title', title);
  if (error) { alert('审核失败：' + error.message); }
  else { alert('已通过审核！'); fetchPendingMedia(); fetchApprovedMedia(); }
}

async function rejectMedia(encodedTitle) {
  const title = decodeURIComponent(encodedTitle);
  const { error } = await _supabase.from('media').delete().eq('title', title);
  if (error) { alert('驳回失败：' + error.message); }
  else { alert('已驳回并删除。'); fetchPendingMedia(); }
}

async function approveMessage(encodedContent) {
  const content = decodeURIComponent(encodedContent);
  const { error } = await _supabase.from('messages').update({ status: 'approved' }).eq('content', content);
  if (error) { alert('审核失败：' + error.message); }
  else { alert('匿名投稿已通过！已显示于前台。'); fetchPendingMessages(); fetchApprovedMessages(); }
}

async function rejectMessage(encodedContent) {
  const content = decodeURIComponent(encodedContent);
  const { error } = await _supabase.from('messages').delete().eq('content', content);
  if (error) { alert('驳回失败：' + error.message); }
  else { alert('已驳回投稿。'); fetchPendingMessages(); }
}

// 7. Modal 控制與登入
function openGuestbookModal() { document.getElementById('guestbook-modal').classList.remove('hidden'); }
function closeGuestbookModal() { document.getElementById('guestbook-modal').classList.add('hidden'); }

function openLoginModal() { document.getElementById('login-modal').classList.remove('hidden'); }
function closeLoginModal() { document.getElementById('login-modal').classList.add('hidden'); }

function handleLogin() {
  const pass = document.getElementById('modal-pass').value.trim();
  if (pass === "data123") {
    alert("数据组登录成功！已开启物料提交面板。");
    document.getElementById('data-team-panel').classList.remove('hidden');
    closeLoginModal();
  } else if (pass === "admin888") {
    alert("管理员登录成功！已开启待审核控制台。");
    document.getElementById('admin-panel').classList.remove('hidden');
    fetchPendingMedia();
    fetchPendingMessages();
    closeLoginModal();
  } else {
    alert("密钥错误！");
  }
}

// 8. 渲染 23 位練習生列表
function renderTrainees() {
  const homeScroll = document.getElementById('home-trainees-scroll');
  const topScroll = document.getElementById('trainee-top-scroll');

  if (!homeScroll || !topScroll) return;

  homeScroll.innerHTML = '';
  topScroll.innerHTML = '';

  mockTrainees.forEach((t, index) => {
    const card = document.createElement('div');
    card.className = "flex-none w-24 bg-[#B9D1E5] rounded-xl overflow-hidden cursor-pointer shadow-sm";
    card.onclick = () => { switchTab('trainees'); selectTrainee(index); };
    
    card.innerHTML = `
      <div class="w-full aspect-[3/4] bg-gray-200 overflow-hidden">
        <img src="${t.photo}" onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\'w-full h-full flex items-center justify-center text-[10px] text-gray-400\'>大头照</div>';" class="w-full h-full object-cover">
      </div>
      <div class="p-1.5 text-center bg-[#B9D1E5]">
        <h3 class="font-bold text-xs text-gray-800">${t.name}</h3>
        <p class="text-[9px] text-gray-600">${t.group}</p>
      </div>
    `;
    homeScroll.appendChild(card);

    const topCard = card.cloneNode(true);
    topCard.onclick = () => selectTrainee(index);
    topScroll.appendChild(topCard);
  });
  
  selectTrainee(0);
}

// 選擇練習生，寫入四宮格詳細資料
function selectTrainee(index) {
  const t = mockTrainees[index];
  if (!t) return;

  if (document.getElementById('detail-name')) document.getElementById('detail-name').innerText = t.name;
  if (document.getElementById('detail-group')) document.getElementById('detail-group').innerText = t.group;
  if (document.getElementById('detail-birthday')) document.getElementById('detail-birthday').innerText = t.birthday;
  if (document.getElementById('detail-joined')) document.getElementById('detail-joined').innerText = t.joinedDate;

  const photoBox = document.getElementById('trainee-photo-box');
  if (photoBox) {
    photoBox.innerHTML = `
      <img src="${t.photo}" onerror="this.onerror=null;this.parentElement.innerHTML='<span class=\'text-gray-400 text-xs\'>暂无照片</span>';" class="w-full h-full object-cover">
    `;
  }
}

// 頁面載入完成後初始化
window.onload = () => {
  renderTrainees();
  fetchApprovedMedia();
  fetchApprovedMessages();
};
