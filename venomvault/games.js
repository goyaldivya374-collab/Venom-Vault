/* ===== VENOMVAULT GAMES PAGE JS ===== */

/* ─────────────────────────────────────────────
   GAME DATA
───────────────────────────────────────────── */
const GAMES = [
  {
    id: 'shadow', icon: '🔫', name: 'SHADOW PROTOCOL', genre: 'Action / Shooter',
    banner: 'linear-gradient(135deg,#0a1628,#1a0a28)', badge: '🔥 HOT',
    desc: 'Tactical stealth shooter with deep storyline and ranked competitive modes.',
    players: '84K', rating: '4.9', playtime: '180h',
    rules: [
      'Move your crosshair with mouse / arrow keys',
      'Click or press SPACE to shoot enemy targets',
      'Avoid shooting friendly (green) targets — costs a life',
      'Each hit earns +10 points; combo hits multiply your score',
      'You have 3 lives — lose them all and the mission fails'
    ],
    engine: 'shooter'
  },
  {
    id: 'mythic', icon: '🧙', name: 'MYTHIC REALM', genre: 'RPG / Adventure',
    banner: 'linear-gradient(135deg,#1a0a28,#2a1a4a)', badge: '⭐ TOP RATED',
    desc: 'Open-world fantasy RPG with 200+ quests, dynamic magic and deep lore.',
    players: '120K', rating: '4.8', playtime: '300h',
    rules: [
      'Click or tap the falling monsters before they reach the bottom',
      'Each monster has a health bar — click multiple times to defeat it',
      'Faster monsters appear as your level increases',
      'Missing 5 monsters ends the game',
      'Boss monsters give triple points!'
    ],
    engine: 'clicker'
  },
  {
    id: 'quantum', icon: '🧩', name: 'QUANTUM GRID', genre: 'Puzzle / Strategy',
    banner: 'linear-gradient(135deg,#0a2818,#1a4a2a)', badge: '🧠 BRAIN',
    desc: 'Mind-bending quantum puzzles with infinite procedurally generated levels.',
    players: '56K', rating: '4.7', playtime: '80h',
    rules: [
      'Use arrow keys or WASD to slide tiles',
      'Combine matching numbered tiles to double their value',
      'Reach the 2048 tile to win the round',
      'The board fills up — plan your moves carefully',
      'Each move earns you VaultCoins based on score'
    ],
    engine: 'puzzle2048'
  },
  {
    id: 'turbo', icon: '🚗', name: 'TURBO CLASH', genre: 'Racing / Sports',
    banner: 'linear-gradient(135deg,#281a0a,#4a2a1a)', badge: '🏎️ FAST',
    desc: 'High-octane street racing across neon-lit cities with boost mechanics.',
    players: '73K', rating: '4.6', playtime: '95h',
    rules: [
      'Press LEFT / RIGHT arrow keys to steer your car',
      'Dodge oncoming traffic and obstacles',
      'Collect fuel cans to keep driving',
      'Hitting obstacles costs speed — 3 crashes = game over',
      'Distance driven earns VaultCoins'
    ],
    engine: 'racer'
  },
  {
    id: 'dark', icon: '👻', name: 'DARK DESCENT', genre: 'Horror / Survival',
    banner: 'linear-gradient(135deg,#280a0a,#4a1a1a)', badge: '💀 SCARY',
    desc: 'Atmospheric survival horror in a procedurally generated haunted mansion.',
    players: '41K', rating: '4.5', playtime: '60h',
    rules: [
      'Click on the ghost before it disappears to banish it',
      'Ghosts appear randomly around the screen',
      'You have 30 seconds — banish as many as you can',
      'Faster ghosts are worth more points',
      'Missing a ghost drains your courage meter'
    ],
    engine: 'ghost'
  },
  {
    id: 'nebula', icon: '🌌', name: 'NEBULA ASSAULT', genre: 'Battle Royale',
    banner: 'linear-gradient(135deg,#0a0a28,#1a1a4a)', badge: '🌟 NEW',
    desc: 'Epic space battle royale with 100 players, starships and orbital strikes.',
    players: '200K', rating: '4.9', playtime: '250h',
    rules: [
      'Move your spaceship with arrow keys or WASD',
      'Press SPACE to fire your laser cannon',
      'Destroy enemy ships for points and coins',
      'Asteroids and missiles are obstacles — dodge them!',
      'Shield recharges every 10 seconds after being hit'
    ],
    engine: 'space'
  }
];

/* ─────────────────────────────────────────────
   QUIZ LOGIC
───────────────────────────────────────────── */
const quizSteps = [
  {
    step: 'STEP 1 OF 3', q: 'WHAT IS YOUR GAMING STYLE?',
    sub: 'Choose what describes you best',
    opts: [
      { icon: '⚔️', label: 'Aggressive Fighter' },
      { icon: '🧠', label: 'Strategic Thinker' },
      { icon: '🌍', label: 'Explorer / RPG' },
      { icon: '🏆', label: 'Competitive Racer' }
    ]
  },
  {
    step: 'STEP 2 OF 3', q: 'HOW LONG DO YOU USUALLY PLAY?',
    sub: 'Your average session length',
    opts: [
      { icon: '⚡', label: 'Quick 15-30 min' },
      { icon: '🎯', label: 'Focused 1-2 hrs' },
      { icon: '🌙', label: 'Marathon 3-5 hrs' },
      { icon: '♾️', label: 'All Day Every Day' }
    ]
  },
  {
    step: 'STEP 3 OF 3', q: 'WHAT MATTERS MOST TO YOU?',
    sub: 'Pick your primary goal',
    opts: [
      { icon: '💰', label: 'Earning Coins' },
      { icon: '👥', label: 'Playing with Friends' },
      { icon: '📖', label: 'Deep Story / Lore' },
      { icon: '🥇', label: 'Topping Leaderboards' }
    ]
  }
];

let quizStep = 0;
let coins = 2450;

function renderQuiz() {
  const data = quizSteps[quizStep];
  document.getElementById('qStep').textContent = data.step;
  document.getElementById('qQuestion').textContent = data.q;
  document.getElementById('qSub').textContent = data.sub;
  document.getElementById('qProgress').style.width = ((quizStep + 1) / quizSteps.length * 100) + '%';
  const grid = document.getElementById('optGrid');
  grid.innerHTML = '';
  data.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-icon">${o.icon}</span>${o.label}`;
    btn.onclick = () => selectOpt(btn, i);
    grid.appendChild(btn);
  });
}

function selectOpt(btn, idx) {
  document.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  setTimeout(() => {
    quizStep++;
    if (quizStep < quizSteps.length) {
      renderQuiz();
    } else {
      showGames();
    }
  }, 400);
}

function showGames() {
  document.getElementById('quizScreen').style.display = 'none';
  const gs = document.getElementById('gameScreen');
  gs.style.display = 'block';
  gs.style.opacity = '0';
  setTimeout(() => { gs.style.transition = 'opacity 0.5s'; gs.style.opacity = '1'; }, 10);
  renderGames();
}

/* ─────────────────────────────────────────────
   RENDER GAME CARDS
───────────────────────────────────────────── */
function renderGames() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  GAMES.forEach((g, i) => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.animationDelay = (i * 0.08) + 's';
    card.innerHTML = `
      <div class="gc-banner" style="background:${g.banner}">
        ${g.icon}
        <div class="gc-badge">${g.badge}</div>
      </div>
      <div class="gc-body">
        <div class="gc-title">${g.name}</div>
        <div class="gc-genre">${g.genre}</div>
        <div class="gc-desc">${g.desc}</div>
        <div class="gc-stats">
          <div class="gc-stat"><div class="gc-stat-val">${g.players}</div><div class="gc-stat-lbl">PLAYERS</div></div>
          <div class="gc-stat"><div class="gc-stat-val">${g.rating}⭐</div><div class="gc-stat-lbl">RATING</div></div>
          <div class="gc-stat"><div class="gc-stat-val">${g.playtime}</div><div class="gc-stat-lbl">AVG TIME</div></div>
        </div>
        <div class="gc-btns">
          <button class="btn-rules" onclick="openRules('${g.id}')">📋 Rules</button>
          <button class="btn-play" onclick="openGame('${g.id}')">▶ PLAY NOW</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ─────────────────────────────────────────────
   RULES MODAL
───────────────────────────────────────────── */
function openRules(id) {
  const g = GAMES.find(x => x.id === id);
  if (!g) return;
  document.getElementById('ruleTitle').textContent = `📋 ${g.name} – HOW TO PLAY`;
  document.getElementById('ruleIcon').textContent = g.icon;
  document.getElementById('ruleVideo').style.background = g.banner;
  document.getElementById('ruleText').textContent = `HOW TO PLAY: ${g.name}`;
  const list = document.getElementById('rulesList');
  list.innerHTML = g.rules.map(r => `<li>${r}</li>`).join('');
  // reset progress bar
  const fill = document.getElementById('ruleProgFill');
  fill.style.animation = 'none'; fill.offsetHeight; fill.style.animation = '';
  document.getElementById('ruleModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  window._pendingGame = id;
}

function closeRules() {
  document.getElementById('ruleModal').classList.remove('open');
  document.body.style.overflow = '';
}

function playFromRules() {
  closeRules();
  if (window._pendingGame) setTimeout(() => openGame(window._pendingGame), 200);
}

/* ─────────────────────────────────────────────
   PLAY GAME MODAL
───────────────────────────────────────────── */
let activeGame = null;
let gameState = {};

function openGame(id) {
  const g = GAMES.find(x => x.id === id);
  if (!g) return;
  activeGame = g;
  document.getElementById('playTitle').textContent = `▶ PLAYING: ${g.name}`;
  document.getElementById('playModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  initGame(g);
}

function closeGame() {
  stopGame();
  document.getElementById('playModal').classList.remove('open');
  document.body.style.overflow = '';
  activeGame = null;
}

/* ─────────────────────────────────────────────
   GAME ENGINES
───────────────────────────────────────────── */
function initGame(g) {
  const area = document.getElementById('gameCanvasArea');
  area.innerHTML = '';

  const engines = {
    shooter: buildShooter,
    clicker: buildClicker,
    puzzle2048: build2048,
    racer: buildRacer,
    ghost: buildGhost,
    space: buildSpace
  };
  if (engines[g.engine]) engines[g.engine](area, g);
}

function stopGame() {
  gameState.running = false;
  if (gameState.raf) cancelAnimationFrame(gameState.raf);
  if (gameState.interval) clearInterval(gameState.interval);
  gameState = {};
}

/* ────────────── SHOOTER ────────────── */
function buildShooter(area, g) {
  area.innerHTML = `
    <div class="game-canvas-wrap">
      <div class="game-hud">
        <div class="hud-score">SCORE: <span id="gs-score">0</span></div>
        <div class="hud-lives" id="gs-lives">❤️❤️❤️</div>
        <div class="hud-level">WAVE <span id="gs-wave">1</span></div>
      </div>
      <canvas id="gameCanvas" width="540" height="340"></canvas>
      <div class="game-over-overlay" id="gameOver">
        <div class="go-title">MISSION OVER</div>
        <div class="go-score" id="go-score">Score: 0</div>
        <div class="go-coins" id="go-coins">+0 VaultCoins earned</div>
        <button class="btn-restart" onclick="initGame(activeGame)">↺ RETRY</button>
      </div>
    </div>
    <div class="game-instructions">🖱️ Move crosshair · <kbd>CLICK</kbd> or <kbd>SPACE</kbd> to shoot · Hit enemies, avoid friendlies</div>
  `;
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const gs = { score: 0, lives: 3, wave: 1, targets: [], cursor: { x: 270, y: 170 }, running: true, raf: null };
  gameState = gs;

  function spawnTarget() {
    if (!gs.running) return;
    const friendly = Math.random() < 0.25;
    gs.targets.push({
      x: 40 + Math.random() * 460,
      y: 40 + Math.random() * 260,
      r: 22, friendly,
      hp: friendly ? 1 : 1,
      age: 0, maxAge: 90 + Math.random() * 60,
      emoji: friendly ? '🙂' : ['👾','🤖','💀','🎯'][Math.floor(Math.random()*4)]
    });
  }
  function draw() {
    ctx.clearRect(0, 0, 540, 340);
    // background
    ctx.fillStyle = '#050a0e';
    ctx.fillRect(0, 0, 540, 340);
    // grid dots
    ctx.fillStyle = 'rgba(0,255,231,0.06)';
    for (let x = 20; x < 540; x += 40) for (let y = 20; y < 340; y += 40)
      ctx.fillRect(x, y, 1, 1);

    gs.targets.forEach(t => {
      t.age++;
      const alpha = t.age > t.maxAge - 20 ? (t.maxAge - t.age) / 20 : 1;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      ctx.strokeStyle = t.friendly ? '#00ff80' : '#ff3c78';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = '22px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t.emoji, t.x, t.y);
      ctx.globalAlpha = 1;
    });
    // remove aged
    const before = gs.targets.length;
    gs.targets = gs.targets.filter(t => t.age < t.maxAge);
    if (gs.targets.length < before) { gs.lives--; updateHUD(); }

    // Crosshair
    ctx.strokeStyle = 'rgba(0,255,231,0.9)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(gs.cursor.x - 14, gs.cursor.y); ctx.lineTo(gs.cursor.x + 14, gs.cursor.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gs.cursor.x, gs.cursor.y - 14); ctx.lineTo(gs.cursor.x, gs.cursor.y + 14); ctx.stroke();
    ctx.beginPath(); ctx.arc(gs.cursor.x, gs.cursor.y, 8, 0, Math.PI * 2); ctx.stroke();

    if (gs.lives <= 0) { endGame(gs.score); return; }
    if (gs.running) gs.raf = requestAnimationFrame(draw);
  }

  function updateHUD() {
    document.getElementById('gs-score').textContent = gs.score;
    document.getElementById('gs-lives').textContent = '❤️'.repeat(Math.max(0, gs.lives));
    document.getElementById('gs-wave').textContent = gs.wave;
  }

  // Spawn loop
  gs.interval = setInterval(() => {
    if (!gs.running) return;
    spawnTarget();
    if (gs.score > gs.wave * 100) { gs.wave++; updateHUD(); }
  }, Math.max(600, 1400 - gs.wave * 100));

  // Mouse movement
  canvas.onmousemove = e => {
    const r = canvas.getBoundingClientRect();
    gs.cursor.x = (e.clientX - r.left) * (540 / r.width);
    gs.cursor.y = (e.clientY - r.top) * (340 / r.height);
  };

  function shoot() {
    if (!gs.running) return;
    let hit = false;
    gs.targets = gs.targets.filter(t => {
      const d = Math.hypot(gs.cursor.x - t.x, gs.cursor.y - t.y);
      if (d < t.r + 10) {
        if (t.friendly) { gs.lives--; updateHUD(); }
        else { gs.score += 10 * gs.wave; updateHUD(); spawnCoinBurst(e => e); }
        hit = true; return false;
      }
      return true;
    });
  }
  canvas.onclick = shoot;
  canvas.onkeydown = e => { if (e.code === 'Space') shoot(); };

  window.addEventListener('keydown', function kd(e) {
    if (!gs.running) { window.removeEventListener('keydown', kd); return; }
    const step = 12;
    if (e.key === 'ArrowLeft') gs.cursor.x = Math.max(0, gs.cursor.x - step);
    if (e.key === 'ArrowRight') gs.cursor.x = Math.min(540, gs.cursor.x + step);
    if (e.key === 'ArrowUp') gs.cursor.y = Math.max(0, gs.cursor.y - step);
    if (e.key === 'ArrowDown') gs.cursor.y = Math.min(340, gs.cursor.y + step);
    if (e.key === ' ') shoot();
    e.preventDefault();
  });

  updateHUD();
  draw();
}

/* ────────────── CLICKER ────────────── */
function buildClicker(area, g) {
  area.innerHTML = `
    <div class="game-canvas-wrap">
      <div class="game-hud">
        <div class="hud-score">SCORE: <span id="gs-score">0</span></div>
        <div class="hud-lives" id="gs-lives">MISSED: 0/5</div>
        <div class="hud-level">LVL <span id="gs-wave">1</span></div>
      </div>
      <canvas id="gameCanvas" width="540" height="340"></canvas>
      <div class="game-over-overlay" id="gameOver">
        <div class="go-title">REALM FALLEN</div>
        <div class="go-score" id="go-score">Score: 0</div>
        <div class="go-coins" id="go-coins">+0 VaultCoins earned</div>
        <button class="btn-restart" onclick="initGame(activeGame)">↺ RETRY</button>
      </div>
    </div>
    <div class="game-instructions">🖱️ <kbd>CLICK</kbd> monsters before they escape!</div>
  `;
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const gs = { score: 0, missed: 0, level: 1, monsters: [], running: true, raf: null, interval: null, timer: 0 };
  gameState = gs;

  const EMOJIS = ['👹','🐲','💀','🧟','👺','🦇','🐍'];

  function spawn() {
    if (!gs.running) return;
    gs.monsters.push({
      x: 40 + Math.random() * 460,
      y: 40 + Math.random() * 260,
      r: 26, hp: Math.ceil(gs.level / 2),
      maxHp: Math.ceil(gs.level / 2),
      age: 0, maxAge: Math.max(60, 140 - gs.level * 10),
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      isBoss: Math.random() < 0.12,
      shake: 0
    });
  }

  function draw() {
    ctx.clearRect(0, 0, 540, 340);
    ctx.fillStyle = '#050a0e'; ctx.fillRect(0, 0, 540, 340);
    // atmospheric red glow
    const grd = ctx.createRadialGradient(270, 170, 0, 270, 170, 270);
    grd.addColorStop(0, 'rgba(255,0,50,0.04)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, 540, 340);

    gs.timer++;
    gs.monsters.forEach(m => {
      m.age++;
      const life = 1 - m.age / m.maxAge;
      const sx = m.shake > 0 ? (Math.random() - 0.5) * 4 : 0; m.shake = Math.max(0, m.shake - 1);
      // health bar
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(m.x - m.r + sx, m.y - m.r - 10, m.r * 2, 5);
      ctx.fillStyle = `hsl(${120 * m.hp / m.maxHp},100%,50%)`;
      ctx.fillRect(m.x - m.r + sx, m.y - m.r - 10, m.r * 2 * (m.hp / m.maxHp), 5);
      // timer ring
      ctx.beginPath();
      ctx.arc(m.x + sx, m.y, m.r + 4, -Math.PI/2, -Math.PI/2 + life * Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,60,120,0.6)'; ctx.lineWidth = 2; ctx.stroke();
      // emoji
      ctx.font = m.isBoss ? '34px serif' : '26px serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(m.emoji, m.x + sx, m.y);
      if (m.isBoss) {
        ctx.font = '10px monospace'; ctx.fillStyle = '#ffd700';
        ctx.fillText('BOSS', m.x + sx, m.y + m.r + 8);
      }
    });

    const prev = gs.monsters.length;
    gs.monsters = gs.monsters.filter(m => m.age < m.maxAge);
    const escaped = prev - gs.monsters.length;
    gs.missed += escaped;
    if (escaped) document.getElementById('gs-lives').textContent = `MISSED: ${gs.missed}/5`;
    if (gs.missed >= 5) { endGame(gs.score); return; }
    if (gs.score > gs.level * 150) { gs.level++; document.getElementById('gs-wave').textContent = gs.level; }
    if (gs.running) gs.raf = requestAnimationFrame(draw);
  }

  gs.interval = setInterval(() => { if (gs.running) spawn(); }, Math.max(500, 1200 - gs.level * 80));

  canvas.onclick = e => {
    const r = canvas.getBoundingClientRect();
    const mx = (e.clientX - r.left) * (540 / r.width);
    const my = (e.clientY - r.top) * (340 / r.height);
    gs.monsters = gs.monsters.filter(m => {
      const d = Math.hypot(mx - m.x, my - m.y);
      if (d < m.r + 8) {
        m.hp--; m.shake = 5;
        if (m.hp <= 0) {
          gs.score += m.isBoss ? 30 : 10;
          document.getElementById('gs-score').textContent = gs.score;
          spawnCoinBurst();
          return false;
        }
      }
      return true;
    });
  };
  draw();
}

/* ────────────── 2048 ────────────── */
function build2048(area, g) {
  area.innerHTML = `
    <div class="game-canvas-wrap" style="max-width:400px;margin:0 auto;">
      <div class="game-hud">
        <div class="hud-score">SCORE: <span id="gs-score">0</span></div>
        <div class="hud-lives">BEST: <span id="gs-best">0</span></div>
        <div class="hud-level">2048</div>
      </div>
      <div id="board2048" style="padding:14px;background:#050a0e;"></div>
      <div class="game-over-overlay" id="gameOver">
        <div class="go-title">GRID LOCKED</div>
        <div class="go-score" id="go-score">Score: 0</div>
        <div class="go-coins" id="go-coins">+0 VaultCoins earned</div>
        <button class="btn-restart" onclick="initGame(activeGame)">↺ RETRY</button>
      </div>
    </div>
    <div class="game-instructions"><kbd>↑↓←→</kbd> or <kbd>WASD</kbd> to slide tiles · Merge to reach 2048!</div>
  `;
  const SIZE = 4;
  let board = Array.from({length:SIZE}, () => Array(SIZE).fill(0));
  let score = 0;
  const colors = { 0:'#0d1b2a', 2:'#1a3a4a', 4:'#0a2818', 8:'#281a0a', 16:'#28180a', 32:'#320a0a', 64:'#3c0a1a', 128:'#1a0a28', 256:'#0a0a28', 512:'#00ffe7', 1024:'#ff3c78', 2048:'#ffd700' };

  function addTile() {
    const empty = [];
    for (let r=0; r<SIZE; r++) for (let c=0; c<SIZE; c++) if (!board[r][c]) empty.push([r,c]);
    if (!empty.length) return;
    const [r,c] = empty[Math.floor(Math.random()*empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
  addTile(); addTile();

  function render() {
    const d = document.getElementById('board2048');
    if (!d) return;
    d.innerHTML = '';
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:8px;';
    for (let r=0; r<SIZE; r++) for (let c=0; c<SIZE; c++) {
      const cell = document.createElement('div');
      const v = board[r][c];
      cell.style.cssText = `
        height:70px;border-radius:8px;
        background:${colors[Math.min(v,2048)] || '#1a0a28'};
        border:1px solid rgba(0,255,231,0.1);
        display:flex;align-items:center;justify-content:center;
        font-family:'Orbitron',monospace;font-weight:700;
        color:${v>=512?'#050a0e':'#fff'};font-size:${v>999?'0.85rem':'1.1rem'};
        transition:background 0.1s;
      `;
      if (v) cell.textContent = v;
      grid.appendChild(cell);
    }
    d.appendChild(grid);
    document.getElementById('gs-score').textContent = score;
  }

  function slide(row) {
    let r = row.filter(v=>v), gained = 0;
    for (let i=0;i<r.length-1;i++) if (r[i]===r[i+1]) { r[i]*=2; gained+=r[i]; r.splice(i+1,1); i++; }
    while (r.length<SIZE) r.push(0);
    return { row: r, gained };
  }

  function move(dir) {
    let moved = false, g = 0;
    const rotateR = m => m[0].map((_,i) => m.map(r=>r[i]).reverse());
    const rotateL = m => m[0].map((_,i) => m.map(r=>r[SIZE-1-i]));

    let b = board.map(r=>[...r]);
    if (dir==='up') b = rotateL(b);
    if (dir==='down') b = rotateR(b);
    if (dir==='right') b = b.map(r=>[...r].reverse());

    b = b.map(row => { const s=slide(row); g+=s.gained; if (s.row.join()!==row.join()) moved=true; return s.row; });

    if (dir==='up') b = rotateR(b);
    if (dir==='down') b = rotateL(b);
    if (dir==='right') b = b.map(r=>[...r].reverse());

    if (moved) { board=b; score+=g; addTile(); render(); if (g) spawnCoinBurst(); }

    // check game over
    let over = true;
    outer: for (let r=0;r<SIZE;r++) for (let c=0;c<SIZE;c++) {
      if (!board[r][c]) { over=false; break outer; }
      if (c<SIZE-1&&board[r][c]===board[r][c+1]) { over=false; break outer; }
      if (r<SIZE-1&&board[r][c]===board[r+1][c]) { over=false; break outer; }
    }
    if (over) endGame(score);
    if (board.flat().includes(2048)) { spawnCoinBurst(); spawnCoinBurst(); }
  }

  window.addEventListener('keydown', function kd(e) {
    if (!gameState.running && gameState !== gs) { window.removeEventListener('keydown', kd); return; }
    const map = { ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right', w:'up', s:'down', a:'left', d:'right' };
    if (map[e.key]) { e.preventDefault(); move(map[e.key]); }
  });

  // Touch swipe
  let tx=0, ty=0;
  const brd = document.getElementById('board2048');
  brd.addEventListener('touchstart', e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
  brd.addEventListener('touchend', e=>{
    const dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
    if (Math.abs(dx)>Math.abs(dy)) move(dx>0?'right':'left');
    else move(dy>0?'down':'up');
  },{passive:true});

  const gs = { running: true };
  gameState = gs;
  render();
}

/* ────────────── RACER ────────────── */
function buildRacer(area, g) {
  area.innerHTML = `
    <div class="game-canvas-wrap">
      <div class="game-hud">
        <div class="hud-score">DIST: <span id="gs-score">0</span>m</div>
        <div class="hud-lives" id="gs-lives">❤️❤️❤️</div>
        <div class="hud-level">SPD <span id="gs-wave">1</span></div>
      </div>
      <canvas id="gameCanvas" width="540" height="340"></canvas>
      <div class="game-over-overlay" id="gameOver">
        <div class="go-title">CRASH!</div>
        <div class="go-score" id="go-score">Distance: 0m</div>
        <div class="go-coins" id="go-coins">+0 VaultCoins earned</div>
        <button class="btn-restart" onclick="initGame(activeGame)">↺ RETRY</button>
      </div>
    </div>
    <div class="game-instructions"><kbd>←</kbd> <kbd>→</kbd> to steer · Dodge traffic · Collect ⛽</div>
  `;
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const LANES = [90, 180, 270, 360, 450];
  const gs = {
    car: { x: 270, y: 290, w: 30, h: 50, targetX: 270 },
    obstacles: [], fuel: [], roadY: 0, dist: 0, lives: 3,
    speed: 4, running: true, raf: null, interval: null, frame: 0
  };
  gameState = gs;

  const keys = {};
  window.addEventListener('keydown', function kd(e) {
    if (!gs.running) { window.removeEventListener('keydown', kd); return; }
    keys[e.key] = true; e.preventDefault();
  });
  window.addEventListener('keyup', e => { keys[e.key] = false; });

  function spawnObs() {
    const lane = LANES[Math.floor(Math.random() * LANES.length)];
    gs.obstacles.push({ x: lane, y: -60, w: 30, h: 50, emoji: ['🚗','🚕','🚙','🚌'][Math.floor(Math.random()*4)] });
  }
  function spawnFuel() {
    const lane = LANES[Math.floor(Math.random() * LANES.length)];
    gs.fuel.push({ x: lane, y: -40, r: 16 });
  }
  gs.interval = setInterval(() => {
    if (!gs.running) return;
    if (Math.random() < 0.6) spawnObs();
    if (Math.random() < 0.2) spawnFuel();
  }, Math.max(400, 900 - gs.speed * 50));

  function draw() {
    gs.frame++;
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 0, 540, 340);
    // Road
    ctx.fillStyle = '#2a2a2a'; ctx.fillRect(60, 0, 420, 340);
    // Lane markings
    gs.roadY = (gs.roadY + gs.speed) % 60;
    for (let x = 150; x < 500; x += 90) {
      for (let y = -60 + gs.roadY; y < 380; y += 60) {
        ctx.fillStyle = '#555'; ctx.fillRect(x - 2, y, 4, 30);
      }
    }
    // Move car
    if (keys['ArrowLeft'] || keys['a']) gs.car.x = Math.max(75, gs.car.x - 4);
    if (keys['ArrowRight'] || keys['d']) gs.car.x = Math.min(465, gs.car.x + 4);

    // Move obstacles
    gs.obstacles.forEach(o => { o.y += gs.speed; });
    gs.fuel.forEach(f => { f.y += gs.speed; });

    // Collision detection
    gs.obstacles = gs.obstacles.filter(o => {
      if (o.y > 380) return false;
      const hit = Math.abs(o.x - gs.car.x) < 28 && Math.abs(o.y - gs.car.y) < 44;
      if (hit) {
        gs.lives--;
        document.getElementById('gs-lives').textContent = '❤️'.repeat(Math.max(0, gs.lives));
        return false;
      }
      ctx.font = '28px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(o.emoji, o.x, o.y);
      return true;
    });
    gs.fuel = gs.fuel.filter(f => {
      if (f.y > 380) return false;
      const hit = Math.hypot(f.x - gs.car.x, f.y - gs.car.y) < 30;
      if (hit) { gs.lives = Math.min(3, gs.lives + 1); document.getElementById('gs-lives').textContent = '❤️'.repeat(gs.lives); spawnCoinBurst(); return false; }
      ctx.font = '22px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('⛽', f.x, f.y);
      return true;
    });

    // Player car
    ctx.font = '36px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('🏎️', gs.car.x, gs.car.y);

    gs.dist++;
    if (gs.dist % 300 === 0) gs.speed = Math.min(12, gs.speed + 0.5);
    document.getElementById('gs-score').textContent = gs.dist;
    document.getElementById('gs-wave').textContent = gs.speed.toFixed(1);

    if (gs.lives <= 0) { endGame(gs.dist); return; }
    if (gs.running) gs.raf = requestAnimationFrame(draw);
  }
  draw();
}

/* ────────────── GHOST ────────────── */
function buildGhost(area, g) {
  area.innerHTML = `
    <div class="game-canvas-wrap">
      <div class="game-hud">
        <div class="hud-score">BANISHED: <span id="gs-score">0</span></div>
        <div class="hud-lives" id="gs-timer">⏱ 30s</div>
        <div class="hud-level">COMBO x<span id="gs-combo">1</span></div>
      </div>
      <canvas id="gameCanvas" width="540" height="340"></canvas>
      <div class="game-over-overlay" id="gameOver">
        <div class="go-title">HAUNTED!</div>
        <div class="go-score" id="go-score">Banished: 0</div>
        <div class="go-coins" id="go-coins">+0 VaultCoins earned</div>
        <button class="btn-restart" onclick="initGame(activeGame)">↺ RETRY</button>
      </div>
    </div>
    <div class="game-instructions">🖱️ <kbd>CLICK</kbd> ghosts to banish them before they vanish!</div>
  `;
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const gs = { score: 0, combo: 1, ghosts: [], timeLeft: 30, running: true, raf: null, interval: null, frame: 0 };
  gameState = gs;

  const GHOSTS = ['👻','💀','🕷️','🦇','🌙','☠️'];
  function spawn() {
    if (!gs.running) return;
    const speed = 1 + gs.score * 0.05;
    gs.ghosts.push({
      x: 30 + Math.random() * 480, y: 30 + Math.random() * 280,
      r: 28, age: 0, maxAge: Math.max(40, 80 - gs.score),
      emoji: GHOSTS[Math.floor(Math.random() * GHOSTS.length)],
      fast: Math.random() < 0.2,
      vx: (Math.random()-0.5) * speed * 2, vy: (Math.random()-0.5) * speed * 2
    });
  }

  // Timer countdown
  const tik = setInterval(() => {
    if (!gs.running) { clearInterval(tik); return; }
    gs.timeLeft--;
    document.getElementById('gs-timer').textContent = `⏱ ${gs.timeLeft}s`;
    if (gs.timeLeft <= 0) { clearInterval(tik); endGame(gs.score); }
  }, 1000);

  gs.interval = setInterval(() => { if (gs.running) spawn(); }, 700);

  function draw() {
    ctx.clearRect(0, 0, 540, 340);
    ctx.fillStyle = '#050a0e'; ctx.fillRect(0, 0, 540, 340);
    // moonlight gradient
    const grd = ctx.createRadialGradient(270, 170, 0, 270, 170, 200);
    grd.addColorStop(0, 'rgba(100,0,255,0.04)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, 540, 340);

    gs.ghosts.forEach(gh => {
      gh.age++; gh.x += gh.vx; gh.y += gh.vy;
      if (gh.x < 20 || gh.x > 520) gh.vx *= -1;
      if (gh.y < 20 || gh.y > 320) gh.vy *= -1;
      const fade = gh.age > gh.maxAge * 0.7 ? 1 - (gh.age - gh.maxAge*0.7)/(gh.maxAge*0.3) : 1;
      ctx.globalAlpha = fade;
      ctx.font = gh.fast ? '38px serif' : '30px serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(gh.emoji, gh.x, gh.y);
      ctx.globalAlpha = 1;
    });
    gs.ghosts = gs.ghosts.filter(gh => gh.age < gh.maxAge);
    if (gs.running) gs.raf = requestAnimationFrame(draw);
  }

  canvas.onclick = e => {
    const r = canvas.getBoundingClientRect();
    const mx = (e.clientX - r.left) * (540/r.width);
    const my = (e.clientY - r.top) * (340/r.height);
    let hit = false;
    gs.ghosts = gs.ghosts.filter(gh => {
      const d = Math.hypot(mx - gh.x, my - gh.y);
      if (d < gh.r + 8) {
        gs.score += (gh.fast ? 3 : 1) * gs.combo;
        gs.combo = Math.min(gs.combo + 1, 5);
        document.getElementById('gs-score').textContent = gs.score;
        document.getElementById('gs-combo').textContent = gs.combo;
        spawnCoinBurst();
        hit = true; return false;
      }
      return true;
    });
    if (!hit) gs.combo = 1;
  };
  draw();
}

/* ────────────── SPACE SHOOTER ────────────── */
function buildSpace(area, g) {
  area.innerHTML = `
    <div class="game-canvas-wrap">
      <div class="game-hud">
        <div class="hud-score">KILLS: <span id="gs-score">0</span></div>
        <div class="hud-lives" id="gs-lives">🛡️🛡️🛡️</div>
        <div class="hud-level">WAVE <span id="gs-wave">1</span></div>
      </div>
      <canvas id="gameCanvas" width="540" height="360"></canvas>
      <div class="game-over-overlay" id="gameOver">
        <div class="go-title">SHIP DESTROYED</div>
        <div class="go-score" id="go-score">Kills: 0</div>
        <div class="go-coins" id="go-coins">+0 VaultCoins earned</div>
        <button class="btn-restart" onclick="initGame(activeGame)">↺ RETRY</button>
      </div>
    </div>
    <div class="game-instructions"><kbd>←→</kbd> Move · <kbd>SPACE</kbd> Shoot · Destroy enemies, dodge asteroids</div>
  `;
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const gs = {
    ship: { x: 270, y: 320, w: 24, h: 28 },
    bullets: [], enemies: [], asteroids: [], stars: [],
    score: 0, shield: 3, wave: 1,
    running: true, raf: null, interval: null, frame: 0,
    lastShot: 0
  };
  gameState = gs;

  // Stars
  for (let i=0;i<80;i++) gs.stars.push({x:Math.random()*540,y:Math.random()*360,r:Math.random()*1.5+0.5,v:Math.random()*1.5+0.5});

  const keys = {};
  window.addEventListener('keydown', function kd(e) {
    if (!gs.running) { window.removeEventListener('keydown', kd); return; }
    keys[e.key] = true;
    if (e.key === ' ') e.preventDefault();
  });
  window.addEventListener('keyup', e => { keys[e.key] = false; });

  function spawnEnemy() {
    gs.enemies.push({x:30+Math.random()*480,y:-30,vy:1.5+gs.wave*0.5,hp:1+Math.floor(gs.wave/3),emoji:['👾','🤖','🛸'][Math.floor(Math.random()*3)]});
  }
  function spawnAsteroid() {
    gs.asteroids.push({x:Math.random()*540,y:-30,vy:2+Math.random()*2,r:14+Math.random()*12,vx:(Math.random()-0.5)*2});
  }
  gs.interval = setInterval(() => {
    if (!gs.running) return;
    spawnEnemy();
    if (Math.random()<0.4) spawnAsteroid();
    if (gs.score>gs.wave*5) { gs.wave++; document.getElementById('gs-wave').textContent=gs.wave; }
  }, Math.max(400, 1000-gs.wave*80));

  function draw() {
    gs.frame++;
    ctx.fillStyle = '#020408'; ctx.fillRect(0,0,540,360);
    // Stars
    gs.stars.forEach(s=>{
      s.y += s.v;
      if (s.y > 360) { s.y = 0; s.x = Math.random()*540; }
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(200,220,255,${s.r/2})`; ctx.fill();
    });

    // Move ship
    if ((keys['ArrowLeft']||keys['a']) && gs.ship.x>24) gs.ship.x -= 5;
    if ((keys['ArrowRight']||keys['d']) && gs.ship.x<516) gs.ship.x += 5;
    if (keys[' '] && gs.frame-gs.lastShot>12) {
      gs.bullets.push({x:gs.ship.x,y:gs.ship.y-20,vy:-8});
      gs.lastShot=gs.frame;
    }

    // Bullets
    gs.bullets = gs.bullets.filter(b=>{
      b.y+=b.vy; if(b.y<0) return false;
      ctx.beginPath(); ctx.arc(b.x,b.y,3,0,Math.PI*2);
      ctx.fillStyle='#00ffe7'; ctx.fill();
      ctx.shadowBlur=6; ctx.shadowColor='#00ffe7';
      ctx.fill(); ctx.shadowBlur=0;
      return true;
    });

    // Enemies
    gs.enemies = gs.enemies.filter(en=>{
      en.y+=en.vy; if(en.y>380) return false;
      ctx.font='26px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(en.emoji,en.x,en.y);
      // Bullet collision
      let killed=false;
      gs.bullets = gs.bullets.filter(b=>{
        if(Math.hypot(b.x-en.x,b.y-en.y)<20){en.hp--;if(en.hp<=0)killed=true;return false;} return true;
      });
      if(killed){gs.score++;document.getElementById('gs-score').textContent=gs.score;spawnCoinBurst();return false;}
      // Ship collision
      if(Math.abs(en.x-gs.ship.x)<22&&Math.abs(en.y-gs.ship.y)<26){
        gs.shield--;document.getElementById('gs-lives').textContent='🛡️'.repeat(Math.max(0,gs.shield));return false;
      }
      return true;
    });

    // Asteroids
    gs.asteroids = gs.asteroids.filter(a=>{
      a.y+=a.vy; a.x+=a.vx; if(a.y>380) return false;
      ctx.font=`${a.r*1.8}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('☄️',a.x,a.y);
      if(Math.hypot(a.x-gs.ship.x,a.y-gs.ship.y)<a.r+14){
        gs.shield--;document.getElementById('gs-lives').textContent='🛡️'.repeat(Math.max(0,gs.shield));return false;
      }
      return true;
    });

    // Ship
    ctx.font='30px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('🚀',gs.ship.x,gs.ship.y);

    if(gs.shield<=0){endGame(gs.score);return;}
    if(gs.running) gs.raf=requestAnimationFrame(draw);
  }
  draw();
}

/* ─────────────────────────────────────────────
   GAME OVER
───────────────────────────────────────────── */
function endGame(score) {
  gameState.running = false;
  if (gameState.interval) clearInterval(gameState.interval);

  const coinsEarned = Math.floor(score * 0.5 + 25);
  coins += coinsEarned;
  updateCoinDisplay();

  document.getElementById('go-score').textContent = `Score: ${score}`;
  document.getElementById('go-coins').textContent = `+${coinsEarned} VaultCoins earned!`;
  document.getElementById('gameOver').classList.add('show');

  // Burst celebration
  for (let i = 0; i < 5; i++) setTimeout(spawnCoinBurst, i * 120);
}

/* ─────────────────────────────────────────────
   COIN BURST EFFECT
───────────────────────────────────────────── */
function spawnCoinBurst() {
  const el = document.createElement('div');
  el.className = 'coin-burst';
  el.textContent = '💰';
  const x = 100 + Math.random() * (window.innerWidth - 200);
  const dx = (Math.random() - 0.5) * 80;
  el.style.cssText = `left:${x}px;top:${window.innerHeight * 0.7}px;--dx:${dx}px;`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

/* ─────────────────────────────────────────────
   COIN DISPLAY
───────────────────────────────────────────── */
function updateCoinDisplay() {
  const el = document.getElementById('coinVal');
  if (el) el.textContent = coins.toLocaleString();
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderQuiz();
  updateCoinDisplay();

  // Close modals on backdrop click
  document.getElementById('ruleModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('ruleModal')) closeRules();
  });
  document.getElementById('playModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('playModal')) closeGame();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeGame();
      closeRules();
    }
  });
});
