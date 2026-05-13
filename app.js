/* =====================================================
   NIMA YEYMIZ? — app.js
   Full Production Logic
   ===================================================== */

'use strict';

/* ===================================================
   STATE & STORAGE
   =================================================== */
const STORAGE_KEYS = {
  USER: 'ny_user',
  FOODS: 'ny_foods',
  CART: 'ny_cart',
  ROULETTE_REWARDS: 'ny_rewards',
  ROULETTE_HISTORY: 'ny_roulette_history',
  ORDERS: 'ny_orders',
  LAST_BONUS: 'ny_last_bonus',
  LANG: 'ny_lang',
  THEME: 'ny_theme',
  TOTAL_DIAMONDS: 'ny_total_diamonds',
};

function load(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

/* ===================================================
   DEFAULT DATA
   =================================================== */
const DEFAULT_FOODS = [
  {
    id: 'f1', name: 'Classic Burger', category: 'fastfood',
    desc: 'Juicy beef patty, fresh lettuce, tomato, special sauce',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    price: 35000, cashback: 5, diamonds: 3,
  },
  {
    id: 'f2', name: 'Margherita Pizza', category: 'fastfood',
    desc: 'Fresh mozzarella, tomato sauce, basil leaves',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    price: 45000, cashback: 7, diamonds: 4,
  },
  {
    id: 'f3', name: 'Osh (Palov)', category: 'milliy',
    desc: 'Traditional Uzbek rice pilaf with lamb and carrots',
    img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80',
    price: 28000, cashback: 4, diamonds: 2,
  },
  {
    id: 'f4', name: 'Lagʼmon', category: 'milliy',
    desc: 'Hand-pulled noodles with vegetables and meat',
    img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80',
    price: 22000, cashback: 3, diamonds: 2,
  },
  {
    id: 'f5', name: 'Fresh Juice', category: 'ichimlik',
    desc: 'Orange, apple or pomegranate — fresh squeezed',
    img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    price: 12000, cashback: 5, diamonds: 1,
  },
  {
    id: 'f6', name: 'Caesar Salat', category: 'salat',
    desc: 'Romaine, croutons, parmesan, caesar dressing',
    img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80',
    price: 18000, cashback: 6, diamonds: 2,
  },
  {
    id: 'f7', name: 'Chocolate Cake', category: 'shirinlik',
    desc: 'Rich dark chocolate layer cake, ganache frosting',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    price: 15000, cashback: 5, diamonds: 1,
  },
  {
    id: 'f8', name: 'Hot Dog', category: 'fastfood',
    desc: 'Grilled sausage, mustard, ketchup, jalapeños',
    img: 'https://images.unsplash.com/photo-1620374645310-f827b26e5a0d?w=400&q=80',
    price: 18000, cashback: 4, diamonds: 2,
  },
  {
    id: 'f9', name: 'Samsa', category: 'milliy',
    desc: 'Flaky pastry filled with spiced lamb and onion',
    img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',
    price: 8000, cashback: 3, diamonds: 1,
  },
  {
    id: 'f10', name: 'Milkshake', category: 'ichimlik',
    desc: 'Creamy vanilla, chocolate or strawberry blend',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',
    price: 14000, cashback: 5, diamonds: 1,
  },
];

const DEFAULT_REWARDS = [
  { id: 'r1', label: '💎 +5 Diamonds', icon: '💎', color: '#00ff88', type: 'diamonds', value: 5 },
  { id: 'r2', label: '💎 +10 Diamonds', icon: '💎', color: '#00cc6a', type: 'diamonds', value: 10 },
  { id: 'r3', label: '💰 5% Cashback', icon: '💰', color: '#ffaa00', type: 'cashback', value: 5 },
  { id: 'r4', label: '🏷️ 10% Chegirma', icon: '🏷️', color: '#ff6b6b', type: 'discount', value: 10 },
  { id: 'r5', label: '🍔 Bepul Burger', icon: '🍔', color: '#ff9f43', type: 'food', value: 1 },
  { id: 'r6', label: '💎 +3 Diamonds', icon: '💎', color: '#54a0ff', type: 'diamonds', value: 3 },
  { id: 'r7', label: '💰 10% Cashback', icon: '💰', color: '#5f27cd', type: 'cashback', value: 10 },
  { id: 'r8', label: '😞 Omadsiz', icon: '😞', color: '#576574', type: 'none', value: 0 },
];

const DEFAULT_LEADERBOARD = [
  { name: 'Azizbek', diamonds: 284, orders: 42 },
  { name: 'Malika', diamonds: 231, orders: 37 },
  { name: 'Jasur', diamonds: 198, orders: 31 },
  { name: 'Nilufar', diamonds: 165, orders: 28 },
  { name: 'Bobur', diamonds: 142, orders: 22 },
];

const FAQS = {
  uz: [
    { q: 'Qanday buyurtma beraman?', a: 'Taomni tanlang, savatga qo\'shing va "Buyurtma berish" tugmasini bosing.' },
    { q: 'Diamonds nima?', a: 'Har 10 000 so\'m sarflashda 1 diamond beriladi. Diamonds bilan roulette o\'ynash mumkin.' },
    { q: 'Cashback qanday ishlaydi?', a: 'Har bir buyurtmadan 3% cashback hisobingizga o\'tadi.' },
    { q: 'Yetkazib berish qoidalari', a: '30-60 daqiqa ichida yetkazib beriladi. Minimal buyurtma 15 000 so\'m.' },
  ],
  ru: [
    { q: 'Как сделать заказ?', a: 'Выберите блюдо, добавьте в корзину и нажмите "Оформить заказ".' },
    { q: 'Что такое Diamonds?', a: 'За каждые 10 000 сум вы получаете 1 diamond. Их можно использовать в рулетке.' },
    { q: 'Как работает кэшбэк?', a: 'С каждого заказа начисляется 3% кэшбэк на ваш счёт.' },
    { q: 'Правила доставки', a: 'Доставка 30-60 минут. Минимальный заказ 15 000 сум.' },
  ],
};

const GREETINGS = {
  uz: ['Xayrli tong!', 'Xayrli kun!', 'Xayrli kech!'],
  ru: ['Доброе утро!', 'Добрый день!', 'Добрый вечер!'],
};

/* ===================================================
   APP STATE
   =================================================== */
let state = {
  user: null,
  foods: [],
  cart: [],
  rewards: [],
  rouletteHistory: [],
  orders: [],
  currentPage: 'home',
  currentCategory: 'all',
  searchQuery: '',
  lang: 'uz',
  theme: 'dark',
  spinning: false,
  editingFoodId: null,
  editingRewardId: null,
  totalDiamondsGiven: 0,
};

/* ===================================================
   INITIALIZATION
   =================================================== */
function initApp() {
  loadState();
  showSplash();
}

function loadState() {
  state.user = load(STORAGE_KEYS.USER);
  state.foods = load(STORAGE_KEYS.FOODS) || DEFAULT_FOODS;
  state.cart = load(STORAGE_KEYS.CART) || [];
  state.rewards = load(STORAGE_KEYS.ROULETTE_REWARDS) || DEFAULT_REWARDS;
  state.rouletteHistory = load(STORAGE_KEYS.ROULETTE_HISTORY) || [];
  state.orders = load(STORAGE_KEYS.ORDERS) || [];
  state.lang = load(STORAGE_KEYS.LANG) || 'uz';
  state.theme = load(STORAGE_KEYS.THEME) || 'dark';
  state.totalDiamondsGiven = load(STORAGE_KEYS.TOTAL_DIAMONDS) || 0;
  applyTheme(state.theme);
}

/* ===================================================
   SPLASH SCREEN
   =================================================== */
function showSplash() {
  const splash = document.getElementById('splash-screen');
  createParticles();
  createFloatingEmojis();
  animateChars();
  fillLoader();

  setTimeout(() => {
    splash.style.opacity = '0';
    splash.style.transform = 'scale(1.05)';
    splash.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      splash.classList.add('hidden');
      if (state.user) {
        showApp();
      } else {
        showPage('page-register');
      }
    }, 500);
  }, 3200);
}

function createParticles() {
  const container = document.getElementById('splash-particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
    p.style.animationDuration = (3 + Math.random() * 4) + 's';
    p.style.animationDelay = Math.random() * 3 + 's';
    p.style.width = (1 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}

function createFloatingEmojis() {
  const container = document.getElementById('splash-emojis');
  const emojis = ['🍔', '🍕', '🥗', '🍰', '🥤', '🍜', '🥘', '🍣'];
  emojis.forEach((emoji, i) => {
    const span = document.createElement('span');
    span.className = 'float-emoji';
    span.textContent = emoji;
    span.style.animationDelay = i * 0.15 + 's';
    container.appendChild(span);
  });
}

function animateChars() {
  const chars = document.querySelectorAll('.char');
  chars.forEach((c, i) => {
    c.style.animationDelay = 0.4 + i * 0.07 + 's';
  });
}

function fillLoader() {
  const fill = document.getElementById('loader-fill');
  const text = document.getElementById('loader-text');
  const messages = ['Yuklanmoqda...', 'Taomlar tayyorlanmoqda...', 'Tayyor! 🚀'];
  let progress = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    fill.style.width = progress + '%';
    const newIdx = progress < 40 ? 0 : progress < 80 ? 1 : 2;
    if (newIdx !== msgIdx) { msgIdx = newIdx; text.textContent = messages[msgIdx]; }
  }, 120);
}

/* ===================================================
   PAGE MANAGEMENT
   =================================================== */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const page = document.getElementById(pageId);
  if (page) page.classList.remove('hidden');
}

function showApp() {
  document.getElementById('page-register')?.classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  navigateTo('home');
  updateGreeting();
  renderFoods();
  renderCartBadge();
  updateHomeStats();
  checkDailyBonus();
  renderLeaderboard();
  renderFAQ();
  renderProfilePage();
}

function navigateTo(page) {
  state.currentPage = page;
  document.querySelectorAll('.app-page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  if (page === 'roulette') renderRoulette();
  if (page === 'leaderboard') renderLeaderboard();
  if (page === 'profile') renderProfilePage();
  if (page === 'admin') renderAdminPage();
}

/* ===================================================
   REGISTRATION
   =================================================== */
function initRegister() {
  const phoneInput = document.getElementById('reg-phone');
  phoneInput.addEventListener('input', () => {
    let val = phoneInput.value.replace(/\D/g, '');
    if (val.length > 9) val = val.slice(0, 9);
    let formatted = '';
    if (val.length > 0) formatted = val.slice(0, 2);
    if (val.length > 2) formatted += ' ' + val.slice(2, 5);
    if (val.length > 5) formatted += ' ' + val.slice(5, 7);
    if (val.length > 7) formatted += ' ' + val.slice(7, 9);
    phoneInput.value = formatted;
  });

  document.getElementById('btn-register').addEventListener('click', handleRegister);
}

function handleRegister() {
  const nameInput = document.getElementById('reg-name');
  const phoneInput = document.getElementById('reg-phone');
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');

  nameError.textContent = '';
  phoneError.textContent = '';

  const name = nameInput.value.trim();
  const phone = phoneInput.value.replace(/\s/g, '');
  let valid = true;

  if (!name || name.length < 2) {
    nameError.textContent = "Iltimos, to'liq ismingizni kiriting";
    valid = false;
  }
  if (phone.length !== 9 || !/^\d+$/.test(phone)) {
    phoneError.textContent = "Telefon raqam 9 ta raqamdan iborat bo'lishi kerak";
    valid = false;
  }
  if (!valid) return;

  const user = {
    id: Date.now().toString(),
    name,
    phone: '+998' + phone,
    diamonds: 10,
    cashback: 3,
    level: 1,
    xp: 0,
    orderCount: 0,
    createdAt: Date.now(),
  };

  state.user = user;
  save(STORAGE_KEYS.USER, user);

  const btn = document.getElementById('btn-register');
  btn.innerHTML = '✅ Muvaffaqiyatli!';
  btn.style.background = 'linear-gradient(135deg, #00994d, #00ff88)';

  setTimeout(() => {
    showApp();
    showToast('Xush kelibsiz, ' + user.name.split(' ')[0] + '! 🎉', 'success');
  }, 700);
}

/* ===================================================
   GREETING
   =================================================== */
function updateGreeting() {
  if (!state.user) return;
  const hour = new Date().getHours();
  const idx = hour < 12 ? 0 : hour < 18 ? 1 : 2;
  const greetings = GREETINGS[state.lang];
  document.getElementById('greeting-time').textContent = greetings[idx];
  document.getElementById('greeting-name').textContent = state.user.name.split(' ')[0];
}

/* ===================================================
   HOME STATS
   =================================================== */
function updateHomeStats() {
  if (!state.user) return;
  animateCount('home-diamonds', state.user.diamonds);
  document.getElementById('home-cashback').textContent = state.user.cashback + '%';
  document.getElementById('home-level').textContent = state.user.level;
  renderCartBadge();
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.ceil(target / 20);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 30);
}

/* ===================================================
   DAILY BONUS
   =================================================== */
function checkDailyBonus() {
  const lastBonus = load(STORAGE_KEYS.LAST_BONUS);
  const today = new Date().toDateString();
  const btn = document.getElementById('btn-daily-bonus');
  if (lastBonus === today) {
    btn.textContent = '✅ Olindi';
    btn.disabled = true;
  }
}

function claimDailyBonus() {
  const today = new Date().toDateString();
  const lastBonus = load(STORAGE_KEYS.LAST_BONUS);
  if (lastBonus === today) { showToast('Bugungi bonus allaqachon olindi!', 'warning'); return; }
  save(STORAGE_KEYS.LAST_BONUS, today);
  addDiamonds(5);
  addXP(50);
  const btn = document.getElementById('btn-daily-bonus');
  btn.textContent = '✅ Olindi';
  btn.disabled = true;
  showToast('💎 +5 Diamonds olindi! Barakalla!', 'success');
  triggerConfetti();
  updateHomeStats();
}

/* ===================================================
   FOOD RENDERING
   =================================================== */
function renderFoods() {
  const grid = document.getElementById('food-grid');
  const empty = document.getElementById('food-empty');
  if (!grid) return;

  let filtered = state.foods;
  if (state.currentCategory !== 'all') {
    filtered = filtered.filter(f => f.category === state.currentCategory);
  }
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.desc.toLowerCase().includes(q)
    );
  }

  grid.innerHTML = '';
  if (!filtered.length) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  filtered.forEach((food, i) => {
    const card = createFoodCard(food, i);
    grid.appendChild(card);
  });
}

function createFoodCard(food, delay = 0) {
  const div = document.createElement('div');
  div.className = 'food-card';
  div.style.animationDelay = delay * 0.06 + 's';
  div.innerHTML = `
    <div class="food-card-img-wrap">
      <img class="food-card-img" src="${food.img}" alt="${food.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'" />
      <span class="food-card-badge">💎 ${food.diamonds}</span>
    </div>
    <div class="food-card-body">
      <div class="food-card-name">${food.name}</div>
      <div class="food-card-desc">${food.desc}</div>
      <div class="food-card-footer">
        <span class="food-card-price">${formatPrice(food.price)}</span>
        <span class="food-card-meta">💰${food.cashback}%</span>
      </div>
      <button class="btn-add-cart" data-food-id="${food.id}">🛒 Savatga</button>
    </div>
  `;
  div.querySelector('.food-card-img-wrap').addEventListener('click', () => openFoodModal(food));
  div.querySelector('.food-card-name').addEventListener('click', () => openFoodModal(food));
  div.querySelector('.btn-add-cart').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(food.id);
  });
  return div;
}

function openFoodModal(food) {
  document.getElementById('modal-img').src = food.img;
  document.getElementById('modal-img').onerror = function () { this.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'; };
  document.getElementById('modal-name').textContent = food.name;
  document.getElementById('modal-desc').textContent = food.desc;
  document.getElementById('modal-price').textContent = formatPrice(food.price);
  document.getElementById('modal-cashback').textContent = '💰 Cashback ' + food.cashback + '%';
  document.getElementById('modal-diamonds').textContent = '💎 +' + food.diamonds;
  document.getElementById('btn-modal-cart').onclick = () => {
    addToCart(food.id);
    closeFoodModal();
  };
  document.getElementById('food-modal-overlay').classList.remove('hidden');
}

function closeFoodModal() {
  document.getElementById('food-modal-overlay').classList.add('hidden');
}

/* ===================================================
   CART SYSTEM
   =================================================== */
function addToCart(foodId) {
  const food = state.foods.find(f => f.id === foodId);
  if (!food) return;
  const existing = state.cart.find(i => i.id === foodId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...food, qty: 1 });
  }
  save(STORAGE_KEYS.CART, state.cart);
  renderCartBadge();
  showToast('🛒 ' + food.name + ' savatga qo\'shildi', 'success');
  animateCartBadge();
}

function removeFromCart(foodId) {
  const idx = state.cart.findIndex(i => i.id === foodId);
  if (idx === -1) return;
  if (state.cart[idx].qty > 1) {
    state.cart[idx].qty--;
  } else {
    state.cart.splice(idx, 1);
  }
  save(STORAGE_KEYS.CART, state.cart);
  renderCartBadge();
  renderCartDrawer();
}

function renderCartBadge() {
  const badge = document.getElementById('cart-badge');
  const total = state.cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = total;
  badge.classList.toggle('hidden', total === 0);
}

function animateCartBadge() {
  const badge = document.getElementById('cart-badge');
  badge.classList.remove('count-animate');
  void badge.offsetWidth;
  badge.classList.add('count-animate');
}

function renderCartDrawer() {
  const itemsContainer = document.getElementById('cart-items');
  const emptyCart = document.getElementById('empty-cart');
  const footer = document.getElementById('cart-footer');

  if (state.cart.length === 0) {
    emptyCart.classList.remove('hidden');
    footer.classList.add('hidden');
    itemsContainer.innerHTML = '';
    itemsContainer.appendChild(emptyCart);
    return;
  }

  emptyCart.classList.add('hidden');
  footer.classList.remove('hidden');
  itemsContainer.innerHTML = '';

  state.cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-id="${item.id}" data-action="remove">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-action="add">+</button>
      </div>
    `;
    itemsContainer.appendChild(div);
  });

  const totalPrice = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const diamondEarn = Math.floor(totalPrice / 10000);
  const cashbackEarn = Math.floor(totalPrice * 3 / 100);

  document.getElementById('cart-total-price').textContent = formatPrice(totalPrice);
  document.getElementById('cart-diamond-earn').textContent = '+' + diamondEarn;
  document.getElementById('cart-cashback-earn').textContent = formatPrice(cashbackEarn);
}

function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  drawer.classList.remove('hidden');
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => drawer.classList.add('open'));
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  drawer.classList.remove('open');
  setTimeout(() => {
    drawer.classList.add('hidden');
    overlay.classList.add('hidden');
  }, 400);
}

function checkout() {
  if (state.cart.length === 0) { showToast('Savat bo\'sh!', 'warning'); return; }

  const totalPrice = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const diamondsEarned = Math.floor(totalPrice / 10000);
  const xpEarned = Math.floor(totalPrice / 1000);

  // Save order
  const order = {
    id: Date.now().toString(),
    items: [...state.cart],
    total: totalPrice,
    diamonds: diamondsEarned,
    date: new Date().toLocaleDateString(state.lang === 'uz' ? 'uz-UZ' : 'ru-RU'),
    timestamp: Date.now(),
  };
  state.orders.push(order);
  save(STORAGE_KEYS.ORDERS, state.orders);

  // Rewards
  addDiamonds(diamondsEarned);
  addXP(xpEarned);
  if (state.user) {
    // Fixed: always 3% cashback, not level-based
    state.user.cashback = 3;
    state.user.orderCount = (state.user.orderCount || 0) + 1;
    state.totalDiamondsGiven += diamondsEarned;
    save(STORAGE_KEYS.TOTAL_DIAMONDS, state.totalDiamondsGiven);
    save(STORAGE_KEYS.USER, state.user);
  }

  // Clear cart
  state.cart = [];
  save(STORAGE_KEYS.CART, state.cart);

  closeCartDrawer();
  triggerConfetti();
  showToast(`✅ Buyurtma berildi! 💎 +${diamondsEarned} diamonds!`, 'success');
  updateHomeStats();
  renderCartBadge();
  renderLeaderboard();
}

/* ===================================================
   USER STATS
   =================================================== */
function addDiamonds(n) {
  if (!state.user) return;
  state.user.diamonds = (state.user.diamonds || 0) + n;
  updateLevel();
  save(STORAGE_KEYS.USER, state.user);
}

function addXP(n) {
  if (!state.user) return;
  state.user.xp = (state.user.xp || 0) + n;
  updateLevel();
  save(STORAGE_KEYS.USER, state.user);
}

function updateLevel() {
  if (!state.user) return;
  const xpPerLevel = 1000;
  const newLevel = Math.floor(state.user.xp / xpPerLevel) + 1;
  if (newLevel > state.user.level) {
    state.user.level = newLevel;
    showToast('🎉 Level ' + newLevel + ' ga ko\'tarildingiz!', 'success');
    triggerConfetti();
  }
  // Fixed: cashback is always 3%, not level-based
  state.user.cashback = 3;
}

/* ===================================================
   ROULETTE
   =================================================== */
let rouletteAngle = 0;

function renderRoulette() {
  drawWheel(rouletteAngle);
  renderRouletteHistory();
}

function drawWheel(rotationAngle = 0) {
  const canvas = document.getElementById('roulette-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rewards = state.rewards;
  const n = rewards.length;
  const sliceAngle = (2 * Math.PI) / n;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = cx - 8;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Outer ring glow
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#00ff88';

  rewards.forEach((reward, i) => {
    const start = rotationAngle + i * sliceAngle;
    const end = start + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = reward.color || '#00994d';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Emoji / text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + sliceAngle / 2);
    ctx.textAlign = 'right';
    ctx.font = '18px serif';
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.fillText(reward.icon, r - 14, 6);
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(reward.label.substring(0, 10), r - 36, 6);
    ctx.restore();
  });

  // Center circle
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function spinWheel() {
  if (state.spinning) return;
  if (!state.user || state.user.diamonds < 1) {
    showToast('💎 Diamonds yetarli emas! (1 ta kerak)', 'error');
    return;
  }

  state.spinning = true;
  document.getElementById('btn-spin').disabled = true;

  // Deduct 1 diamond for spin
  addDiamonds(-1);
  updateHomeStats();

  const rewards = state.rewards;
  const n = rewards.length;
  const sliceAngle = (2 * Math.PI) / n;

  // Pick a random winner
  const winIdx = Math.floor(Math.random() * n);

  // FIX: Pointer is at top (270° = -π/2 from canvas 0°).
  // We need winIdx sector to align under the top pointer.
  // Sector i occupies: [rotationAngle + i*sliceAngle, rotationAngle + (i+1)*sliceAngle]
  // Center of winning sector must be at -π/2 (top).
  // So: finalAngle + winIdx*sliceAngle + sliceAngle/2 ≡ -π/2  (mod 2π)
  // => finalAngle = -π/2 - winIdx*sliceAngle - sliceAngle/2
  const pointerAngle = -Math.PI / 2;
  const targetFinalAngle = pointerAngle - winIdx * sliceAngle - sliceAngle / 2;

  // Add several full rotations so the wheel spins visibly
  const fullSpins = (5 + Math.floor(Math.random() * 5)) * 2 * Math.PI;

  // Normalise current angle to [0, 2π) to avoid drift accumulation
  const normCurrent = ((rouletteAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  // Target in same "frame" plus extra spins
  const normTarget = ((targetFinalAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const delta = ((normTarget - normCurrent + 2 * Math.PI) % (2 * Math.PI));
  const targetAngle = rouletteAngle + fullSpins + delta;

  const duration = 4000;
  const start = performance.now();
  const startAngle = rouletteAngle;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    rouletteAngle = startAngle + (targetAngle - startAngle) * easeOut(progress);
    drawWheel(rouletteAngle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rouletteAngle = targetAngle;
      drawWheel(rouletteAngle);
      state.spinning = false;
      document.getElementById('btn-spin').disabled = false;
      applyRouletteReward(rewards[winIdx]);
    }
  }

  requestAnimationFrame(animate);
}

function applyRouletteReward(reward) {
  const resultDiv = document.getElementById('roulette-result');
  document.getElementById('result-icon').textContent = reward.icon;
  document.getElementById('result-text').textContent = 'Tabriklaymiz!';
  document.getElementById('result-reward').textContent = reward.label;
  resultDiv.classList.remove('hidden');

  if (reward.type === 'diamonds' && reward.value > 0) {
    addDiamonds(reward.value);
    updateHomeStats();
    showToast('💎 +' + reward.value + ' Diamonds qo\'shildi!', 'success');
    triggerConfetti();
  } else if (reward.type === 'cashback') {
    if (state.user) {
      state.user.cashback = Math.min((state.user.cashback || 0) + reward.value, 30);
      save(STORAGE_KEYS.USER, state.user);
    }
    showToast('💰 +' + reward.value + '% Cashback qo\'shildi!', 'success');
    triggerConfetti();
  } else if (reward.type === 'food') {
    showToast('🍔 Bepul taom yutdingiz!', 'success');
    triggerConfetti();
  } else if (reward.type === 'discount') {
    showToast('🏷️ ' + reward.value + '% chegirma yutdingiz!', 'success');
    triggerConfetti();
  } else {
    document.getElementById('result-text').textContent = 'Omad yo\'q!';
    showToast('😞 Bu safar omad kulmadi. Qayta urining!', 'warning');
  }

  // Save to history
  const histEntry = {
    icon: reward.icon,
    label: reward.label,
    time: new Date().toLocaleTimeString(),
  };
  state.rouletteHistory.unshift(histEntry);
  if (state.rouletteHistory.length > 10) state.rouletteHistory.pop();
  save(STORAGE_KEYS.ROULETTE_HISTORY, state.rouletteHistory);
  renderRouletteHistory();
}

function renderRouletteHistory() {
  const list = document.getElementById('roulette-history-list');
  if (!list) return;
  list.innerHTML = '';
  if (!state.rouletteHistory.length) {
    list.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:16px">Hali o\'yin yo\'q</p>';
    return;
  }
  state.rouletteHistory.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <span class="history-item-icon">${entry.icon}</span>
      <div class="history-item-info">
        <div class="history-item-label">${entry.label}</div>
        <div class="history-item-time">${entry.time}</div>
      </div>
    `;
    list.appendChild(div);
  });
}

/* ===================================================
   LEADERBOARD
   =================================================== */
function renderLeaderboard() {
  const podium = document.getElementById('podium-section');
  const list = document.getElementById('leaderboard-list');
  if (!podium || !list) return;

  // Combine default leaderboard with current user (realtime diamonds)
  let lb = DEFAULT_LEADERBOARD.map(item => ({ ...item }));
  if (state.user) {
    const existingIdx = lb.findIndex(u => u.name === state.user.name);
    if (existingIdx !== -1) {
      lb[existingIdx].diamonds = state.user.diamonds;
      lb[existingIdx].orders = state.user.orderCount || 0;
      lb[existingIdx].isMe = true;
    } else {
      lb.push({ name: state.user.name, diamonds: state.user.diamonds, orders: state.user.orderCount || 0, isMe: true });
    }
  }
  lb.sort((a, b) => b.diamonds - a.diamonds);
  lb = lb.slice(0, 10);

  // Podium (top 3)
  podium.innerHTML = '';
  const top3 = lb.slice(0, 3);
  const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd visual order
  podiumOrder.forEach(idx => {
    if (!top3[idx]) return;
    const item = top3[idx];
    const medals = ['🥇', '🥈', '🥉'];
    const div = document.createElement('div');
    div.className = 'podium-item';
    div.innerHTML = `
      <div class="podium-avatar">${item.isMe ? '🧑' : '👤'}</div>
      <div class="podium-name">${item.name.split(' ')[0]}${item.isMe ? ' (Siz)' : ''}</div>
      <div class="podium-diamonds">💎 ${item.diamonds}</div>
      <div class="podium-rank">${medals[idx]}</div>
      <div class="podium-bar"></div>
    `;
    podium.appendChild(div);
  });

  // Rest of list
  list.innerHTML = '';
  lb.slice(3).forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'lb-item';
    div.style.animationDelay = i * 0.05 + 's';
    div.innerHTML = `
      <div class="lb-rank">${i + 4}</div>
      <div class="lb-avatar">${item.isMe ? '🧑' : '👤'}</div>
      <div class="lb-info">
        <div class="lb-name">${item.name}${item.isMe ? ' (Siz)' : ''}</div>
        <div class="lb-orders">${item.orders} buyurtma</div>
      </div>
      <div class="lb-diamonds">💎 ${item.diamonds}</div>
    `;
    list.appendChild(div);
  });
}

/* ===================================================
   PROFILE PAGE
   =================================================== */
function renderProfilePage() {
  if (!state.user) return;
  const u = state.user;

  document.getElementById('profile-name-text').textContent = u.name;
  document.getElementById('profile-phone-text').textContent = u.phone;
  document.getElementById('profile-level-badge').textContent = 'Level ' + u.level;

  document.getElementById('p-diamonds').textContent = u.diamonds;
  document.getElementById('p-cashback').textContent = u.cashback + '%';
  document.getElementById('p-orders').textContent = u.orderCount || 0;
  document.getElementById('p-xp').textContent = u.xp || 0;

  const xpPerLevel = 1000;
  const xpInLevel = (u.xp || 0) % xpPerLevel;
  const xpPct = (xpInLevel / xpPerLevel) * 100;
  document.getElementById('xp-fill').style.width = xpPct + '%';
  document.getElementById('xp-progress-text').textContent = xpInLevel + ' / ' + xpPerLevel;

  // Lang/Theme buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === state.lang);
  });
  document.querySelectorAll('.theme-sw-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.themeSw === state.theme);
  });
}

function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = '';
  const faqs = FAQS[state.lang] || FAQS.uz;
  faqs.forEach(faq => {
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = `
      <div class="faq-question">
        <span>${faq.q}</span>
        <span class="faq-arrow">▼</span>
      </div>
      <div class="faq-answer">
        <div class="faq-answer-inner">${faq.a}</div>
      </div>
    `;
    div.querySelector('.faq-question').addEventListener('click', () => {
      div.classList.toggle('open');
    });
    list.appendChild(div);
  });
}

/* ===================================================
   ADMIN PAGE
   =================================================== */
function renderAdminPage() {
  document.getElementById('astat-foods').textContent = state.foods.length;
  document.getElementById('astat-orders').textContent = state.orders.length;
  document.getElementById('astat-diamonds').textContent = state.totalDiamondsGiven;
  renderAdminFoods();
  renderAdminRewards();
}

function renderAdminFoods() {
  const list = document.getElementById('admin-food-list');
  if (!list) return;
  list.innerHTML = '';
  state.foods.forEach(food => {
    const div = document.createElement('div');
    div.className = 'admin-food-item';
    div.innerHTML = `
      <img class="admin-food-img" src="${food.img}" alt="${food.name}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'" />
      <div class="admin-food-info">
        <div class="admin-food-name">${food.name}</div>
        <div class="admin-food-price">${formatPrice(food.price)}</div>
        <span class="admin-food-cat">${food.category}</span>
      </div>
      <div class="admin-food-actions">
        <button class="btn-edit" data-id="${food.id}">✏️ Edit</button>
        <button class="btn-delete" data-id="${food.id}">🗑️ Del</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function renderAdminRewards() {
  const list = document.getElementById('admin-reward-list');
  if (!list) return;
  list.innerHTML = '';
  state.rewards.forEach(reward => {
    const div = document.createElement('div');
    div.className = 'admin-reward-item';
    div.innerHTML = `
      <div class="reward-swatch" style="background:${reward.color}22;border:2px solid ${reward.color}">${reward.icon}</div>
      <div class="reward-info">
        <div class="reward-label">${reward.label}</div>
        <div class="reward-type">${reward.type}</div>
      </div>
      <div class="reward-value">× ${reward.value}</div>
      <div class="admin-food-actions">
        <button class="btn-edit" data-reward-id="${reward.id}">✏️</button>
        <button class="btn-delete" data-reward-id="${reward.id}">🗑️</button>
      </div>
    `;
    list.appendChild(div);
  });
}

/* ===================================================
   FOOD FORM MODAL
   =================================================== */
function openFoodForm(foodId = null) {
  state.editingFoodId = foodId;
  const title = document.getElementById('food-form-title');
  const overlay = document.getElementById('food-form-overlay');

  if (foodId) {
    const food = state.foods.find(f => f.id === foodId);
    if (!food) return;
    title.textContent = 'Taomni tahrirlash';
    document.getElementById('af-name').value = food.name;
    document.getElementById('af-desc').value = food.desc;
    document.getElementById('af-img').value = food.img;
    document.getElementById('af-price').value = food.price;
    document.getElementById('af-cashback').value = food.cashback;
    document.getElementById('af-diamonds').value = food.diamonds;
    document.getElementById('af-category').value = food.category;
  } else {
    title.textContent = 'Taom qo\'shish';
    document.getElementById('af-name').value = '';
    document.getElementById('af-desc').value = '';
    document.getElementById('af-img').value = '';
    document.getElementById('af-price').value = '';
    document.getElementById('af-cashback').value = '';
    document.getElementById('af-diamonds').value = '';
    document.getElementById('af-category').value = 'fastfood';
  }
  overlay.classList.remove('hidden');
}

function closeFoodForm() {
  document.getElementById('food-form-overlay').classList.add('hidden');
  state.editingFoodId = null;
}

function saveFoodForm() {
  const name = document.getElementById('af-name').value.trim();
  const desc = document.getElementById('af-desc').value.trim();
  const img = document.getElementById('af-img').value.trim();
  const price = parseInt(document.getElementById('af-price').value) || 0;
  const cashback = parseInt(document.getElementById('af-cashback').value) || 0;
  const diamonds = parseInt(document.getElementById('af-diamonds').value) || 0;
  const category = document.getElementById('af-category').value;

  if (!name) { showToast('Taom nomini kiriting!', 'error'); return; }
  if (!price) { showToast('Narxni kiriting!', 'error'); return; }

  if (state.editingFoodId) {
    const idx = state.foods.findIndex(f => f.id === state.editingFoodId);
    if (idx !== -1) {
      state.foods[idx] = { ...state.foods[idx], name, desc, img, price, cashback, diamonds, category };
    }
  } else {
    state.foods.push({
      id: 'f' + Date.now(),
      name, desc, img: img || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
      price, cashback, diamonds, category,
    });
  }

  save(STORAGE_KEYS.FOODS, state.foods);
  closeFoodForm();
  renderFoods();
  renderAdminFoods();
  document.getElementById('astat-foods').textContent = state.foods.length;
  showToast(state.editingFoodId ? '✅ Taom yangilandi!' : '✅ Taom qo\'shildi!', 'success');
}

function deleteFood(id) {
  state.foods = state.foods.filter(f => f.id !== id);
  save(STORAGE_KEYS.FOODS, state.foods);
  renderFoods();
  renderAdminFoods();
  document.getElementById('astat-foods').textContent = state.foods.length;
  showToast('🗑️ Taom o\'chirildi', 'warning');
}

/* ===================================================
   REWARD FORM MODAL
   =================================================== */
function openRewardForm(rewardId = null) {
  state.editingRewardId = rewardId;
  const title = document.getElementById('reward-form-title');
  const overlay = document.getElementById('reward-form-overlay');

  if (rewardId) {
    const reward = state.rewards.find(r => r.id === rewardId);
    if (!reward) return;
    title.textContent = 'Sovrinni tahrirlash';
    document.getElementById('ar-label').value = reward.label;
    document.getElementById('ar-icon').value = reward.icon;
    document.getElementById('ar-color').value = reward.color;
    document.getElementById('ar-type').value = reward.type;
    document.getElementById('ar-value').value = reward.value;
  } else {
    title.textContent = 'Sovrin qo\'shish';
    ['ar-label','ar-icon','ar-color','ar-value'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('ar-type').value = 'diamonds';
  }
  overlay.classList.remove('hidden');
}

function closeRewardForm() {
  document.getElementById('reward-form-overlay').classList.add('hidden');
  state.editingRewardId = null;
}

function saveRewardForm() {
  const label = document.getElementById('ar-label').value.trim();
  const icon = document.getElementById('ar-icon').value.trim() || '⭐';
  const color = document.getElementById('ar-color').value.trim() || '#00ff88';
  const type = document.getElementById('ar-type').value;
  const value = parseInt(document.getElementById('ar-value').value) || 0;

  if (!label) { showToast('Sovrin nomini kiriting!', 'error'); return; }

  if (state.editingRewardId) {
    const idx = state.rewards.findIndex(r => r.id === state.editingRewardId);
    if (idx !== -1) state.rewards[idx] = { ...state.rewards[idx], label, icon, color, type, value };
  } else {
    state.rewards.push({ id: 'r' + Date.now(), label, icon, color, type, value });
  }

  save(STORAGE_KEYS.ROULETTE_REWARDS, state.rewards);
  closeRewardForm();
  renderAdminRewards();
  renderRoulette();
  showToast('✅ Sovrin saqlandi!', 'success');
}

function deleteReward(id) {
  if (state.rewards.length <= 2) { showToast('Kamida 2 sovrin bo\'lishi kerak!', 'error'); return; }
  state.rewards = state.rewards.filter(r => r.id !== id);
  save(STORAGE_KEYS.ROULETTE_REWARDS, state.rewards);
  renderAdminRewards();
  renderRoulette();
  showToast('🗑️ Sovrin o\'chirildi', 'warning');
}

/* ===================================================
   THEME
   =================================================== */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  state.theme = theme;
  save(STORAGE_KEYS.THEME, theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';

  document.querySelectorAll('.theme-sw-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.themeSw === theme);
  });
  document.querySelectorAll('[data-theme-sw]').forEach(b => {
    b.classList.toggle('active', b.dataset.themeSw === theme);
  });
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

/* ===================================================
   LANG
   =================================================== */
function setLang(lang) {
  state.lang = lang;
  save(STORAGE_KEYS.LANG, lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  updateGreeting();
  renderFAQ();
  updateUITexts(lang);
  showToast(lang === 'uz' ? 'Til: O\'zbekcha ✅' : 'Язык: Русский ✅', 'success');
}

/* ===================================================
   UI TEXTS (i18n patch)
   =================================================== */
const UI_TEXTS = {
  uz: {
    'greeting-label':    'Nima yeymiz bugun?',
    'daily-bonus-label': 'Kunlik bonus',
    'btn-daily-bonus':   '🎁 Olish',
    'nav-home':          'Bosh sahifa',
    'nav-roulette':      'Ruletka',
    'nav-leaderboard':   'Reyting',
    'nav-profile':       'Profil',
    'search-placeholder':'Taom qidiring...',
    'cart-title':        '🛒 Savat',
    'btn-checkout':      '✅ Buyurtma berish',
    'cart-diamond-label':'💎 Diamonds',
    'cart-cashback-label':'💰 Cashback',
    'spin-cost-label':   '1 💎 = 1 aylanish',
    'btn-spin':          '🎰 Aylantirish',
    'lb-title':          '🏆 Reyting',
    'profile-title':     '👤 Profil',
    'faq-title':         '❓ Savollar',
    'btn-logout':        '🚪 Chiqish',
    'admin-title':       '⚙️ Admin',
  },
  ru: {
    'greeting-label':    'Что будем есть сегодня?',
    'daily-bonus-label': 'Ежедневный бонус',
    'btn-daily-bonus':   '🎁 Получить',
    'nav-home':          'Главная',
    'nav-roulette':      'Рулетка',
    'nav-leaderboard':   'Рейтинг',
    'nav-profile':       'Профиль',
    'search-placeholder':'Поиск блюд...',
    'cart-title':        '🛒 Корзина',
    'btn-checkout':      '✅ Оформить заказ',
    'cart-diamond-label':'💎 Алмазы',
    'cart-cashback-label':'💰 Кэшбэк',
    'spin-cost-label':   '1 💎 = 1 вращение',
    'btn-spin':          '🎰 Крутить',
    'lb-title':          '🏆 Рейтинг',
    'profile-title':     '👤 Профиль',
    'faq-title':         '❓ Вопросы',
    'btn-logout':        '🚪 Выйти',
    'admin-title':       '⚙️ Админ',
  },
};

function updateUITexts(lang) {
  const texts = UI_TEXTS[lang] || UI_TEXTS.uz;
  Object.entries(texts).forEach(([key, value]) => {
    // By ID
    const el = document.getElementById(key);
    if (el) {
      if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
        el.placeholder = value;
      } else if (el.tagName === 'BUTTON') {
        el.textContent = value;
      } else {
        el.textContent = value;
      }
    }
    // By data-i18n attribute
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach(node => {
      if (node.tagName === 'INPUT') node.placeholder = value;
      else node.textContent = value;
    });
  });

  // search input placeholder by id
  const si = document.getElementById('search-input');
  if (si) si.placeholder = texts['search-placeholder'] || '';
}

/* ===================================================
   TOAST
   =================================================== */
function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toast-container');
  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '✅'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ===================================================
   CONFETTI
   =================================================== */
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.remove('hidden');

  const ctx = canvas.getContext('2d');
  const pieces = [];
  const colors = ['#00ff88', '#00cc6a', '#ffaa00', '#ff6b6b', '#54a0ff', '#ff9f43', '#fff'];

  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -10,
      w: 6 + Math.random() * 10,
      h: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 6,
      vy: 3 + Math.random() * 5,
      angle: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.2,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.va;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 100) requestAnimationFrame(draw);
    else canvas.classList.add('hidden');
  }
  requestAnimationFrame(draw);
}

/* ===================================================
   UTILITIES
   =================================================== */
function formatPrice(p) {
  return new Intl.NumberFormat('uz-UZ').format(p) + ' so\'m';
}

/* ===================================================
   EVENT LISTENERS
   =================================================== */
function bindEvents() {
  // Nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });

  // Theme toggle (topbar)
  document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);

  // Cart
  document.getElementById('btn-cart-open')?.addEventListener('click', openCartDrawer);
  document.getElementById('btn-cart-close')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCartDrawer);
  document.getElementById('btn-checkout')?.addEventListener('click', checkout);

  // Cart item controls (delegation)
  document.getElementById('cart-items')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'add') addToCart(id);
    else removeFromCart(id);
  });

  // Food modal close
  document.getElementById('food-modal-close')?.addEventListener('click', closeFoodModal);
  document.getElementById('food-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('food-modal-overlay')) closeFoodModal();
  });

  // Food form modal
  document.getElementById('btn-add-food')?.addEventListener('click', () => openFoodForm());
  document.getElementById('food-form-close')?.addEventListener('click', closeFoodForm);
  document.getElementById('btn-save-food')?.addEventListener('click', saveFoodForm);
  document.getElementById('food-form-overlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('food-form-overlay')) closeFoodForm();
  });

  // Reward form modal
  document.getElementById('btn-add-reward')?.addEventListener('click', () => openRewardForm());
  document.getElementById('reward-form-close')?.addEventListener('click', closeRewardForm);
  document.getElementById('btn-save-reward')?.addEventListener('click', saveRewardForm);
  document.getElementById('reward-form-overlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('reward-form-overlay')) closeRewardForm();
  });

  // Admin food/reward actions (delegation)
  document.getElementById('admin-food-list')?.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit[data-id]');
    const delBtn = e.target.closest('.btn-delete[data-id]');
    if (editBtn) openFoodForm(editBtn.dataset.id);
    if (delBtn) deleteFood(delBtn.dataset.id);
  });
  document.getElementById('admin-reward-list')?.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit[data-reward-id]');
    const delBtn = e.target.closest('.btn-delete[data-reward-id]');
    if (editBtn) openRewardForm(editBtn.dataset.rewardId);
    if (delBtn) deleteReward(delBtn.dataset.rewardId);
  });

  // Admin tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('admin-foods-panel').classList.toggle('hidden', tab.dataset.atab !== 'foods');
      document.getElementById('admin-roulette-panel').classList.toggle('hidden', tab.dataset.atab !== 'roulette');
    });
  });

  // Categories
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.cat;
      renderFoods();
    });
  });

  // Search
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  searchInput?.addEventListener('input', () => {
    state.searchQuery = searchInput.value;
    searchClear.classList.toggle('hidden', !state.searchQuery);
    renderFoods();
  });
  searchClear?.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    searchClear.classList.add('hidden');
    renderFoods();
  });

  // Daily bonus
  document.getElementById('btn-daily-bonus')?.addEventListener('click', claimDailyBonus);

  // Spin
  document.getElementById('btn-spin')?.addEventListener('click', spinWheel);

  // Leaderboard tabs
  document.querySelectorAll('.lb-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderLeaderboard();
    });
  });

  // Profile lang/theme
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  document.querySelectorAll('.theme-sw-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeSw));
  });

  // Logout
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    if (confirm('Haqiqatan ham chiqmoqchimisiz?')) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.CART);
      location.reload();
    }
  });

  // Register form
  initRegister();

  // Home avatar => profile
  document.getElementById('home-avatar')?.addEventListener('click', () => navigateTo('profile'));

  // Roulette result close on click
  document.getElementById('roulette-result')?.addEventListener('click', () => {
    document.getElementById('roulette-result').classList.add('hidden');
  });
}

/* ===================================================
   BOOT
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  initApp();
});
