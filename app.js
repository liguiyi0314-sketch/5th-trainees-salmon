// 吾鹅资料库新版 app.js
const SUPABASE_URL = "https://wvjhfgiducuuhfhcliwa.supabase.co";
const SUPABASE_KEY = "sb_publishable_VUPDGBBjTjkJHjAPF2rkLA_FwyCekkG";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 23 位练习生
const mockTrainees = [
  { name:"吕政熙", group:"蓉（成都）", birthday:"2012.02.20", joinedDate:"2025.01.18", photo:"吕政熙.jpg" },
  { name:"杨云皓", group:"蓉（成都）", birthday:"2012.07.08", joinedDate:"2025.12.26", photo:"杨云皓.jpg" },
  { name:"侯王子", group:"渝（重庆）", birthday:"2012.10.01", joinedDate:"2025.12.26", photo:"侯王子.jpg" },
  { name:"刘禹辰", group:"渝（重庆）", birthday:"2012.10.02", joinedDate:"2025.12.26", photo:"刘禹辰.jpg" },
  { name:"余政霖", group:"渝（重庆）", birthday:"2012.11.15", joinedDate:"2025.12.26", photo:"余政霖.jpg" },
  { name:"高铭阳", group:"蓉（成都）", birthday:"2012.11.17", joinedDate:"2025.07.12", photo:"高铭阳.jpg" },
  { name:"杨子豪", group:"五代练习生", birthday:"2013.03.15", joinedDate:"2025.08.05", photo:"杨子豪.jpg" },
  { name:"宋金泽", group:"五代练习生", birthday:"2013.04.02", joinedDate:"2025.08.05", photo:"宋金泽.jpg" },
  { name:"任玄哲", group:"蓉（成都）", birthday:"2013.09.05", joinedDate:"2025.12.26", photo:"任玄哲.jpg" },
  { name:"皮子渝", group:"五代练习生", birthday:"2013.09.16", joinedDate:"2026.07.16", photo:"皮子渝.jpg" },
  { name:"智恩涵", group:"蓉（成都）", birthday:"2013.09.24", joinedDate:"2025.02.24", photo:"智恩涵.jpg" },
  { name:"沈子航", group:"蓉（成都）", birthday:"2013.11.21", joinedDate:"2025.07.12", photo:"沈子航.jpg" },
  { name:"杨林好", group:"蓉（成都）", birthday:"2013.12.17", joinedDate:"2025.12.26", photo:"杨林好.jpg" },
  { name:"朱映宸", group:"渝（重庆）", birthday:"2013.12.19", joinedDate:"2025.01.18", photo:"朱映宸.jpg" },
  { name:"张誉严", group:"渝（重庆）", birthday:"2014.03.26", joinedDate:"2025.12.26", photo:"张誉严.jpg" },
  { name:"陈璟翊", group:"蓉（成都）", birthday:"2014.04.23", joinedDate:"2026.05.17", photo:"陈璟翊.jpg" },
  { name:"胡阿米", group:"渝（重庆）", birthday:"2014.05.01", joinedDate:"2025.12.26", photo:"胡阿米.jpg" },
  { name:"魏新航", group:"渝（重庆）", birthday:"2014.06.27", joinedDate:"2025.12.26", photo:"魏新航.jpg" },
  { name:"佟弋", group:"渝（重庆）", birthday:"2014.07.07", joinedDate:"2025.12.26", photo:"佟弋.jpg" },
  { name:"赵俊羽", group:"蓉（成都）", birthday:"2014.08.24", joinedDate:"2025.12.26", photo:"赵俊羽.jpg" },
  { name:"刘瀚辰", group:"渝（重庆）", birthday:"2014.09.21", joinedDate:"2025.07.12", photo:"刘瀚辰.jpg" },
  { name:"陈燊", group:"蓉（成都）", birthday:"2014.09.23", joinedDate:"2025.12.26", photo:"陈燊.jpg" },
  { name:"越艺晨", group:"渝（重庆）", birthday:"2014.10.31", joinedDate:"2026.05.17", photo:"越艺晨.jpg" }
];

// 临时统计数据：等你的三个 Excel 能上传后，再把实际数据填入这里。
// 每个项目的数值目前用 null 表示“尚未导入”，不会伪装成 0。
const statsData = {
  cover: mockTrainees.map(t => ({name:t.name, value:null})),
  media: mockTrainees.map(t => ({name:t.name, value:null})),
  stage: mockTrainees.map(t => ({name:t.name, value:null})),
  exam: mockTrainees.map(t => ({name:t.name, value:null}))
};

const tableData = {
  cover: { columns:["练习生","Cover数量","备注"], rows: mockTrainees.map(t=>[t.name,"—","待导入COVER总表"]) },
  exam: { columns:["练习生","考核次数","排名/成绩","备注"], rows: mockTrainees.map(t=>[t.name,"—","—","待导入考核总表"]) },
  stage: { columns:["练习生","舞台数量","备注"], rows: mockTrainees.map(t=>[t.name,"—","待导入舞台总表"]) }
};

// 注意：这些账号是“当前版本的临时前端账号”。上线后懂得查看源码的人仍可能看到它们。
// 正式使用建议改成 Supabase Auth + RLS。
const DATA_ACCOUNTS = [
  '鹅据组-01-bl14wp',
  '鹅据组-02-4uiryq',
  '鹅据组-03-mghkz2',
  '鹅据组-04-zgv0cw',
  '鹅据组-05-mqvwlk',
  '鹅据组-06-eayu79',
  '鹅据组-07-g5qcql',
  '鹅据组-08-g46ndj',
  '鹅据组-09-sdngmo',
  '鹅据组-10-w8gqnr',
  '鹅据组-11-dvmgq2',
  '鹅据组-12-w7gkq3',
  '鹅据组-13-17j4i2',
  '鹅据组-14-vdoruy',
  '鹅据组-15-cncub3',
  '鹅据组-16-65t7xz',
  '鹅据组-17-9m8qxt',
  '鹅据组-18-y25ko3',
  '鹅据组-19-nqp5dc',
  '鹅据组-20-wv9115',
  '鹅据组-21-sjzlmm',
  '鹅据组-22-vz1vwb',
  '鹅据组-23-6d8klu'
];
const ADMIN_ACCOUNT = '吾鹅管理员-7f1lzqkn';
let currentRole = null;
let currentAccount = null;

function switchTab(tabName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`page-${tabName}`);
  if (page) page.classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`btn-${tabName}`);
  if (btn) btn.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

async function fetchApprovedNews() {
  const home = document.getElementById('home-news-list');
  const full = document.getElementById('news-full-list');
  if (!home || !full) return;
  const {data,error} = await _supabase.from('news').select('*').eq('status','approved').order('created_at',{ascending:false});
  if (error) {
    home.innerHTML = `<div class="bg-white p-3 rounded-2xl text-xs text-gray-400 text-center">最新动态暂时无法读取，请检查 Supabase 的 news 表。</div>`;
    full.innerHTML = `<div class="bg-white p-3 rounded-2xl text-xs text-gray-400 text-center">暂无可显示动态</div>`;
    return;
  }
  const rows = data || [];
  if (!rows.length) {
    home.innerHTML = `<div class="bg-white p-3 rounded-2xl text-xs text-gray-400 text-center">暂无已审核动态</div>`;
    full.innerHTML = `<div class="bg-white p-3 rounded-2xl text-xs text-gray-400 text-center">暂无已审核动态</div>`;
    return;
  }
  const render = n => `<div class="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100">
    <span class="text-[10px] text-gray-400 block">${escapeHtml(n.date || '未知日期')}</span>
    <p class="text-xs font-medium text-gray-700 mt-1">${escapeHtml(n.title)}</p>
    ${n.url ? `<a href="${escapeHtml(n.url)}" target="_blank" rel="noopener" class="text-[10px] text-blue-500 hover:underline">查看相关链接 →</a>` : ''}
  </div>`;
  home.innerHTML = rows.slice(0,3).map(render).join('');
  full.innerHTML = rows.map(render).join('');
}

async function submitNews() {
  const title = document.getElementById('news-title').value.trim();
  const date = document.getElementById('news-date').value.trim();
  const url = document.getElementById('news-url').value.trim();
  if (!title) return alert('请填写动态标题！');
  const {error} = await _supabase.from('news').insert([{title,date,url,status:'pending',submitted_by:currentAccount}]);
  if (error) return alert('动态投稿失败：' + error.message);
  alert('动态投稿成功！已送交站长审核。');
  document.getElementById('news-title').value='';
  document.getElementById('news-date').value='';
  document.getElementById('news-url').value='';
}

async function fetchApprovedMedia() {
  const home = document.getElementById('home-media-list');
  const full = document.getElementById('media-full-list');
  if (!home || !full) return;
  const {data,error} = await _supabase.from('media').select('*').eq('status','approved').order('created_at',{ascending:false});
  if (error) {
    home.innerHTML = `<div class="text-xs text-red-400 text-center py-2">读取失败：${escapeHtml(error.message)}</div>`;
    return;
  }
  if (!data?.length) {
    home.innerHTML = `<div class="text-xs text-gray-400 text-center py-2">暂无已审核物料</div>`;
    full.innerHTML = `<div class="text-xs text-gray-400 text-center py-2">暂无已审核物料</div>`;
    return;
  }
  const render = m => `<div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 space-y-1">
    <span class="text-[10px] text-gray-400 block">${escapeHtml(m.date || '未知日期')}</span>
    <p class="text-xs font-medium text-gray-700">${escapeHtml(m.title)}</p>
    ${m.url ? `<a href="${escapeHtml(m.url)}" target="_blank" rel="noopener" class="text-[10px] text-blue-500 hover:underline">查看链接 →</a>` : ''}
  </div>`;
  home.innerHTML = data.slice(0,5).map(render).join('');
  full.innerHTML = data.map(render).join('');
}

async function submitMedia() {
  const title=document.getElementById('input-title').value.trim();
  const date=document.getElementById('input-date').value.trim();
  const url=document.getElementById('input-url').value.trim();
  if (!title) return alert('请填写物料标题！');
  const {error} = await _supabase.from('media').insert([{title,date,url,status:'pending',submitted_by:currentAccount}]);
  if (error) return alert('投稿失败：'+error.message);
  alert('物料投稿成功！已送交站长审核。');
  document.getElementById('input-title').value='';
  document.getElementById('input-date').value='';
  document.getElementById('input-url').value='';
}

async function fetchApprovedMessages() {
  const list=document.getElementById('home-messages-list');
  if (!list) return;
  const {data,error}=await _supabase.from('messages').select('*').eq('status','approved').order('created_at',{ascending:false});
  if (error || !data?.length) {
    list.innerHTML=`<div class="text-xs text-gray-400 text-center py-2">暂无匿名投稿，快来悄悄投稿第一条吧！</div>`;
    return;
  }
  list.innerHTML=data.slice(0,5).map(msg=>{
    const bao=msg.type==='爆料';
    return `<div class="${bao?'bg-amber-50/80 border-amber-100':'bg-[#EBF2F8] border-blue-50'} p-3 rounded-2xl shadow-sm border">
      <div class="flex justify-between items-center text-[10px]"><span class="font-bold text-gray-600">${bao?'🔥 爆料鹅':'💌 告白鹅'}</span>
      <span class="bg-white/80 px-2 py-0.5 rounded-full text-blue-500">TO: ${escapeHtml(msg.target||'全体')}</span></div>
      <p class="text-xs text-gray-700 leading-relaxed pt-1">${escapeHtml(msg.content)}</p>
    </div>`;
  }).join('');
}

async function submitGuestbookMessage() {
  const type=document.getElementById('msg-type').value;
  const target=document.getElementById('msg-target').value;
  const content=document.getElementById('msg-content').value.trim();
  if (!content) return alert('请填写投稿内容！');
  const {error}=await _supabase.from('messages').insert([{type,target,content,status:'pending'}]);
  if (error) return alert('投稿失败：'+error.message);
  alert('匿名投稿成功！已送交站长审核。');
  document.getElementById('msg-content').value='';
  closeGuestbookModal();
}

async function submitProblem() {
  const type=document.getElementById('problem-type').value;
  const title=document.getElementById('problem-title').value.trim();
  const content=document.getElementById('problem-content').value.trim();
  if (!title || !content) return alert('请填写问题标题和问题内容！');
  const {error}=await _supabase.from('problem_reports').insert([{type,title,content,status:'pending'}]);
  if (error) return alert('问题回报失败：'+error.message);
  alert('问题已匿名送出，感谢你的回报！');
  document.getElementById('problem-title').value='';
  document.getElementById('problem-content').value='';
  closeProblemModal();
}

function openGuestbookModal(){document.getElementById('guestbook-modal').classList.remove('hidden');}
function closeGuestbookModal(){document.getElementById('guestbook-modal').classList.add('hidden');}
function openProblemModal(){document.getElementById('problem-modal').classList.remove('hidden');}
function closeProblemModal(){document.getElementById('problem-modal').classList.add('hidden');}
function openLoginModal(){document.getElementById('login-modal').classList.remove('hidden');}
function closeLoginModal(){document.getElementById('login-modal').classList.add('hidden');}

function handleLogin() {
  const account=document.getElementById('modal-account').value.trim();
  if (!account) return alert('请输入专属账号！');
  if (DATA_ACCOUNTS.includes(account)) {
    currentRole='data'; currentAccount=account;
    document.getElementById('current-account').innerText=account;
    document.getElementById('data-team-panel').classList.remove('hidden');
    closeLoginModal();
    alert('数据组登录成功！');
  } else if (account===ADMIN_ACCOUNT) {
    currentRole='admin'; currentAccount=account;
    document.getElementById('admin-panel').classList.remove('hidden');
    closeLoginModal();
    fetchPendingNews(); fetchPendingMedia(); fetchPendingMessages(); fetchPendingProblems();
    alert('管理员登录成功！');
  } else {
    alert('账号错误！');
  }
}

async function fetchPendingNews() {
  const box=document.getElementById('pending-news-list'); if(!box)return;
  const {data,error}=await _supabase.from('news').select('*').eq('status','pending').order('created_at',{ascending:false});
  if(error||!data?.length){box.innerHTML='<div class="text-[10px] text-gray-400">目前没有待审核动态</div>';return;}
  box.innerHTML=data.map(n=>`<div class="p-2 bg-amber-50 rounded-lg text-xs"><b>${escapeHtml(n.title)}</b><p class="text-[10px] text-gray-500">${escapeHtml(n.date||'无日期')}</p><div class="mt-1 space-x-1"><button onclick="reviewNews('${n.id}','approved')" class="px-2 py-1 bg-green-500 text-white rounded">通过</button><button onclick="reviewNews('${n.id}','rejected')" class="px-2 py-1 bg-red-400 text-white rounded">驳回</button></div></div>`).join('');
}
async function reviewNews(id,status) {
  const {error}=await _supabase.from('news').update({status}).eq('id',id);
  if(error) alert('操作失败：'+error.message); else {fetchPendingNews();fetchApprovedNews();}
}
async function fetchPendingMedia() {
  const box=document.getElementById('pending-list'); if(!box)return;
  const {data,error}=await _supabase.from('media').select('*').eq('status','pending').order('created_at',{ascending:false});
  if(error||!data?.length){box.innerHTML='<div class="text-[10px] text-gray-400">目前没有待审核物料</div>';return;}
  box.innerHTML=data.map(m=>`<div class="p-2 bg-amber-50 rounded-lg text-xs"><b>${escapeHtml(m.title)}</b><p class="text-[10px]">${escapeHtml(m.date||'无日期')}</p><div class="mt-1 space-x-1"><button onclick="reviewMedia('${m.id}','approved')" class="px-2 py-1 bg-green-500 text-white rounded">通过</button><button onclick="reviewMedia('${m.id}','rejected')" class="px-2 py-1 bg-red-400 text-white rounded">驳回</button></div></div>`).join('');
}
async function reviewMedia(id,status) {
  const {error}=await _supabase.from('media').update({status}).eq('id',id);
  if(error) alert('操作失败：'+error.message); else {fetchPendingMedia();fetchApprovedMedia();}
}
async function fetchPendingMessages() {
  const box=document.getElementById('pending-messages-list'); if(!box)return;
  const {data,error}=await _supabase.from('messages').select('*').eq('status','pending').order('created_at',{ascending:false});
  if(error||!data?.length){box.innerHTML='<div class="text-[10px] text-gray-400">目前没有待审核留言</div>';return;}
  box.innerHTML=data.map(m=>`<div class="p-2 bg-pink-50 rounded-lg text-xs"><b>[${escapeHtml(m.type||'告白')}] → ${escapeHtml(m.target||'全体')}</b><p>${escapeHtml(m.content)}</p><div class="mt-1 space-x-1"><button onclick="reviewMessage('${m.id}','approved')" class="px-2 py-1 bg-green-500 text-white rounded">通过</button><button onclick="reviewMessage('${m.id}','rejected')" class="px-2 py-1 bg-red-400 text-white rounded">驳回</button></div></div>`).join('');
}
async function reviewMessage(id,status) {
  const {error}=await _supabase.from('messages').update({status}).eq('id',id);
  if(error) alert('操作失败：'+error.message); else {fetchPendingMessages();fetchApprovedMessages();}
}
async function fetchPendingProblems() {
  const box=document.getElementById('pending-problems-list'); if(!box)return;
  const {data,error}=await _supabase.from('problem_reports').select('*').eq('status','pending').order('created_at',{ascending:false});
  if(error||!data?.length){box.innerHTML='<div class="text-[10px] text-gray-400">目前没有待处理问题回报</div>';return;}
  box.innerHTML=data.map(p=>`<div class="p-2 bg-blue-50 rounded-lg text-xs"><b>[${escapeHtml(p.type)}] ${escapeHtml(p.title)}</b><p class="mt-1">${escapeHtml(p.content)}</p><button onclick="reviewProblem('${p.id}','resolved')" class="mt-1 px-2 py-1 bg-green-500 text-white rounded">标记已处理</button></div>`).join('');
}
async function reviewProblem(id,status) {
  const {error}=await _supabase.from('problem_reports').update({status}).eq('id',id);
  if(error) alert('操作失败：'+error.message); else fetchPendingProblems();
}

function showRanking(type) {
  const panel=document.getElementById('ranking-panel');
  const labels={cover:'Cover数量排名',media:'物料数量排名',stage:'舞台数量排名',exam:'考核排名'};
  const rows=[...statsData[type]].filter(x=>x.value!==null).sort((a,b)=>b.value-a.value);
  if(!rows.length) {
    panel.innerHTML=`<h3 class="font-bold text-sm mb-2">${labels[type]}</h3><p class="text-xs text-gray-400 text-center py-6">统计数据尚未导入，请之后将对应 Excel 数据填入 app.js。</p>`;
    return;
  }
  panel.innerHTML=`<h3 class="font-bold text-sm mb-2">${labels[type]}</h3>`+rows.map((r,i)=>`<div class="rank-row"><span class="rank-no">${i+1}</span><span class="rank-name">${escapeHtml(r.name)}</span><span class="rank-value">${r.value}</span></div>`).join('');
}

function renderTable(key) {
  const table=document.getElementById(key+'-table'), data=tableData[key];
  if(!table)return;
  table.innerHTML='<thead><tr>'+data.columns.map(c=>`<th>${escapeHtml(c)}</th>`).join('')+'</tr></thead><tbody>'+data.rows.map(row=>'<tr>'+row.map(c=>`<td>${escapeHtml(c)}</td>`).join('')+'</tr>').join('')+'</tbody>';
}

function renderTrainees() {
  const home=document.getElementById('home-trainees-scroll'), top=document.getElementById('trainee-top-scroll');
  if(!home||!top)return;
  home.innerHTML=''; top.innerHTML='';
  mockTrainees.forEach((t,i)=>{
    const makeCard=()=>{
      const card=document.createElement('div');
      card.className='flex-none w-24 bg-[#B9D1E5] rounded-xl overflow-hidden cursor-pointer shadow-sm';
      card.innerHTML=`<div class="w-full aspect-[3/4] bg-gray-200 overflow-hidden"><img src="${t.photo}" onerror="this.onerror=null;this.parentElement.innerHTML='<div class=&quot;w-full h-full flex items-center justify-center text-[10px] text-gray-400&quot;>大头照</div>';" class="w-full h-full object-cover"></div><div class="p-1.5 text-center bg-[#B9D1E5]"><h3 class="font-bold text-xs">${escapeHtml(t.name)}</h3><p class="text-[9px] text-gray-600">${escapeHtml(t.group)}</p></div>`;
      card.onclick=()=>{switchTab('trainees');selectTrainee(i);};
      return card;
    };
    home.appendChild(makeCard());
    const c=makeCard(); c.onclick=()=>selectTrainee(i); top.appendChild(c);
  });
  selectTrainee(0);
}
function selectTrainee(index) {
  const t=mockTrainees[index]; if(!t)return;
  document.getElementById('detail-name').innerText=t.name;
  document.getElementById('detail-group').innerText=t.group;
  document.getElementById('detail-birthday').innerText=t.birthday;
  document.getElementById('detail-joined').innerText=t.joinedDate;
  document.getElementById('trainee-photo-box').innerHTML=`<img src="${t.photo}" onerror="this.onerror=null;this.parentElement.innerHTML='<span class=&quot;text-gray-400 text-xs&quot;>暂无照片</span>';" class="w-full h-full object-cover">`;
}

function fillTargets() {
  const s=document.getElementById('msg-target');
  s.innerHTML='<option value="全体">对象：全体练习生</option>'+mockTrainees.map(t=>`<option value="${escapeHtml(t.name)}">对象：${escapeHtml(t.name)}</option>`).join('');
}

window.onload=()=>{
  renderTrainees(); fillTargets();
  fetchApprovedNews(); fetchApprovedMedia(); fetchApprovedMessages();
  renderTable('cover'); renderTable('exam'); renderTable('stage');
};
