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

/* ─── DRAFT (autosave để khôi phục buổi học dở) ─── */
const Draft = {
  KEY: 'etb_draft',
  load() { try { return JSON.parse(localStorage.getItem(this.KEY)); } catch { return null; } },
  save(d) { try { localStorage.setItem(this.KEY, JSON.stringify({ ...d, _ts: Date.now() })); } catch {} },
  clear() { localStorage.removeItem(this.KEY); },
};

function snapshotDraft() {
  if (!S || !S.cur) return;
  if (S.view === 'setup') {
    const $ = id => document.getElementById(id);
    Draft.save({
      view: 'setup',
      id: S.cur.id, date: S.cur.date, dayNum: S.cur.dayNum,
      topic: $('inp-topic')?.value || '',
      level: $('inp-level')?.value || 'B1+',
      vcount: $('inp-vcount')?.value || '8',
      qcount: $('inp-qcount')?.value || '5',
      grammar: $('inp-grammar')?.value || '',
      vocab: [...document.querySelectorAll('#vocab-rows .v-card')].map(c => ({
        w: c.querySelector('.v-w')?.value || '',
        ph: c.querySelector('.v-ph')?.value || '',
        pos: c.querySelector('.v-pos')?.value || '',
        m: c.querySelector('.v-m')?.value || '',
        e: c.querySelector('.v-e')?.value || '',
      })),
      qs: [...document.querySelectorAll('#q-rows .q-txt')].map(i => i.value),
      patterns: [...document.querySelectorAll('#pattern-rows .pattern-row')].map(r => ({
        p: r.querySelector('.p-pat')?.value || '',
        ex: (r.querySelector('.p-ex')?.value || '').split('\n').filter(Boolean),
      })),
    });
  } else if (S.view === 'teach') {
    Draft.save({
      view: 'teach',
      cur: { ...S.cur, elapsed: (S.timer && S.timer.elapsed) || S.cur.elapsed || 0 },
      board: document.getElementById('bp-input')?.value || '',
    });
  }
}

let _draftDebounce = null;
function debouncedDraftSave() {
  clearTimeout(_draftDebounce);
  _draftDebounce = setTimeout(snapshotDraft, 1200);
}

/* ─── AI (Gemini) — sinh câu hỏi thông minh ─── */
const AI = {
  KEY_STORAGE: 'etb_ai_key',
  MODEL: 'gemini-2.0-flash',
  get key() { return (localStorage.getItem(this.KEY_STORAGE) || '').trim(); },
  set key(v) {
    const t = (v || '').trim();
    if (t) localStorage.setItem(this.KEY_STORAGE, t);
    else localStorage.removeItem(this.KEY_STORAGE);
  },
  enabled() { return !!this.key; },

  async _call(prompt, opts, overrideKey) {
    const key = overrideKey || this.key;
    if (!key) throw new Error('Chưa có API key');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL}:generateContent?key=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: Object.assign({ temperature: 0.9, maxOutputTokens: 1024 }, opts || {}),
      }),
    });
    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try { const e = await res.json(); msg = e?.error?.message || msg; } catch {}
      throw new Error(msg);
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Phản hồi rỗng từ Gemini');
    return text;
  },

  async generateQuestions(topic, level, count, vocab) {
    const text = await this._call(buildQuestionPrompt(topic, level, count, vocab));
    const cleaned = text.replace(/^```(?:json)?\s*/m, '').replace(/\s*```\s*$/m, '').trim();
    let arr;
    try { arr = JSON.parse(cleaned); }
    catch {
      const m = cleaned.match(/\[[\s\S]*\]/);
      if (m) { try { arr = JSON.parse(m[0]); } catch {} }
    }
    if (!Array.isArray(arr)) throw new Error('AI không trả về JSON array hợp lệ');
    return arr.map(s => String(s).trim()).filter(Boolean);
  },

  async test(explicitKey) {
    return await this._call('Reply with the single word: ok', { maxOutputTokens: 10, temperature: 0 }, explicitKey);
  },
};

function buildQuestionPrompt(topic, level, count, vocab) {
  const guide = {
    'A2': 'simple present and past tenses, common everyday vocabulary, short concrete questions',
    'B1': 'present perfect, basic conditionals, questions about experiences and personal opinions',
    'B1+': 'comparisons, abstract concepts, modal verbs, more nuanced opinions and reasoning',
    'B2': 'hypotheticals, abstract reasoning, complex grammar, debate-style questions',
  };
  const vocabHint = vocab && vocab.length
    ? `\n\nThe student is practicing these target vocabulary words today: ${vocab.slice(0, 12).join(', ')}.\nNaturally weave 1-2 of these words into 1-2 of your questions (do NOT force more than that).`
    : '';
  return `You are an experienced ESL teacher creating discussion questions for a 1-on-1 English conversation lesson.

Topic: "${topic}"
Student CEFR level: ${level} — ${guide[level] || guide['B1+']}
Number of questions: ${count}${vocabHint}

Requirements:
- Each question must sound natural, like something a thoughtful teacher would actually ask in a real conversation lesson.
- Mix question types: personal experience, opinions, hypotheticals ("if you could..."), comparisons, "tell me about a time when...", "what would you do if...".
- Avoid rigid templates like "What do you think about ${topic}?" — be creative and specific to the topic.
- Match the language complexity exactly to the level described above.
- Every question must have a different shape; do not repeat the same structure.
- Questions should naturally lead to longer, richer answers (avoid yes/no-only questions).

Output: ONLY a JSON array of exactly ${count} strings. No markdown fences, no explanation, no extra text.

Format example:
["Question 1?", "Question 2?", "Question 3?"]`;
}

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

/* ─── QUESTIONS hand-crafted theo từng (chủ đề × trình độ) ─── */
/* Mỗi nhóm 8 câu native-sounding, KHÔNG có placeholder {t} — soạn riêng cho chủ đề. */
const TOPIC_QUESTIONS = {
  travel: {
    'A2': [
      'Where would you like to go on holiday next?',
      'What is the best place you have ever visited?',
      'Do you prefer travelling by plane, train, or car? Why?',
      'What do you usually pack in your luggage?',
      'Have you ever been to another country?',
      'Who do you like to travel with — family or friends?',
      'What kind of trip do you enjoy: beach, city, or mountain?',
      'What food do you try when you visit a new place?',
    ],
    'B1': [
      'Tell me about a trip that did not go as planned. What happened?',
      'How do you usually prepare for a holiday — plan everything or improvise?',
      'What is the most beautiful place you have ever travelled to?',
      'If you could spend a month anywhere in the world, where would you go?',
      'Have you ever had a problem with luggage or accommodation while travelling?',
      'What is something travelling has taught you that school did not?',
      'Do you keep souvenirs or photos? Which means more to you?',
      'What advice would you give a friend visiting your hometown for the first time?',
    ],
    'B1+': [
      'How has the way people travel changed since smartphones became common?',
      'Some say cheap flights have ruined travel. Do you agree?',
      'What is the difference between being a tourist and being a traveller?',
      'Tell me about a destination that completely surprised you — for better or worse.',
      'How do you handle the gap between expectations and reality when travelling?',
      'Is travelling a luxury or a basic part of modern life now?',
      'What is one travel tradition or ritual you always follow?',
      'How does travelling alone compare to travelling with someone you love?',
    ],
    'B2': [
      'To what extent does mass tourism damage the places we love to visit?',
      'Some argue you only truly understand a culture by living there, not visiting. What is your view?',
      'Has Instagram changed why and how people travel? Is that good or bad?',
      'Should certain places limit the number of tourists they accept each year? Why?',
      'What is the relationship between travel and personal growth — is it overrated?',
      'If teleportation existed and travel was instant, would something important be lost?',
      'How do you weigh the carbon footprint of flying against the cultural value of travel?',
      'Imagine no one could leave their country for a decade. How would the world change?',
    ],
  },
  shopping: {
    'A2': [
      'What do you usually buy at the supermarket?',
      'Do you like shopping for clothes? Why or why not?',
      'How often do you go shopping?',
      'Where do you shop most: online or in physical stores?',
      'What was the last thing you bought?',
      'Do you take a shopping list with you?',
      'Is it easy to find a bargain in your city?',
      'What do you do when something you bought is broken?',
    ],
    'B1': [
      'Tell me about a great bargain you found recently.',
      'Are you a planner or an impulse buyer when you shop?',
      'Have you ever returned something? What was the reason?',
      'How important is the brand name when you buy something?',
      'What is the best place in your city for cheap shopping?',
      'Do you prefer shopping alone or with someone? Why?',
      'Have you ever bought something you regretted later?',
      'How do you decide if a price is fair?',
    ],
    'B1+': [
      'How has online shopping changed the way you spend money?',
      'Some say physical stores will disappear in 20 years. Do you agree?',
      'Is it better to buy cheap and replace often, or pay more for quality?',
      'What do you think about Black Friday and the culture of constant sales?',
      'How much do brands really influence your buying decisions — be honest?',
      'Tell me about something you bought recently that was genuinely worth it.',
      'Do you trust customer reviews when shopping online?',
      'What is the difference between needing something and wanting it?',
    ],
    'B2': [
      'How does targeted advertising shape the way people consume?',
      'Is consumer culture a sign of progress, or a problem we should rethink?',
      'To what extent are we responsible for the working conditions behind cheap products?',
      'How might shopping habits look 50 years from now?',
      'Some argue fast fashion is destroying both creativity and the planet. What is your take?',
      'Should governments regulate how much advertising children are exposed to?',
      'What is the psychological cost of having endless choice in supermarkets?',
      'How do you balance enjoying nice things with living simply?',
    ],
  },
  food: {
    'A2': [
      'What is your favourite food?',
      'Do you cook at home or eat out more often?',
      'What did you have for breakfast today?',
      'Are you a vegetarian, or do you eat meat?',
      'What food do you not like? Why?',
      'Can you describe a typical meal in your family?',
      'What is a popular food from your country?',
      'Do you like spicy food?',
    ],
    'B1': [
      'Tell me about the best meal you have ever had.',
      'Have you ever tried a food from another culture and loved it?',
      'Can you cook? What is your speciality?',
      'What is the difference between a good restaurant and a great one?',
      'Do you check the menu online before going to a restaurant?',
      'Have you ever had a terrible meal in a restaurant?',
      'What food reminds you of your childhood?',
      'How important is food when you travel?',
    ],
    'B1+': [
      'How have eating habits changed in your country in the last 20 years?',
      'Is fast food really as bad as people say, or is the issue more nuanced?',
      'Do food delivery apps make us lazier or just busier?',
      'How does food connect people in your family or community?',
      'What role does social media play in deciding where we eat?',
      'Some chefs become celebrities. What does that say about modern culture?',
      'Is being vegetarian a personal choice or a moral one?',
      'How do you feel about cooking — is it relaxing therapy or a daily chore?',
    ],
    'B2': [
      'To what extent should governments tax unhealthy food to reduce obesity?',
      'How does food waste in rich countries compare with food shortages in poorer ones?',
      'Should lab-grown meat replace traditional meat? What would be lost?',
      'How has the rise of veganism changed cultural attitudes towards food?',
      'Is the idea of "authentic" food meaningful, or just clever marketing?',
      'What is the relationship between food, identity, and nationalism?',
      'Should restaurants be required to display calorie counts and carbon footprints?',
      'How do you weigh tradition against innovation when it comes to cooking?',
    ],
  },
  work: {
    'A2': [
      'What is your job? Or what job would you like?',
      'Do you prefer working in a team or alone?',
      'What time do you usually start work?',
      'What do you do on a typical day at work?',
      'Is your job easy or difficult?',
      'Do you have a long lunch break?',
      'Who is your favourite colleague? Why?',
      'What was your first job?',
    ],
    'B1': [
      'Tell me about a project you are proud of.',
      'Have you ever had a difficult boss? How did you handle it?',
      'What skills do you use most at work?',
      'Do you prefer a fixed schedule or flexible hours?',
      'What was your hardest day at work recently?',
      'If you could change one thing about your job, what would it be?',
      'How do you switch off from work at the end of the day?',
      'Have you ever helped a colleague who was struggling?',
    ],
    'B1+': [
      'How has remote work changed your relationship with colleagues?',
      'Is loyalty to one company still valuable, or should people change jobs often?',
      'What is the most useful thing you have learned outside of formal education?',
      'How do you handle stress and deadlines?',
      'Some companies offer unlimited vacation. Does that actually work in practice?',
      'What is the real difference between a manager and a leader?',
      'Tell me about a time you disagreed with a decision at work.',
      'Do you think your generation has it easier or harder than your parents at work?',
    ],
    'B2': [
      'To what extent will AI replace traditional white-collar jobs?',
      'Is the four-day week a realistic future, or just a privilege for some industries?',
      'How should companies balance profit with employee wellbeing?',
      'Has so-called "hustle culture" done more harm than good?',
      'Should there be a legal cap on how much a CEO can earn compared with the lowest-paid worker?',
      'How does meaningful work compare to well-paid work in importance?',
      'What is the role of unions in the modern workplace?',
      'How might the very concept of "a career" change for people born today?',
    ],
  },
  health: {
    'A2': [
      'Do you exercise often? What do you do?',
      'What time do you usually go to sleep?',
      'Do you eat fruit and vegetables every day?',
      'When was the last time you went to the doctor?',
      'How do you feel when you do not sleep enough?',
      'Do you drink enough water?',
      'What sport do you like to watch or play?',
      'What do you do to relax?',
    ],
    'B1': [
      'Have you ever tried to start a new healthy habit? Did it last?',
      'Tell me about the last time you were sick.',
      'How do you take care of your mental health?',
      'What is your opinion on diets — do any of them really work?',
      'Do you trust health advice you read online?',
      'Have you ever recovered from an injury? How did you feel?',
      'Is it harder to stay healthy as you get older?',
      'What advice would you give a friend who wants to get fit?',
    ],
    'B1+': [
      'How has the pandemic changed people\'s attitudes towards health?',
      'Is it possible to be truly healthy without giving anything up?',
      'Some say sitting is the new smoking. What is your view?',
      'How much should employers be responsible for employee wellbeing?',
      'Tell me about a small change that made a big difference to your health.',
      'Is healthcare in your country fair to everyone?',
      'How do you balance work, sleep, and exercise?',
      'What is the most ridiculous health trend you have seen recently?',
    ],
    'B2': [
      'To what extent should governments fund preventative healthcare versus treatment?',
      'How has social media affected young people\'s body image and mental health?',
      'Should access to a gym and healthy food be considered a basic right?',
      'How do you weigh personal freedom against public health — for example, smoking laws?',
      'Is the wellness industry helping or exploiting people?',
      'What is the relationship between purpose in life and physical health?',
      'Should genetic testing for disease risk become routine? What are the ethical implications?',
      'How might longer human lifespans change the way we structure our lives?',
    ],
  },
  technology: {
    'A2': [
      'How many hours a day do you use your phone?',
      'What is your favourite app and why?',
      'Can you remember life before smartphones?',
      'Do you like new technology, or do you prefer old things?',
      'What was the first computer or phone you used?',
      'Do you read messages or call people more often?',
      'What do you do when your wifi stops working?',
      'Are you good at remembering passwords?',
    ],
    'B1': [
      'Tell me about a piece of technology you could not live without.',
      'Have you ever had a problem because of technology — like losing files?',
      'Are you an early adopter or do you wait for the second version?',
      'What is the worst app on your phone — and why is it still there?',
      'Do you use social media more for fun, work, or staying in touch?',
      'Has technology made your life simpler or more complicated?',
      'How do you decide if a new device is really worth the money?',
      'What advice would you give an older relative learning to use a smartphone?',
    ],
    'B1+': [
      'How has technology changed the way we form friendships?',
      'Some say screens are stealing our attention. Do you agree?',
      'What is one piece of technology you wish had never been invented? Why?',
      'Has working from home been a blessing or a curse for productivity?',
      'Are children growing up too quickly because of smartphones?',
      'Tell me about a time technology unexpectedly improved your life.',
      'Is real privacy still possible in 2026?',
      'What is the difference between using technology and being controlled by it?',
    ],
    'B2': [
      'To what extent should AI be allowed to make decisions about jobs, loans, or healthcare?',
      'How might brain-computer interfaces change what it means to be human?',
      'Is the digital divide widening or shrinking — and who is responsible?',
      'Should social media companies be legally liable for the mental health of their users?',
      'How do you weigh convenience against surveillance in modern life?',
      'Is technology making us more empathetic, or less?',
      'What ethical lines should never be crossed in technological progress?',
      'Imagine a country with no internet for a year. What would be lost, and what gained?',
    ],
  },
  family: {
    'A2': [
      'How many people are in your family?',
      'Who do you live with?',
      'Do you have brothers or sisters?',
      'What does your family usually do at weekends?',
      'Who in your family are you closest to? Why?',
      'Do you have a big family meal every week?',
      'What is your favourite family memory?',
      'Are you more similar to your mother or your father?',
    ],
    'B1': [
      'Tell me about a family tradition you really enjoy.',
      'How often do you visit your relatives?',
      'Has your family changed a lot in the last few years?',
      'What is something you learned from your parents that you did not appreciate at the time?',
      'How do you handle disagreements in your family?',
      'Do you think modern families spend enough time together?',
      'Who is the funniest person in your family? Tell me a story.',
      'How do you stay close to family members who live far away?',
    ],
    'B1+': [
      'How has the idea of "family" changed since your grandparents\' time?',
      'Is it harder to raise children today than it was 30 years ago?',
      'Some choose not to have children. Should that be a fully accepted personal choice?',
      'What is the right balance between independence and staying close to family?',
      'How do you handle being honest with family without hurting them?',
      'Tell me about a moment when your family really came together.',
      'Is birth order — being the eldest, middle, or youngest — actually important?',
      'How much should grown children be responsible for their elderly parents?',
    ],
    'B2': [
      'To what extent does family shape who we become, compared with environment and personal choice?',
      'How do changing definitions of family — single parents, blended families, chosen families — affect society?',
      'Should there be parenting courses for first-time parents?',
      'Is the nuclear family still the most stable model, or are we overdue for new ones?',
      'How do generational expectations differ in your culture between sons and daughters?',
      'What role does family play in either passing on or breaking cycles of trauma?',
      'How does growing up with social media compare with growing up without it, in terms of family bonds?',
      'Should adult siblings be legally obligated to support each other in old age?',
    ],
  },
  environment: {
    'A2': [
      'Do you recycle at home?',
      'Is the air in your city clean or polluted?',
      'What is your favourite season? Why?',
      'Do you like animals? Do you have a pet?',
      'What can you do to use less plastic?',
      'Do you walk or take the bus instead of using a car sometimes?',
      'Is your city green — does it have parks?',
      'What animals live near your home?',
    ],
    'B1': [
      'Have you noticed the weather changing in the last few years?',
      'What do you do to be more environmentally friendly?',
      'Tell me about a beautiful natural place near where you live.',
      'Is it expensive to live a green lifestyle?',
      'Have you ever joined a clean-up or environmental activity?',
      'What do you think about electric cars?',
      'Do you think recycling really helps, or is it just symbolic?',
      'How can you reduce waste in your daily life?',
    ],
    'B1+': [
      'How seriously do people in your country take climate change?',
      'Is individual action like recycling really meaningful, or do we need bigger systemic change?',
      'What is the biggest environmental problem in your region?',
      'Some say technology alone will save us from climate change. Do you agree?',
      'Tell me about a brand or company doing something genuinely green.',
      'How do you feel when you see beautiful nature destroyed by development?',
      'Should rich countries pay poorer ones to protect their rainforests?',
      'Is eco-anxiety a real problem for your generation?',
    ],
    'B2': [
      'To what extent should economic growth be sacrificed for environmental protection?',
      'How can democracies make long-term climate decisions when politicians think in election cycles?',
      'Should there be limits on how many children a person can have, for the planet?',
      'Is geoengineering a sensible insurance policy or a dangerous gamble?',
      'How do you weigh the loss of biodiversity against human development needs?',
      'What is the role of art and storytelling in motivating environmental action?',
      'Should the meat industry be regulated in the same way as the tobacco industry?',
      'How might a future generation judge our environmental choices today?',
    ],
  },
  education: {
    'A2': [
      'What was your favourite subject at school?',
      'Did you enjoy school when you were younger?',
      'Who was your best teacher? Why?',
      'Do you study English every day?',
      'What do you find difficult about learning a language?',
      'Are exams a good way to test what you know?',
      'Do you study better in the morning or in the evening?',
      'What do you want to learn next?',
    ],
    'B1': [
      'Tell me about a teacher who really influenced you.',
      'Have you ever taught someone something? How did it feel?',
      'What is the best way for you to remember new vocabulary?',
      'Do you think school prepared you well for real life?',
      'What is the most useful thing you have learned outside of school?',
      'How important is it to keep learning as an adult?',
      'Is online learning as effective as face-to-face?',
      'If you could go back to school, what would you do differently?',
    ],
    'B1+': [
      'How has education changed since you were a student?',
      'Are exams a fair way to measure intelligence or potential?',
      'Should creativity be taught as a school subject?',
      'What is wrong — or right — with the education system in your country?',
      'Is university still worth the cost in 2026?',
      'How do you balance learning for pleasure with learning for a specific goal?',
      'Tell me about a time you learned more from a mistake than from instruction.',
      'Should children be allowed to choose what they study from an early age?',
    ],
    'B2': [
      'To what extent should education be standardised across a country?',
      'How might AI tutors change the role of human teachers in the next decade?',
      'Is it ethical to use private tutors to give children an unfair advantage in exams?',
      'Should universities prioritise critical thinking over career-ready skills?',
      'How does the gap between rich and poor schools affect long-term social mobility?',
      'What is lost when learning becomes purely transactional — about credentials, not curiosity?',
      'Should history textbooks include the uncomfortable parts of a country\'s past?',
      'How can lifelong learning realistically work in an economy that values youth?',
    ],
  },
  hobby: {
    'A2': [
      'What do you like to do in your free time?',
      'Do you play a musical instrument or sing?',
      'What was your favourite hobby when you were a child?',
      'Do you read books, watch films, or do both?',
      'How often do you do your favourite hobby?',
      'Do you collect anything?',
      'Is your hobby cheap or expensive?',
      'Have you tried a new hobby this year?',
    ],
    'B1': [
      'Tell me about a hobby you have had for a long time.',
      'What got you interested in your hobby in the first place?',
      'Have you ever tried a hobby and decided it was not for you?',
      'Do you prefer solo hobbies or group activities?',
      'How do hobbies help you switch off from work or study?',
      'Have you ever made good friends through a hobby?',
      'Would you ever turn your hobby into a job? Why or why not?',
      'What hobby would you love to try if you had unlimited time?',
    ],
    'B1+': [
      'How has social media changed the way people share their hobbies?',
      'Is it possible to be too obsessed with a hobby?',
      'What is the difference between a hobby and a passion?',
      'Some say modern life leaves no time for real hobbies. Do you agree?',
      'How important is it to have a hobby with no goal of becoming good at it?',
      'Tell me about a hobby that completely changed someone you know.',
      'Why do you think people pay a lot to learn skills they will never use professionally?',
      'How much do our hobbies shape our identity?',
    ],
    'B2': [
      'To what extent are hobbies a luxury of people with time and money?',
      'How has the gig economy turned hobbies into side hustles — and is that healthy?',
      'Should schools place more value on creative hobbies than academic achievement?',
      'Is collecting things a meaningful pursuit or a form of escapism?',
      'How do hobbies contribute to mental health, beyond just relaxation?',
      'Are "productive" hobbies inherently more valuable than "passive" ones?',
      'What does our choice of hobby reveal about our personality?',
      'How might VR and AI change the very nature of what counts as a hobby?',
    ],
  },
};

/* ─── QUESTIONS gắn với từ vựng ({w} = một từ trong danh sách) ─── */
const VOCAB_QUESTION_TEMPLATES = [
  'Can you use the word "{w}" in a sentence about {t}?',
  'What does "{w}" mean to you?',
  'When was the last time you used the word "{w}"?',
  'Do you think "{w}" is important when we talk about {t}? Why?',
  'Can you give an example using "{w}"?',
  'Can you describe a moment when "{w}" was relevant in your life?',
  'How would you teach a friend the meaning of "{w}"?',
  'What is the difference between "{w}" and a similar word you know?',
];

/* ─── Datamuse part-of-speech tags → tiếng Việt ─── */
const DM_POS = { n: 'danh từ', v: 'động từ', adj: 'tính từ', adv: 'trạng từ' };

/* từ quá phổ biến — bỏ qua khi gợi ý từ vựng */
const STOPWORDS = new Set(['the','a','an','and','or','but','of','to','in','on','at','for','with','is','are','was','were','be','been','being','this','that','these','those','it','its','as','by','from','have','has','had','do','does','did','will','would','can','could','should','about','very','more','most','some','any','all','one','two','thing','things']);

function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ─── Datamuse: tìm từ vựng liên quan đến chủ đề (không cần API key) ─── */
async function fetchTopicWords(topic, count) {
  const t = topic.trim().toLowerCase();
  const aliasKey = matchTopicKey(t);
  const banned = new Set([t, ...t.split(/\s+/), ...(aliasKey ? TOPIC_ALIASES[aliasKey] : [])]);
  const urls = [
    `https://api.datamuse.com/words?ml=${encodeURIComponent(t)}&md=p&max=80`,
    `https://api.datamuse.com/words?rel_trg=${encodeURIComponent(t)}&md=p&max=80`,
  ];
  const seen = new Map();
  const results = await Promise.allSettled(urls.map(u => fetch(u).then(r => r.ok ? r.json() : [])));
  results.forEach(r => {
    if (r.status !== 'fulfilled') return;
    r.value.forEach(item => {
      const w = (item.word || '').toLowerCase().trim();
      if (!w || w.length < 3 || /[^a-z\s'-]/.test(w) || banned.has(w) || STOPWORDS.has(w)) return;
      const tags = item.tags || [];
      const posTag = tags.find(tg => DM_POS[tg]);
      const prev = seen.get(w);
      const score = item.score || 0;
      if (!prev || score > prev.score) seen.set(w, { w, score, pos: posTag ? DM_POS[posTag] : '' });
    });
  });
  const single = w => w.includes(' ') ? 1 : 0; // ưu tiên từ đơn (tra từ điển tốt hơn)
  const sorted = [...seen.values()].sort((a, b) => single(a.w) - single(b.w) || b.score - a.score);
  return sorted.slice(0, count);
}

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
  _last: 0,
  _to: null,
  init() {
    if (this.ch) this.ch.onmessage = e => { if (e.data && e.data.type === 'hello') this._flush(); };
  },
  push() {
    // Throttle: leading + trailing edge, ~120ms — không lag, không ghi localStorage 30 lần/giây
    const now = Date.now();
    const wait = 120 - (now - this._last);
    if (wait <= 0) { this._last = now; this._flush(); }
    else if (!this._to) {
      this._to = setTimeout(() => { this._to = null; this._last = Date.now(); this._flush(); }, wait);
    }
  },
  _flush() {
    try {
      const data = JSON.stringify(this.state);
      localStorage.setItem('etb_present', data);
      if (this.ch) this.ch.postMessage(this.state);
    } catch {}
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
    document.getElementById('hero-greeting').innerHTML = `Chào <span style="font-style:italic">${esc(Teacher.get())}</span>, <em>sẵn sàng cho buổi học chưa?</em>`;
    // AI status chip
    const aiOn = AI.enabled();
    const aiText = document.getElementById('ai-status-text');
    const aiBtn = document.getElementById('ai-status-btn');
    if (aiText) aiText.textContent = aiOn ? 'Gemini: ON' : 'chưa bật';
    if (aiBtn) aiBtn.classList.toggle('on', aiOn);
    // clock
    const now = new Date();
    document.getElementById('dash-clock').textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }) + ' · ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    // draft banner
    this.checkDraft();
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
      <div class="session-row" onclick="App.viewSession('${s.id}')" title="Click để xem chi tiết / chỉnh sửa">
        <div class="sess-day">${s.dayNum || '?'}</div>
        <div class="sess-info">
          <div class="sess-topic">${esc(s.topic)}</div>
          <div class="sess-meta">${esc(s.date)} · ${esc(s.level)} · ${s.vocab?.length || 0} từ · ${fmtDur(s.elapsed)}</div>
        </div>
        ${s.score != null ? `<div class="sess-score ${s.score >= 80 ? 'good' : ''}">${s.score}<small>/100</small></div>` : '<div class="muted" style="font-size:12px">–</div>'}
        <button class="btn btn-ghost btn-icon sess-row-del" onclick="event.stopPropagation();App.delSess('${s.id}')" title="Xóa">${ICONS.trash(14)}</button>
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

  /* ── AI SETTINGS ── */
  openAISettings() {
    document.getElementById('ai-key-input').value = AI.key || '';
    document.getElementById('ai-test-status').innerHTML = '';
    document.getElementById('ai-modal').classList.add('active');
    setTimeout(() => document.getElementById('ai-key-input').focus(), 50);
  },
  closeAISettings() {
    document.getElementById('ai-modal').classList.remove('active');
  },
  saveAIKey() {
    const v = document.getElementById('ai-key-input').value.trim();
    AI.key = v;
    this.closeAISettings();
    this.renderDash();
    toast(v ? 'Đã lưu API key — AI Gemini đã bật' : 'Đã xóa API key', 'ok');
  },
  clearAIKey() {
    if (!confirm('Xóa API key? AI sẽ tắt, app trở về dùng bộ câu hỏi sẵn.')) return;
    AI.key = '';
    document.getElementById('ai-key-input').value = '';
    document.getElementById('ai-test-status').innerHTML = '';
    this.renderDash();
    toast('Đã xóa API key');
  },
  async testAIKey() {
    const v = document.getElementById('ai-key-input').value.trim();
    if (!v) { toast('Nhập key trước đã!', 'err'); return; }
    const status = document.getElementById('ai-test-status');
    status.innerHTML = `<span class="spin">${ICONS.refresh(12)}</span> Đang test với Gemini...`;
    status.className = 'ai-status';
    try {
      await AI.test(v);
      status.innerHTML = '✓ Key hợp lệ — Gemini phản hồi OK. Bấm <strong>Lưu</strong> để dùng.';
      status.className = 'ai-status ok';
    } catch (e) {
      status.innerHTML = '✗ Lỗi: ' + esc((e.message || '').substring(0, 120));
      status.className = 'ai-status err';
    }
  },

  /* ── NEW SESSION ── */
  newSession() {
    if (Draft.load()) {
      if (!confirm('Bạn có buổi học chưa hoàn thành. Tạo mới sẽ bỏ buổi đang dở. Tiếp tục?')) return;
      Draft.clear();
    }
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

  async genQuestions() {
    const topic = document.getElementById('inp-topic').value.trim();
    if (!topic) { toast('Nhập chủ đề trước đã!', 'err'); return; }
    const level = document.getElementById('inp-level').value;
    const qcount = parseInt(document.getElementById('inp-qcount').value) || 5;
    if (AI.enabled()) toast(`<span class="spin">${ICONS.refresh(12)}</span> AI đang nghĩ...`, '');
    const n = await this.buildQuestionsFor(topic, level, qcount);
    this.autoFillGrammar(true);
    toast(`Đã tạo ${n} câu hỏi (<b>${esc(this._lastQSource || level)}</b>) + gợi ý ngữ pháp`, 'ok');
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
    const vmsg = (await this.populateVocab(topic, vcount, btn)).msg;
    if (AI.enabled() && btn) btn.innerHTML = `<span class="spin">${ICONS.refresh(12)}</span> AI đang nghĩ câu hỏi...`;
    const qn = await this.buildQuestionsFor(topic, level, qcount);
    this.autoFillGrammar(true);
    btn.innerHTML = old; btn.disabled = false;
    toast(`Đã tạo: ${vmsg} · ${qn} câu hỏi (<b>${esc(this._lastQSource || level)}</b>) · gợi ý ngữ pháp`, 'ok');
  },

  /* ── tìm + điền từ vựng (Datamuse + bộ sẵn + tra từ điển) ── */
  async populateVocab(topic, vcount, btn) {
    const key = matchTopicKey(topic);
    const bankWords = (key && VOCAB_BANK[key]) ? VOCAB_BANK[key] : [];
    let dmWords = [];
    if (btn) btn.innerHTML = `<span class="spin">${ICONS.refresh(12)}</span> Đang tìm từ...`;
    try { dmWords = await fetchTopicWords(topic, vcount + 12); } catch {}
    const seen = new Set(); const merged = [];
    const pushW = (w, pos) => { const k = w.toLowerCase(); if (!seen.has(k)) { seen.add(k); merged.push({ w, pos: pos || '' }); } };
    dmWords.forEach(d => pushW(d.w, d.pos));
    bankWords.forEach(w => pushW(w));
    if (!merged.length) return { msg: 'không tìm được từ — bạn tự nhập', count: 0 };
    const chosen = merged.slice(0, vcount);
    this.buildVocabRows(chosen.length, chosen.map(c => ({ w: c.w, ph: '', pos: POS_LIST.includes(c.pos) ? c.pos : '', m: '', e: '' })));
    const ok = await this.autoFillDict(btn);
    const src = dmWords.length ? (bankWords.length ? 'Datamuse + bộ sẵn' : 'Datamuse') : 'bộ sẵn';
    return { msg: `${chosen.length} từ · ${src} · tra ${ok}/${chosen.length}`, count: chosen.length };
  },

  async genVocab() {
    const topic = document.getElementById('inp-topic').value.trim();
    if (!topic) { toast('Nhập chủ đề trước đã!', 'err'); return; }
    const vcount = parseInt(document.getElementById('inp-vcount').value) || 8;
    const btn = document.getElementById('genv-btn');
    const old = btn.innerHTML; btn.disabled = true;
    const r = await this.populateVocab(topic, vcount, btn);
    btn.innerHTML = old; btn.disabled = false;
    toast(`Đã tạo từ vựng: ${r.msg}`, r.count ? 'ok' : 'err');
  },

  async buildQuestionsFor(topic, level, count) {
    const n = Math.max(1, count);
    const words = [...document.querySelectorAll('#vocab-rows .v-w')].map(i => i.value.trim()).filter(Boolean);

    // 1) Ưu tiên AI nếu có key — sinh câu hỏi sát chủ đề & trình độ
    if (AI.enabled()) {
      try {
        const arr = await AI.generateQuestions(topic, level, n, words);
        if (arr.length) {
          this.buildQRows(arr.slice(0, n));
          this._lastQSource = 'AI';
          return Math.min(arr.length, n);
        }
      } catch (e) {
        toast(`⚠️ AI lỗi: ${esc((e.message || '').substring(0, 80))} — dùng bộ sẵn`, 'err');
      }
    }

    // 2) Fallback: bộ hand-crafted theo chủ đề; nếu không khớp dùng template chung
    const t = topic.toLowerCase();
    const key = matchTopicKey(t);
    let topicQs;
    if (key && TOPIC_QUESTIONS[key] && TOPIC_QUESTIONS[key][level]) {
      topicQs = shuffle(TOPIC_QUESTIONS[key][level]);
      this._lastQSource = `bộ ${key}`;
    } else {
      const tpl = QUESTION_TEMPLATES[level] || QUESTION_TEMPLATES['B1+'];
      topicQs = shuffle(tpl).map(q => q.replace(/\{t\}/g, t));
      this._lastQSource = 'bộ chung';
    }

    // 3) Trộn vài câu gắn với từ vựng (~20%, tối đa 3) nếu có vocab và n đủ lớn
    let list;
    if (words.length && n >= 4) {
      const nVocab = Math.min(Math.max(1, Math.round(n / 5)), words.length, 3);
      const pool = shuffle(VOCAB_QUESTION_TEMPLATES);
      const vocabQs = shuffle(words).slice(0, nVocab).map((w, i) =>
        pool[i % pool.length].replace(/\{w\}/g, w).replace(/\{t\}/g, t));
      list = shuffle([...topicQs.slice(0, n - nVocab), ...vocabQs]);
    } else {
      list = topicQs.slice(0, n);
    }
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
    const total = cards.length;
    let done = 0, ok = 0;
    const concurrency = Math.min(5, total); // 5 song song — nhanh ~5x, vẫn lịch sự với API miễn phí
    const updateBtn = () => { if (btn) btn.innerHTML = `<span class="spin">${ICONS.refresh(12)}</span> Tra ${done}/${total}`; };
    updateBtn();
    const queue = cards.slice();
    const doOne = async (card) => {
      const w = card.querySelector('.v-w').value.trim();
      try {
        const r = await this.fetchWord(w);
        if (r.ph && !card.querySelector('.v-ph').value) card.querySelector('.v-ph').value = r.ph;
        if (r.pos) card.querySelector('.v-pos').value = POS_LIST.includes(r.pos) ? r.pos : 'khác';
        if (r.m && !card.querySelector('.v-m').value) card.querySelector('.v-m').value = r.m;
        if (r.e && !card.querySelector('.v-e').value) card.querySelector('.v-e').value = r.e;
        ok++;
      } catch {}
      done++; updateBtn();
    };
    const workers = Array.from({ length: concurrency }, async () => {
      while (queue.length) {
        const card = queue.shift();
        if (card) await doOne(card);
      }
    });
    await Promise.all(workers);
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
  startTimer(resumeElapsed) {
    const e = parseInt(resumeElapsed) || 0;
    S.timer = { secs: 1800 - e, elapsed: e, running: true, iv: null };
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
    Draft.clear();
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
      <div class="session-row" onclick="App.viewSession('${s.id}')" title="Click để xem chi tiết / chỉnh sửa">
        <div class="sess-day">${s.dayNum || '?'}</div>
        <div class="sess-info">
          <div class="sess-topic">${esc(s.topic)}</div>
          <div class="sess-meta">${esc(s.date)} · ${esc(s.level)} · ${s.vocab?.length || 0} từ · ${fmtDur(s.elapsed)}${s.remembered?.length ? ` · nhớ ${s.remembered.length}/${s.vocab?.length || 0}` : ''}${s.notes ? '<br><em style="color:var(--muted-soft)">' + esc(s.notes.substring(0, 100)) + (s.notes.length > 100 ? '...' : '') + '</em>' : ''}</div>
        </div>
        ${s.score != null ? `<div class="sess-score ${s.score >= 80 ? 'good' : ''}">${s.score}<small>/100</small></div>` : ''}
        <button class="btn btn-ghost btn-icon sess-row-del" onclick="event.stopPropagation();App.delSess('${s.id}')" title="Xóa">${ICONS.trash(14)}</button>
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

  /* ── DRAFT (resume) ── */
  checkDraft() {
    const banner = document.getElementById('resume-banner');
    if (!banner) return;
    const d = Draft.load();
    if (!d) { banner.style.display = 'none'; return; }
    banner.style.display = 'flex';
    const ic = document.getElementById('rb-icon');
    if (ic) ic.innerHTML = ICONS.refresh(20);
    const when = new Date(d._ts || Date.now()).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    const topic = (d.view === 'teach' ? d.cur?.topic : d.topic) || '(chưa có chủ đề)';
    const mode = d.view === 'teach' ? 'Đang dạy' : 'Đang soạn';
    document.getElementById('rb-info').textContent = `${mode} "${topic}" · lưu lúc ${when}`;
  },

  resumeDraft() {
    const d = Draft.load();
    if (!d) { toast('Không có buổi học đang dở', 'err'); return; }
    if (d.view === 'setup') {
      S.cur = {
        id: d.id || String(Date.now()),
        date: d.date || today(),
        dayNum: d.dayNum || (DB.all().filter(x => x.done).length + 1),
        topic: '', level: 'B1+', vocab: [], qs: [], patterns: [], grammar: '',
        elapsed: 0, score: null, notes: '', done: false, remembered: [],
      };
      this.showView('setup');
      setTimeout(() => {
        document.getElementById('inp-topic').value = d.topic || '';
        document.getElementById('inp-level').value = d.level || 'B1+';
        document.getElementById('inp-vcount').value = d.vcount || '8';
        document.getElementById('inp-qcount').value = d.qcount || '5';
        document.getElementById('inp-grammar').value = d.grammar || '';
        this.renderFcConfig();
        this.buildVocabRows(Math.max((d.vocab || []).length, 1), d.vocab || []);
        this.buildQRows((d.qs || []).length ? d.qs : ['']);
        this.buildPatternRows((d.patterns || []).length ? d.patterns : []);
        this.renderGrammarChips(d.topic || '');
        toast('Đã khôi phục buổi học đang soạn', 'ok');
      }, 30);
    } else if (d.view === 'teach' && d.cur) {
      S.cur = d.cur;
      this.renderTeach();
      this.showView('teach');
      Present.setTopic(S.cur.topic);
      const bp = document.getElementById('bp-input');
      if (bp) { bp.value = d.board || ''; this.onBoardInput(); }
      this.startTimer(d.cur.elapsed || 0);
      toast('Đã khôi phục buổi học đang dạy', 'ok');
    }
  },

  discardDraft() {
    if (!confirm('Bỏ buổi học chưa hoàn thành? Toàn bộ nội dung đã soạn sẽ mất.')) return;
    Draft.clear();
    this.checkDraft();
    toast('Đã bỏ buổi dở');
  },

  /* ── SESSION DETAIL / EDIT MODAL ── */
  viewSession(id) {
    const s = DB.all().find(x => x.id === id);
    if (!s) { toast('Không tìm thấy buổi học', 'err'); return; }
    this._editingId = id;
    document.getElementById('sm-title').textContent = `${s.topic} · Buổi ${s.dayNum || '?'}`;
    const body = document.getElementById('sm-body');
    body.innerHTML = `
      <div class="sm-meta-row">
        <strong>${esc(s.date)}</strong> · ${esc(s.level)} · ${fmtDur(s.elapsed)} · ${(s.vocab || []).length} từ · ${(s.qs || []).length} câu hỏi
      </div>

      <div class="sm-grid-2">
        <div class="sm-section">
          <h4>Điểm</h4>
          <div class="sm-score-row">
            <span class="sm-score-big" id="sm-score-display">${s.score ?? 0}</span><small>/100</small>
          </div>
          <input type="range" id="sm-score" class="score-range" min="0" max="100" value="${s.score ?? 75}" oninput="document.getElementById('sm-score-display').textContent=this.value">
        </div>
        <div class="sm-section">
          <h4>Từ vựng nhớ được (<span id="sm-recall-count">${(s.remembered || []).length}</span>/${(s.vocab || []).length})</h4>
          <div class="recall-grid" id="sm-recall">${(s.vocab || []).map(v => `
            <div class="recall-chip ${(s.remembered || []).includes(v.w) ? 'ok' : ''}" onclick="this.classList.toggle('ok');App._updateRecallCount()" data-w="${esc(v.w)}">
              <span class="ck">${ICONS.check(10)}</span>${esc(v.w)}
            </div>`).join('') || '<div class="muted" style="font-size:13px">Không có từ vựng</div>'}</div>
        </div>
      </div>

      <div class="sm-section">
        <h4>Từ vựng đã dạy (${(s.vocab || []).length})</h4>
        <div class="sm-vocab-grid">${(s.vocab || []).map(v => `
          <div class="sm-v-card">
            <div class="sm-v-head">
              <span class="sm-v-w">${esc(v.w)}</span>
              ${v.ph ? `<span class="sm-v-ph">${esc(v.ph)}</span>` : ''}
              ${v.pos ? `<span class="sm-v-pos">${esc(v.pos)}</span>` : ''}
            </div>
            ${v.m ? `<div class="sm-v-m">${esc(v.m)}</div>` : ''}
            ${v.e ? `<div class="sm-v-e">"${esc(v.e)}"</div>` : ''}
          </div>`).join('') || '<div class="muted" style="font-size:13px">Không có</div>'}</div>
      </div>

      <div class="sm-grid-2">
        <div class="sm-section">
          <h4>Câu hỏi (${(s.qs || []).length})</h4>
          <ol class="sm-qs">${(s.qs || []).map(q => `<li>${esc(q)}</li>`).join('') || '<li class="muted">Không có</li>'}</ol>
        </div>
        <div class="sm-section">
          <h4>Mẫu câu (${(s.patterns || []).length})</h4>
          <div class="sm-patterns">${(s.patterns || []).map(pt => `
            <div class="sm-pt">
              <strong>${esc(pt.p)}</strong>
              ${(pt.ex || []).length ? `<ul>${pt.ex.map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
            </div>`).join('') || '<div class="muted" style="font-size:13px">Không có</div>'}</div>
        </div>
      </div>

      <div class="sm-section">
        <h4>Ghi chú ngữ pháp</h4>
        <div class="sm-grammar">${s.grammar ? esc(s.grammar) : '<span class="muted">Không có</span>'}</div>
      </div>

      <div class="sm-section">
        <h4>Nhận xét buổi học (có thể chỉnh sửa)</h4>
        <textarea id="sm-notes" class="input" rows="4" placeholder="Tiến bộ? Lỗi cần ôn? Kế hoạch buổi sau...">${esc(s.notes || '')}</textarea>
      </div>
    `;
    document.getElementById('session-modal').classList.add('active');
  },

  _updateRecallCount() {
    const el = document.getElementById('sm-recall-count');
    if (el) el.textContent = document.querySelectorAll('#sm-recall .recall-chip.ok').length;
  },

  saveSessionEdit() {
    const id = this._editingId;
    if (!id) return;
    const all = DB.all();
    const s = all.find(x => x.id === id);
    if (!s) return;
    s.score = parseInt(document.getElementById('sm-score').value);
    s.notes = document.getElementById('sm-notes').value.trim();
    s.remembered = [...document.querySelectorAll('#sm-recall .recall-chip.ok')].map(el => el.dataset.w);
    DB.put(s);
    this.closeSessionModal();
    this.renderHist();
    this.renderDash();
    toast('Đã lưu chỉnh sửa', 'ok');
  },

  deleteFromModal() {
    const id = this._editingId;
    if (!id) return;
    if (!confirm('Xóa buổi học này?')) return;
    DB.del(id);
    this.closeSessionModal();
    this.renderHist();
    this.renderDash();
    toast('Đã xóa');
  },

  closeSessionModal() {
    document.getElementById('session-modal').classList.remove('active');
    this._editingId = null;
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
  // session detail modal — close on overlay click + Escape
  const sm = document.getElementById('session-modal');
  if (sm) {
    sm.addEventListener('click', (e) => { if (e.target.id === 'session-modal') App.closeSessionModal(); });
  }
  // AI settings modal — close on overlay click
  const am = document.getElementById('ai-modal');
  if (am) {
    am.addEventListener('click', (e) => { if (e.target.id === 'ai-modal') App.closeAISettings(); });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (sm && sm.classList.contains('active')) App.closeSessionModal();
    if (am && am.classList.contains('active')) App.closeAISettings();
  });
  // AUTOSAVE: debounced save on any input + 5s interval + save before unload
  document.addEventListener('input', () => {
    if (S.view === 'setup' || S.view === 'teach') debouncedDraftSave();
  });
  setInterval(snapshotDraft, 5000);
  window.addEventListener('beforeunload', snapshotDraft);
}

document.addEventListener('DOMContentLoaded', init);
