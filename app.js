/* ═════════════════════════════════════════════
   English Teaching Board · v2 · app.js
   ═════════════════════════════════════════════ */

/* ─── ICONS — inline SVG (replace emoji) ─── */
const SVG = (paths, sz = 16) =>
  `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const ICONS = {
  pencil:  (s) => SVG('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>', s),
  play:    (s) => SVG('<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>', s),
  stop:    (s) => SVG('<rect x="5" y="5" width="14" height="14" rx="1"/>', s),
  card:    (s) => SVG('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 12h18"/>', s),
  question:(s) => SVG('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r=".5" fill="currentColor"/>', s),
  chat:    (s) => SVG('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/>', s),
  book:    (s) => SVG('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>', s),
  note:    (s) => SVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>', s),
  plus:    (s) => SVG('<path d="M12 5v14M5 12h14"/>', s),
  x:       (s) => SVG('<path d="M18 6L6 18M6 6l12 12"/>', s),
  check:   (s) => SVG('<polyline points="20 6 9 17 4 12"/>', s),
  arrowL:  (s) => SVG('<path d="M19 12H5M12 19l-7-7 7-7"/>', s),
  arrowR:  (s) => SVG('<path d="M5 12h14M12 5l7 7-7 7"/>', s),
  refresh: (s) => SVG('<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>', s),
  globe:   (s) => SVG('<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>', s),
  monitor: (s) => SVG('<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', s),
  trash:   (s) => SVG('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>', s),
  send:    (s) => SVG('<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>', s),
  history: (s) => SVG('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/><polyline points="12 7 12 12 16 14"/>', s),
  sparkle: (s) => SVG('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>', s),
  wand:    (s) => SVG('<path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M15 9h0M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5"/>', s),
  headphones:(s)=> SVG('<path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>', s),
};
const ic = (name, sz) => `<span class="icon">${ICONS[name](sz || 14)}</span>`;

/* ─── DATABASE ─── */
const DB = {
  KEY: 'etb_v3',
  load() { try { return JSON.parse(localStorage.getItem(this.KEY)) || { sessions: [] }; } catch { return { sessions: [] }; } },
  save(d) { localStorage.setItem(this.KEY, JSON.stringify(d)); },
  all() { return this.load().sessions; },
  put(s) {
    const d = this.load();
    const i = d.sessions.findIndex(x => x.id === s.id);
    if (i >= 0) d.sessions[i] = s; else d.sessions.unshift(s);
    this.save(d);
  },
  del(id) { const d = this.load(); d.sessions = d.sessions.filter(s => s.id !== id); this.save(d); },
  clear() { this.save({ sessions: [] }); },
  stats() {
    const s = this.all().filter(x => x.done);
    const days = new Set(s.map(x => x.date)).size;
    const vocab = s.reduce((n, x) => n + (x.vocab?.length || 0), 0);
    const scores = s.map(x => x.score).filter(v => v != null);
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return { days, sess: s.length, vocab, avg };
  },
};

/* ─── TEACHER NAME ─── */
const Teacher = {
  KEY: 'etb_teacher',
  get() { return localStorage.getItem(this.KEY) || 'Quỳnh Anh'; },
  set(v) { localStorage.setItem(this.KEY, (v || '').trim() || 'Quỳnh Anh'); },
  initials() {
    const parts = this.get().trim().split(/\s+/);
    return ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase() || 'QA';
  },
};

/* ─── FLASHCARD CONFIG ─── */
const FC_FIELDS = [
  { k: 'w',   label: 'Từ vựng' },
  { k: 'ph',  label: 'Phiên âm' },
  { k: 'pos', label: 'Từ loại' },
  { k: 'm',   label: 'Nghĩa' },
  { k: 'e',   label: 'Ví dụ' },
];
let fcConfig = { front: ['w', 'ph'], back: ['m', 'pos', 'e'] };
function loadFcConfig() { try { const c = JSON.parse(localStorage.getItem('etb_fc')); if (c) fcConfig = c; } catch {} }
function saveFcConfig() { localStorage.setItem('etb_fc', JSON.stringify(fcConfig)); }

/* ─── POS ─── */
const POS_VI = { noun: 'danh từ', verb: 'động từ', adjective: 'tính từ', adverb: 'trạng từ', pronoun: 'đại từ', preposition: 'giới từ', conjunction: 'liên từ', interjection: 'thán từ', exclamation: 'thán từ', determiner: 'từ hạn định', numeral: 'số từ', article: 'mạo từ' };
const POS_LIST = ['danh từ','động từ','tính từ','trạng từ','giới từ','liên từ','đại từ','mạo từ','cụm từ','khác'];

/* ─── TOPIC vocab bank ─── */
const VOCAB_BANK = {
  travel: ['journey','destination','luggage','itinerary','accommodation','sightseeing','departure','souvenir','passport','delay'],
  shopping: ['bargain','discount','receipt','refund','brand','afford','expensive','customer','cashier','warranty'],
  food: ['delicious','recipe','ingredient','flavour','vegetarian','cuisine','appetizer','dessert','spicy','reservation'],
  work: ['colleague','deadline','salary','promotion','interview','schedule','meeting','responsibility','overtime','resume'],
  health: ['exercise','symptom','prescription','nutrition','recover','injury','appointment','wellbeing','diet','stress'],
  technology: ['device','application','software','update','download','password','wireless','data','screen','feature'],
  family: ['relative','sibling','generation','household','upbringing','relationship','support','gathering','tradition','bond'],
  environment: ['pollution','recycle','climate','sustainable','wildlife','renewable','waste','conservation','emission','habitat'],
  education: ['knowledge','assignment','curriculum','degree','lecture','scholarship','research','semester','tutor','revise'],
  hobby: ['leisure','passion','collection','amateur','enthusiast','relaxing','creative','outdoor','skill','routine'],
};
const TOPIC_ALIASES = {
  travel: ['travel','holiday','trip','tourism','vacation'],
  shopping: ['shop','shopping','market','money','buy'],
  food: ['food','restaurant','cooking','eat','meal','cuisine'],
  work: ['work','job','career','office','business','interview'],
  health: ['health','fitness','sport','body','medical','exercise'],
  technology: ['tech','technology','internet','computer','phone','device','ai'],
  family: ['family','friend','relationship','people','home'],
  environment: ['environment','nature','climate','green','pollution'],
  education: ['education','school','study','learning','university','student'],
  hobby: ['hobby','hobbies','leisure','free time','interest','music','art'],
};

/* ─── GRAMMAR by topic ─── */
const GRAMMAR_BY_TOPIC = {
  travel: ['Past Simple — kể chuyến đi đã qua','Present Perfect — "Have you ever been to...?"','be going to — kế hoạch du lịch','Prepositions of place (at/in/on)'],
  shopping: ['Comparatives & Superlatives — cheaper / the best','"I would like to..." / "I\'ll take it"','Countable & Uncountable + much/many','Question with "How much...?"'],
  food: ['Countable & Uncountable nouns','"Would you like...?" / "Can I have...?"','Imperatives — công thức nấu ăn','some / any / a lot of'],
  work: ['Present Perfect — kinh nghiệm làm việc','used to — công việc trước đây','Modal verbs — should / have to / must','Future plans — will / be going to'],
  health: ['should / shouldn\'t — lời khuyên','Present Simple — thói quen sinh hoạt','Adverbs of frequency','First Conditional — "If you exercise..."'],
  technology: ['Passive voice — "It is made by..."','Present Perfect — công nghệ mới','First Conditional','Relative clauses (which/that)'],
  family: ['Present Simple — mô tả người thân','used to — hồi nhỏ','Comparatives — so sánh thành viên','Possessive (\'s)'],
  environment: ['Passive voice','First & Second Conditional','should / must — trách nhiệm','Quantifiers — too much / too many'],
  education: ['Present Perfect Continuous','Reported speech','Modal verbs — can / could / be able to','Gerunds & Infinitives'],
  hobby: ['Present Simple + adverbs of frequency','like / love / enjoy + V-ing','"How often do you...?"','Comparatives'],
};
const GRAMMAR_DEFAULT = ['Present Simple vs Present Continuous','Past Simple','Present Perfect','Comparatives & Superlatives','Modal verbs (can/should/must)','First Conditional','Future: will vs be going to'];

/* ─── QUESTIONS by level ─── */
const QUESTION_TEMPLATES = {
  'A2': [
    'Do you like {t}? Why or why not?',
    'What is your favourite thing about {t}?',
    'How often do you do something with {t}?',
    'Can you describe {t} in a few words?',
    'Who do you usually talk about {t} with?',
    'When was the last time you thought about {t}?',
    'Is {t} popular in your country?',
    'What words do you know about {t}?',
    'Do you want to learn more about {t}? Why?',
    'How do you feel about {t}?',
    'What is easy or difficult about {t}?',
    'Can you give an example of {t}?',
  ],
  'B1': [
    'Have you ever had a good or bad experience with {t}?',
    'Why is {t} important to you?',
    'What do you usually do when you think about {t}?',
    'Can you describe a typical situation involving {t}?',
    'What would you recommend to a friend about {t}?',
    'How has {t} affected your life recently?',
    'What do most people in your country think about {t}?',
    'What are the good and bad sides of {t}?',
    'If you had more time, how would you explore {t}?',
    'What did you learn about {t} when you were younger?',
    'How do you usually deal with problems related to {t}?',
    'What would you like to change about {t}?',
  ],
  'B1+': [
    'What are the biggest challenges related to {t}?',
    'How has {t} changed in the last few years?',
    'Do you think {t} is more important today than in the past? Why?',
    'What advice would you give about {t} from your own experience?',
    'How is {t} different in your country compared to other countries?',
    'What role does {t} play in modern life?',
    'Do you think technology has changed {t}? How?',
    'What are some common misunderstandings about {t}?',
    'How would you explain {t} to someone who knows nothing about it?',
    'What factors make {t} successful or unsuccessful?',
    'Should the government do more about {t}? Why?',
    'How do you balance the pros and cons of {t}?',
  ],
  'B2': [
    'To what extent does {t} affect our daily lives?',
    'What are the main advantages and disadvantages of {t}?',
    'How do you think {t} will develop in the future?',
    'Some people think {t} is overrated — what is your opinion?',
    'If you could change one thing about {t}, what would it be and why?',
    'How does {t} influence society as a whole?',
    'What ethical issues are connected to {t}?',
    'To what degree should {t} be regulated?',
    'How might different generations view {t} differently?',
    'What would the world look like without {t}?',
    'How do cultural differences shape attitudes towards {t}?',
    'What is the relationship between {t} and personal happiness?',
  ],
};

/* ─── STATE ─── */
const S = {
  cur: null,
  view: 'dashboard',
  wb: { sec: 'vocab', ci: 0, flipped: false },
  timer: { secs: 1800, elapsed: 0, running: false, iv: null },
};

/* ─── PRESENT (student board sync) ─── */
const Present = {
  ch: ('BroadcastChannel' in window) ? new BroadcastChannel('etb-present') : null,
  state: { topic: '', board: '' },
  init() {
    if (this.ch) this.ch.onmessage = e => { if (e.data && e.data.type === 'hello') this.push(); };
  },
  push() {
    const data = JSON.stringify(this.state);
    localStorage.setItem('etb_present', data);
    if (this.ch) this.ch.postMessage(this.state);
  },
  setTopic(v) { this.state.topic = v; this.push(); },
  setBoard(v) { this.state.board = v; this.push(); },
};

/* ─── HELPERS ─── */
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = () => new Date().toLocaleDateString('vi-VN');
const fmtDur = s => { if (!s) return '0 phút'; const m = Math.floor(s / 60), ss = s % 60; return ss ? `${m}p ${ss}s` : `${m} phút`; };
const hlBlanks = s => s.replace(/\.\.\./g, '<mark>...</mark>');
function toast(msg, type = '') {
  const el = document.createElement('div');
  el.className = 'notif ' + type;
  el.innerHTML = msg;
  document.getElementById('notif-root').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
function matchTopicKey(topic) {
  const t = (topic || '').toLowerCase();
  for (const key in TOPIC_ALIASES) {
    if (TOPIC_ALIASES[key].some(a => t.includes(a))) return key;
  }
  return null;
}

/* ═══════════════════ APP ═══════════════════ */
const App = {
  showView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + name).classList.add('active');
    S.view = name;
    if (name === 'dashboard') this.renderDash();
    if (name === 'history') this.renderHist();
  },

  /* ── DASHBOARD ── */
  renderDash() {
    const st = DB.stats();
    document.getElementById('st-days').textContent = st.days;
    document.getElementById('st-sess').textContent = st.sess;
    document.getElementById('st-vocab').textContent = st.vocab;
    document.getElementById('st-avg').textContent = st.avg || '–';
    // teacher name
    document.getElementById('teacher-name').textContent = Teacher.get();
    document.getElementById('teacher-initials').textContent = Teacher.initials();
    document.getElementById('hero-greeting').innerHTML = `Chào cô <span style="font-style:italic">${esc(Teacher.get())}</span>, <em>sẵn sàng cho buổi học chưa?</em>`;
    // clock
    const now = new Date();
    document.getElementById('dash-clock').textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }) + ' · ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    // recent
    const sessions = DB.all().slice(0, 6);
    const el = document.getElementById('recent-list');
    if (!sessions.length) {
      el.innerHTML = `<div class="empty">
        <div class="ico">${ICONS.book(28)}</div>
        <h3>Chưa có buổi học nào</h3>
        <p>Nhấn "Soạn buổi học mới" ở trên để bắt đầu!</p>
      </div>`;
      return;
    }
    el.innerHTML = sessions.map(s => `
      <div class="session-row">
        <div class="sess-day">${s.dayNum || '?'}</div>
        <div class="sess-info">
          <div class="sess-topic">${esc(s.topic)}</div>
          <div class="sess-meta">${esc(s.date)} · ${esc(s.level)} · ${s.vocab?.length || 0} từ · ${fmtDur(s.elapsed)}</div>
        </div>
        ${s.score != null ? `<div class="sess-score ${s.score >= 80 ? 'good' : ''}">${s.score}<small>/100</small></div>` : '<div class="muted" style="font-size:12px">–</div>'}
        <button class="btn btn-ghost btn-icon sess-row-del" onclick="App.delSess('${s.id}')" title="Xóa">${ICONS.trash(14)}</button>
      </div>`).join('');
  },

  /* ── TEACHER NAME edit ── */
  editTeacher() {
    document.getElementById('teacher-input').value = Teacher.get();
    document.getElementById('teacher-modal').classList.add('active');
    setTimeout(() => document.getElementById('teacher-input').focus(), 50);
  },
  saveTeacher() {
    const v = document.getElementById('teacher-input').value.trim();
    Teacher.set(v);
    document.getElementById('teacher-modal').classList.remove('active');
    this.renderDash();
    toast('Đã lưu tên giáo viên', 'ok');
  },
  closeTeacherModal() {
    document.getElementById('teacher-modal').classList.remove('active');
  },

  /* ── NEW SESSION ── */
  newSession() {
    S.cur = {
      id: String(Date.now()),
      date: today(),
      dayNum: DB.all().filter(x => x.done).length + 1,
      topic: '', level: 'B1+',
      vocab: [], qs: [], patterns: [], grammar: '',
      elapsed: 0, score: null, notes: '', done: false, remembered: [],
    };
    this.showView('setup');
    this.initSetup();
  },

  /* ── SETUP ── */
  initSetup() {
    document.getElementById('inp-topic').value = '';
    document.getElementById('inp-level').value = 'B1+';
    document.getElementById('inp-vcount').value = '8';
    document.getElementById('inp-qcount').value = '5';
    document.getElementById('inp-grammar').value = '';
    this.renderFcConfig();
    this.buildVocabRows(8, []);
    this.buildQRows([
      'Have you ever ...? Tell me about it.',
      'What do you usually do when ...?',
      'How do you feel about ...?',
    ]);
    this.buildPatternRows([
      { p: 'I would like to ...', ex: ['I would like to try that.','I would like to know more.'] },
      { p: 'Could you ... please?', ex: ['Could you repeat that please?','Could you speak slowly please?'] },
    ]);
    this.renderGrammarChips('');
    document.getElementById('inp-topic').focus();
  },

  onTopicChange() { this.renderGrammarChips(document.getElementById('inp-topic').value); },

  renderFcConfig() {
    const mk = (side) => FC_FIELDS.map(f =>
      `<button class="chip toggle ${fcConfig[side].includes(f.k) ? 'on' : ''}" onclick="App.toggleFcField('${side}','${f.k}')">${esc(f.label)}</button>`
    ).join('');
    document.getElementById('cfg-front').innerHTML = `<span class="side-label">Mặt 1</span>` + mk('front');
    document.getElementById('cfg-back').innerHTML  = `<span class="side-label">Mặt 2</span>` + mk('back');
  },
  toggleFcField(side, k) {
    const arr = fcConfig[side], i = arr.indexOf(k);
    if (i >= 0) arr.splice(i, 1); else arr.push(k);
    if (!arr.length) arr.push(k);
    saveFcConfig(); this.renderFcConfig();
  },

  /* vocab rows (compact) */
  buildVocabRows(n, existing) {
    const c = document.getElementById('vocab-rows');
    let h = '';
    for (let i = 0; i < n; i++) {
      const v = existing[i] || { w: '', ph: '', pos: '', m: '', e: '' };
      h += this.vRowHTML(v);
    }
    c.innerHTML = h;
    this.updVBadge();
  },
  vRowHTML(v) {
    const posOpts = ['<option value="">— từ loại —</option>'].concat(POS_LIST.map(p => `<option ${v.pos === p ? 'selected' : ''}>${p}</option>`)).join('');
    return `<div class="v-card">
      <div class="v-row">
        <input class="v-w" placeholder="word" value="${esc(v.w)}" />
        <input class="v-ph" placeholder="/phiên âm/" value="${esc(v.ph)}" />
        <select class="v-pos">${posOpts}</select>
        <button class="v-del" onclick="App.delVRow(this)" title="Xóa">${ICONS.x(14)}</button>
      </div>
      <div class="v-extra">
        <input class="v-m" placeholder="nghĩa (tiếng Việt)" value="${esc(v.m)}" />
        <input class="v-e" placeholder="câu ví dụ" value="${esc(v.e)}" />
        <button class="btn btn-ghost btn-sm" onclick="App.lookupRow(this)" title="Tra Free Dictionary API">${ICONS.globe(12)} Tra</button>
      </div>
    </div>`;
  },
  delVRow(btn) {
    btn.closest('.v-card').remove();
    this.updVBadge();
  },
  updVBadge() {
    document.getElementById('vocab-badge').textContent = document.querySelectorAll('#vocab-rows .v-card').length;
  },
  addVocabRow() {
    const c = document.getElementById('vocab-rows');
    const d = document.createElement('div');
    d.innerHTML = this.vRowHTML({ w: '', ph: '', pos: '', m: '', e: '' });
    const card = d.firstElementChild;
    c.appendChild(card);
    card.querySelector('.v-w').focus();
    this.updVBadge();
  },

  /* questions */
  buildQRows(qs) {
    const c = document.getElementById('q-rows');
    c.innerHTML = '';
    qs.forEach(q => this._appendQRow(q));
  },
  _appendQRow(val = '') {
    const c = document.getElementById('q-rows');
    const n = c.querySelectorAll('.q-row').length + 1;
    const d = document.createElement('div');
    d.className = 'q-row';
    d.innerHTML = `<span class="q-num">${n}</span>
      <input class="q-txt" value="${esc(val)}" placeholder="Câu hỏi thảo luận..." />
      <button class="q-del" onclick="App._delQ(this)" title="Xóa">${ICONS.x(14)}</button>`;
    c.appendChild(d);
  },
  _delQ(btn) {
    btn.closest('.q-row').remove();
    document.querySelectorAll('#q-rows .q-row').forEach((r, i) => r.querySelector('.q-num').textContent = i + 1);
  },
  addQRow() {
    this._appendQRow();
    const a = document.querySelectorAll('#q-rows .q-txt');
    a[a.length - 1]?.focus();
  },

  genQuestions() {
    const topic = document.getElementById('inp-topic').value.trim();
    if (!topic) { toast('Nhập chủ đề trước đã!', 'err'); return; }
    const level = document.getElementById('inp-level').value;
    const qcount = parseInt(document.getElementById('inp-qcount').value) || 5;
    const n = this.buildQuestionsFor(topic, level, qcount);
    this.autoFillGrammar(true);
    toast(`Đã tạo ${n} câu hỏi cho trình độ <b>${esc(level)}</b> + gợi ý ngữ pháp`, 'ok');
  },

  autoFillGrammar(silent) {
    const key = matchTopicKey(document.getElementById('inp-topic').value);
    const list = key ? GRAMMAR_BY_TOPIC[key] : GRAMMAR_DEFAULT;
    const ta = document.getElementById('inp-grammar');
    let added = 0;
    list.forEach(g => { if (!ta.value.includes(g)) { ta.value = (ta.value.trim() ? ta.value.trim() + '\n' : '') + '• ' + g; added++; } });
    document.querySelectorAll('#gram-chips .chip').forEach(c => c.classList.add('on'));
    if (!silent) toast(added ? `Đã thêm ${added} điểm ngữ pháp` : 'Đã đủ gợi ý', 'ok');
  },

  buildPatternRows(pts) {
    const c = document.getElementById('pattern-rows');
    c.innerHTML = '';
    pts.forEach(pt => this._appendPRow(pt.p, pt.ex?.join('\n') || ''));
  },
  _appendPRow(p = '', ex = '') {
    const c = document.getElementById('pattern-rows');
    const d = document.createElement('div');
    d.className = 'pattern-row';
    d.innerHTML = `<input class="p-pat" value="${esc(p)}" placeholder="e.g. I'd like to ..." />
      <textarea class="p-ex" rows="2" placeholder="Ví dụ (mỗi dòng 1 câu)">${esc(ex)}</textarea>
      <div class="p-actions"><button class="btn btn-ghost btn-sm" onclick="this.closest('.pattern-row').remove()">${ICONS.x(12)} Xóa</button></div>`;
    c.appendChild(d);
  },
  addPatternRow() { this._appendPRow(); },

  renderGrammarChips(topic) {
    const key = matchTopicKey(topic);
    const list = key ? GRAMMAR_BY_TOPIC[key] : GRAMMAR_DEFAULT;
    document.getElementById('gram-topic-name').textContent = key ? `(${key})` : '(chủ đề chung)';
    document.getElementById('gram-chips').innerHTML = list.map(g =>
      `<button class="chip suggest" onclick="App.addGrammar(this,'${esc(g).replace(/'/g, "\\'")}')">+ ${esc(g)}</button>`
    ).join('');
  },
  addGrammar(btn, text) {
    const ta = document.getElementById('inp-grammar');
    const line = '• ' + text;
    if (ta.value.includes(text)) { toast('Đã có trong ghi chú'); return; }
    ta.value = (ta.value.trim() ? ta.value.trim() + '\n' : '') + line;
    btn.classList.add('on');
  },

  /* ── auto-generate ── */
  async autoGenerate() {
    const topic = document.getElementById('inp-topic').value.trim();
    if (!topic) { toast('Nhập chủ đề trước đã!', 'err'); return; }
    const level = document.getElementById('inp-level').value;
    const vcount = parseInt(document.getElementById('inp-vcount').value) || 8;
    const qcount = parseInt(document.getElementById('inp-qcount').value) || 5;
    const btn = document.getElementById('gen-btn');
    const old = btn.innerHTML; btn.disabled = true;
    const key = matchTopicKey(topic);
    let vmsg = '';
    if (key && VOCAB_BANK[key]) {
      const words = VOCAB_BANK[key].slice(0, vcount);
      this.buildVocabRows(vcount, words.map(w => ({ w, ph: '', pos: '', m: '', e: '' })));
      const ok = await this.autoFillDict(btn);
      vmsg = `${words.length} từ (tra ${ok}/${words.length})`;
    } else {
      vmsg = 'chủ đề chưa có từ vựng sẵn — bạn tự nhập từ';
    }
    const qn = this.buildQuestionsFor(topic, level, qcount);
    this.autoFillGrammar(true);
    btn.innerHTML = old; btn.disabled = false;
    toast(`Đã tạo: ${vmsg} · ${qn} câu hỏi (${esc(level)}) · gợi ý ngữ pháp`, 'ok');
  },

  buildQuestionsFor(topic, level, count) {
    const tpl = QUESTION_TEMPLATES[level] || QUESTION_TEMPLATES['B1+'];
    const t = topic.toLowerCase();
    const list = tpl.slice(0, Math.max(1, count)).map(q => q.replace(/\{t\}/g, t));
    this.buildQRows(list);
    return list.length;
  },

  /* ── dictionary ── */
  async fetchWord(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim().toLowerCase())}`);
    if (!res.ok) throw new Error('notfound');
    const data = await res.json(); const en = data[0];
    let ph = en.phonetic || '';
    if (!ph && en.phonetics) ph = (en.phonetics.find(p => p.text) || {}).text || '';
    const mn = en.meanings && en.meanings[0];
    const posEn = mn ? mn.partOfSpeech : '';
    const pos = POS_VI[posEn] || posEn || '';
    let def = '', ex = '';
    if (mn && mn.definitions) {
      def = mn.definitions[0].definition || '';
      ex = (mn.definitions.find(d => d.example) || {}).example || '';
    }
    return { ph, pos, m: def, e: ex };
  },

  async lookupRow(btn) {
    const card = btn.closest('.v-card');
    const w = card.querySelector('.v-w').value.trim();
    if (!w) { toast('Nhập từ trước!', 'err'); return; }
    const old = btn.innerHTML; btn.innerHTML = `<span class="spin">${ICONS.refresh(12)}</span> Đang tra...`; btn.disabled = true;
    try {
      const r = await this.fetchWord(w);
      if (r.ph && !card.querySelector('.v-ph').value) card.querySelector('.v-ph').value = r.ph;
      if (r.pos) card.querySelector('.v-pos').value = POS_LIST.includes(r.pos) ? r.pos : 'khác';
      if (r.m && !card.querySelector('.v-m').value) card.querySelector('.v-m').value = r.m;
      if (r.e && !card.querySelector('.v-e').value) card.querySelector('.v-e').value = r.e;
      toast(`"${esc(w)}" đã tra xong`, 'ok');
    } catch {
      toast(`Không tìm thấy "${esc(w)}"`, 'err');
    }
    btn.innerHTML = old; btn.disabled = false;
  },

  async autoFillDict(btn) {
    const cards = [...document.querySelectorAll('#vocab-rows .v-card')].filter(c => c.querySelector('.v-w').value.trim());
    if (!cards.length) return 0;
    let ok = 0;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i], w = card.querySelector('.v-w').value.trim();
      if (btn) btn.innerHTML = `<span class="spin">${ICONS.refresh(12)}</span> Tra ${i + 1}/${cards.length}`;
      try {
        const r = await this.fetchWord(w);
        if (r.ph && !card.querySelector('.v-ph').value) card.querySelector('.v-ph').value = r.ph;
        if (r.pos) card.querySelector('.v-pos').value = POS_LIST.includes(r.pos) ? r.pos : 'khác';
        if (r.m && !card.querySelector('.v-m').value) card.querySelector('.v-m').value = r.m;
        if (r.e && !card.querySelector('.v-e').value) card.querySelector('.v-e').value = r.e;
        ok++;
      } catch {}
    }
    return ok;
  },

  /* ── collect ── */
  collectSetup() {
    const topic = document.getElementById('inp-topic').value.trim();
    if (!topic) { toast('Vui lòng nhập chủ đề!', 'err'); return null; }
    const vocab = [];
    document.querySelectorAll('#vocab-rows .v-card').forEach(c => {
      const w = c.querySelector('.v-w').value.trim();
      if (w) vocab.push({
        w,
        ph: c.querySelector('.v-ph').value.trim(),
        pos: c.querySelector('.v-pos').value,
        m: c.querySelector('.v-m').value.trim(),
        e: c.querySelector('.v-e').value.trim(),
      });
    });
    if (!vocab.length) { toast('Cần ít nhất 1 từ vựng!', 'err'); return null; }
    const qs = [];
    document.querySelectorAll('#q-rows .q-txt').forEach(i => { if (i.value.trim()) qs.push(i.value.trim()); });
    const patterns = [];
    document.querySelectorAll('#pattern-rows .pattern-row').forEach(r => {
      const p = r.querySelector('.p-pat').value.trim();
      if (p) patterns.push({ p, ex: r.querySelector('.p-ex').value.trim().split('\n').filter(Boolean) });
    });
    return {
      topic,
      level: document.getElementById('inp-level').value,
      vocab, qs, patterns,
      grammar: document.getElementById('inp-grammar').value.trim(),
    };
  },

  /* ── START TEACH ── */
  startTeach() {
    const data = this.collectSetup(); if (!data) return;
    Object.assign(S.cur, data);
    this.renderTeach();
    this.showView('teach');
    Present.setTopic(S.cur.topic);
    Present.setBoard('');
    document.getElementById('bp-input').value = '';
    this.onBoardInput();
    this.startTimer();
  },

  renderTeach() {
    const c = S.cur;
    document.getElementById('t-topic').textContent = c.topic;
    document.getElementById('t-level').textContent = c.level + ' · Buổi ' + c.dayNum;
    document.getElementById('t-day').textContent = `Ngày ${c.dayNum}`;
    document.getElementById('nc-vocab').textContent = c.vocab.length;
    document.getElementById('nc-q').textContent = c.qs.length;
    document.getElementById('nc-p').textContent = c.patterns.length;
    S.wb = { sec: 'vocab', ci: 0, flipped: false };
    this.renderCard(); this.renderQs(); this.renderPatterns();
    document.getElementById('grammar-txt').textContent = c.grammar || '(Chưa có ghi chú ngữ pháp)';
    this.setSec('vocab');
  },

  /* ── FLASHCARD ── */
  faceHTML(v, fields) {
    let h = '';
    fields.forEach(k => {
      if (k === 'w'   && v.w)  h += `<div class="fc-word">${esc(v.w)}</div>`;
      if (k === 'ph'  && v.ph) h += `<div class="fc-phon">${esc(v.ph.startsWith('/') ? v.ph : '/' + v.ph + '/')}</div>`;
      if (k === 'pos' && v.pos)h += `<div class="fc-pos"><span class="chip accent">${esc(v.pos)}</span></div>`;
      if (k === 'm'   && v.m)  h += `<div class="fc-mean">${esc(v.m)}</div>`;
      if (k === 'e'   && v.e)  h += `<div class="fc-ex">"${esc(v.e)}"</div>`;
    });
    return h || '<div class="fc-empty">(trống — chọn field ở Setup)</div>';
  },
  renderCard() {
    const v = S.cur.vocab[S.wb.ci] || {};
    const stage = document.getElementById('fc-stage');
    const total = S.cur.vocab.length;
    stage.innerHTML = `<div class="fc ${S.wb.flipped ? 'flipped' : ''}" id="the-card" onclick="App.flipCard()">
      <div class="fc-inner">
        <div class="fc-face fc-front fade">
          <span class="fc-tag">Mặt trước${v.pos ? ' · ' + esc(v.pos) : ''}</span>
          <span class="fc-prog-tag">${S.wb.ci + 1} / ${total}</span>
          <div class="fc-rule"></div>
          ${this.faceHTML(v, fcConfig.front)}
          <span class="fc-hint">CLICK ĐỂ LẬT</span>
        </div>
        <div class="fc-face fc-back">
          <span class="fc-tag">Mặt sau</span>
          <span class="fc-prog-tag">${S.wb.ci + 1} / ${total}</span>
          <div class="fc-rule"></div>
          ${this.faceHTML(v, fcConfig.back)}
          <span class="fc-hint">CLICK ĐỂ LẬT</span>
        </div>
      </div></div>`;
    document.getElementById('fc-prog').textContent = `${S.wb.ci + 1} / ${total}`;
  },
  flipCard() { S.wb.flipped = !S.wb.flipped; document.getElementById('the-card')?.classList.toggle('flipped', S.wb.flipped); },
  prevCard() { if (S.wb.ci > 0) { S.wb.ci--; S.wb.flipped = false; this.renderCard(); } },
  nextCard() { if (S.wb.ci < S.cur.vocab.length - 1) { S.wb.ci++; S.wb.flipped = false; this.renderCard(); } },

  renderQs() {
    const el = document.getElementById('q-display');
    if (!S.cur.qs.length) {
      el.innerHTML = `<div class="empty"><div class="ico">${ICONS.question(28)}</div><h3>Không có câu hỏi</h3></div>`;
      return;
    }
    el.innerHTML = S.cur.qs.map((q, i) => `
      <div class="q-display-item ${i === 0 ? 'lit' : ''}">
        <div class="q-num-bubble">${i + 1}</div>
        <div class="q-text-big" onclick="this.closest('.q-display-item').classList.toggle('lit')">${esc(q)}</div>
        <button class="btn btn-secondary btn-sm q-send" onclick="App.sendToBoard('${esc(q).replace(/'/g, "\\'")}')">${ICONS.send(12)} Bảng HV</button>
      </div>`).join('');
  },

  renderPatterns() {
    const el = document.getElementById('pt-display');
    if (!S.cur.patterns.length) {
      el.innerHTML = `<div class="empty"><div class="ico">${ICONS.chat(28)}</div><h3>Không có mẫu câu</h3></div>`;
      return;
    }
    el.innerHTML = S.cur.patterns.map(pt => `<div class="pt-item">
      <div class="pt-template">${hlBlanks(esc(pt.p))}</div>
      ${pt.ex?.length ? `<div class="pt-examples">${pt.ex.map(e => `<p>${esc(e)}</p>`).join('')}</div>` : ''}
    </div>`).join('');
  },

  setSec(sec) {
    S.wb.sec = sec;
    document.querySelectorAll('.nav-btn[data-sec]').forEach(b => b.classList.toggle('active', b.dataset.sec === sec));
    document.querySelectorAll('.wb-sec').forEach(s => s.classList.remove('active'));
    document.getElementById('wb-' + sec)?.classList.add('active');
  },

  /* ── STUDENT BOARD ── */
  onBoardInput() {
    const v = document.getElementById('bp-input').value;
    const pv = document.getElementById('bp-preview');
    pv.textContent = v.trim() ? v : '(trống)';
    pv.classList.toggle('empty', !v.trim());
    Present.setBoard(v);
  },
  sendToBoard(text) {
    const ta = document.getElementById('bp-input');
    ta.value = (ta.value.trim() ? ta.value.trim() + '\n' : '') + text;
    this.onBoardInput();
    if (document.getElementById('board-panel').classList.contains('collapsed')) this.toggleBoardPanel();
    toast('Đã đẩy lên bảng học viên', 'ok');
  },
  clearBoard() { document.getElementById('bp-input').value = ''; this.onBoardInput(); },
  toggleBoardPanel() { document.getElementById('board-panel').classList.toggle('collapsed'); },
  openStudent() {
    Present.push();
    const w = window.open('student.html', 'etb_student', 'width=1280,height=760');
    if (!w) toast('Trình duyệt chặn popup. Hãy cho phép popup rồi thử lại.', 'err');
    else toast('Đã mở màn hình HV. Trên Google Meet: "Present a window" → chọn cửa sổ này', 'ok');
  },

  /* ── TIMER ── */
  startTimer() {
    S.timer = { secs: 1800, elapsed: 0, running: true, iv: null };
    this._tick();
    S.timer.iv = setInterval(() => {
      if (!S.timer.running) return;
      S.timer.secs--; S.timer.elapsed++;
      this._tick();
      if (S.timer.secs === 0) toast('Hết 30 phút!', 'ok');
    }, 1000);
  },
  _tick() {
    const el = document.getElementById('timer-btn');
    const s = S.timer.secs, a = Math.abs(s);
    el.textContent = (s < 0 ? '+' : '') + String(Math.floor(a / 60)).padStart(2, '0') + ':' + String(a % 60).padStart(2, '0');
    el.classList.remove('warn', 'over');
    if (s < 0) el.classList.add('over');
    else if (s < 300) el.classList.add('warn');
  },
  toggleTimer() {
    S.timer.running = !S.timer.running;
    document.getElementById('timer-btn').style.opacity = S.timer.running ? '1' : '.5';
  },
  stopTimer() { clearInterval(S.timer.iv); S.timer.running = false; S.cur.elapsed = S.timer.elapsed; },

  /* ── END / SUMMARY ── */
  endSession() {
    if (!confirm('Kết thúc buổi học và chuyển sang tổng kết?')) return;
    this.stopTimer();
    this.renderSummary();
    this.showView('summary');
  },
  renderSummary() {
    const c = S.cur;
    document.getElementById('sum-hero-topic').textContent = c.topic;
    document.getElementById('sum-meta').textContent = `Ngày ${c.dayNum} · ${esc(c.level)} · ${fmtDur(c.elapsed)} · ${c.vocab.length} từ vựng`;
    document.getElementById('score-range').value = '75';
    this.updateScore(75);
    document.getElementById('sum-notes').value = '';
    document.getElementById('recall-grid').innerHTML = c.vocab.map(v =>
      `<div class="recall-chip" onclick="this.classList.toggle('ok')" data-w="${esc(v.w)}"><span class="ck">${ICONS.check(12)}</span>${esc(v.w)}</div>`
    ).join('');
  },
  updateScore(v) {
    v = parseInt(v);
    const el = document.getElementById('score-big');
    el.textContent = v;
    el.classList.toggle('good', v >= 80);
    el.classList.toggle('bad', v < 60);
  },
  saveSession() {
    const c = S.cur;
    c.score = parseInt(document.getElementById('score-range').value);
    c.notes = document.getElementById('sum-notes').value.trim();
    c.remembered = [...document.querySelectorAll('.recall-chip.ok')].map(el => el.dataset.w);
    c.done = true;
    DB.put(c);
    toast('Đã lưu buổi học!', 'ok');
    setTimeout(() => this.showView('dashboard'), 700);
  },

  /* ── HISTORY ── */
  renderHist() {
    const sessions = DB.all();
    const el = document.getElementById('hist-body');
    if (!sessions.length) {
      el.innerHTML = `<div class="empty"><div class="ico">${ICONS.history(28)}</div><h3>Chưa có buổi học nào</h3></div>`;
      return;
    }
    el.innerHTML = `<div class="session-list">${sessions.map(s => `
      <div class="session-row">
        <div class="sess-day">${s.dayNum || '?'}</div>
        <div class="sess-info">
          <div class="sess-topic">${esc(s.topic)}</div>
          <div class="sess-meta">${esc(s.date)} · ${esc(s.level)} · ${s.vocab?.length || 0} từ · ${fmtDur(s.elapsed)}${s.remembered?.length ? ` · nhớ ${s.remembered.length}/${s.vocab?.length || 0}` : ''}${s.notes ? '<br><em style="color:var(--muted-soft)">' + esc(s.notes.substring(0, 100)) + (s.notes.length > 100 ? '...' : '') + '</em>' : ''}</div>
        </div>
        ${s.score != null ? `<div class="sess-score ${s.score >= 80 ? 'good' : ''}">${s.score}<small>/100</small></div>` : ''}
        <button class="btn btn-ghost btn-icon sess-row-del" onclick="App.delSess('${s.id}')" title="Xóa">${ICONS.trash(14)}</button>
      </div>`).join('')}</div>`;
  },
  delSess(id) {
    if (!confirm('Xóa buổi học này?')) return;
    DB.del(id); this.renderDash(); this.renderHist();
    toast('Đã xóa');
  },
  clearAll() {
    if (!confirm('Xóa TẤT CẢ lịch sử buổi học? Không thể khôi phục!')) return;
    DB.clear(); this.renderHist(); this.renderDash();
    toast('Đã xóa tất cả');
  },

  /* ── KEYBOARD ── */
  handleKey(e) {
    if (S.view !== 'teach') return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (S.wb.sec === 'vocab') {
      if (e.key === 'ArrowRight') { e.preventDefault(); this.nextCard(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); this.prevCard(); }
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this.flipCard(); }
    }
    if (e.key === '1') this.setSec('vocab');
    if (e.key === '2') this.setSec('questions');
    if (e.key === '3') this.setSec('patterns');
    if (e.key === '4') this.setSec('grammar');
  },
};

/* ─── ICON INJECTION (mount HTML icons after load) ─── */
function injectIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    const sz = parseInt(el.dataset.size) || 14;
    if (ICONS[name]) el.innerHTML = ICONS[name](sz);
  });
}

/* ─── INIT ─── */
function init() {
  loadFcConfig();
  Present.init();
  injectIcons();
  document.addEventListener('keydown', e => App.handleKey(e));
  App.renderDash();
  // teacher modal close on overlay click
  document.getElementById('teacher-modal').addEventListener('click', (e) => {
    if (e.target.id === 'teacher-modal') App.closeTeacherModal();
  });
  // enter to save
  document.getElementById('teacher-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') App.saveTeacher();
    if (e.key === 'Escape') App.closeTeacherModal();
  });
}

document.addEventListener('DOMContentLoaded', init);
