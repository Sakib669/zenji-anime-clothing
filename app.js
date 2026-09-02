/**
 * ZENJI CYBER-VOGUE // TACTICAL INTERACTIVE ENGINE
 * Core transition animations, video timestamp controllers, and audio synthesis
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initAudioSystem();
  initCustomCursor();
  initHeroMediaController();
  initScrollTransitions();
  initCard3DTilt();
  initCarouselControls();
  initCategoryFilters();
  initModalsAndDrawers();
  initTelemetryClock();
});

/* ==========================================================================
   1. SPLASH SCREEN TRANSITION
   ========================================================================== */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('nosplash') === 'true' || urlParams.get('nosplash') === '1') {
    splash.style.display = 'none';
    document.querySelectorAll('.hero-reveal, .reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale').forEach(el => el.classList.add('is-revealed'));
    
    const scrollY = urlParams.get('scroll');
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
    }
    const sec = urlParams.get('section');
    if (sec) {
      const target = document.getElementById(sec);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo(0, top);
      }
    }
    if (urlParams.get('cart') === '1') {
      setTimeout(() => {
        const cartDrawer = document.getElementById('cart-drawer');
        const cartBackdrop = document.getElementById('cart-backdrop');
        if (cartDrawer && cartBackdrop) {
          cartDrawer.classList.add('open');
          cartBackdrop.classList.remove('hidden', 'opacity-0');
        }
      }, 80);
    }
    if (urlParams.get('inspect') === '1') {
      setTimeout(() => {
        const firstInspect = document.querySelector('.btn-inspect');
        if (firstInspect) firstInspect.click();
      }, 80);
    }
    return;
  }

  // Cinematic terminal decipher effect
  const statusEl = document.getElementById('splash-status');
  const messages = [
    'ESTABLISHING SECURE COMM LINK...',
    'SYNCING NEURAL INTERFACE...',
    'INITIALIZING ZENJI // CYBER-VOGUE PROTOCOL...',
    'SYSTEM READY.'
  ];
  let msgIndex = 0;

  const interval = setInterval(() => {
    msgIndex++;
    if (statusEl && msgIndex < messages.length) {
      statusEl.textContent = messages[msgIndex];
    }
  }, 350);

  setTimeout(() => {
    clearInterval(interval);
    splash.style.opacity = '0';
    splash.style.pointerEvents = 'none';
    setTimeout(() => {
      splash.style.display = 'none';
      // Trigger hero entrance reveals
      document.querySelectorAll('.hero-reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-revealed'), i * 150);
      });
    }, 700);
  }, 1600);
}

/* ==========================================================================
   2. WEB AUDIO API SYNTHESIZER (CYBER SOUND FX)
   Zero external asset dependencies; lightweight browser oscillator
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudioSystem() {
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundBars = document.querySelectorAll('.sound-bar');

  function updateSoundUI(enabled) {
    soundBars.forEach(b => {
      if (enabled) {
        b.classList.add('sound-bar-active');
      } else {
        b.classList.remove('sound-bar-active');
      }
    });
    const label = document.getElementById('sound-toggle-label');
    if (label) label.textContent = enabled ? 'AUDIO: [ON]' : 'AUDIO: [MUTED]';
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      soundEnabled = !soundEnabled;
      updateSoundUI(soundEnabled);
      if (soundEnabled) {
        playCyberSound('beep-high');
      }
    });
  }
}

function playCyberSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'beep-high') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1760, now + 0.06);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'glitch') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'whoosh') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    }
  } catch (e) {
    // Graceful fallback if user hasn't interacted
  }
}

/* ==========================================================================
   3. HERO MEDIA CONTROLLER: VIDEO & ANIME GIF WITH TIMESTAMPS
   ========================================================================== */
function initHeroMediaController() {
  const videoEl = document.getElementById('hero-video');
  const gifEl = document.getElementById('hero-gif');
  const flashOverlay = document.getElementById('glitch-flash');
  const cameraTag = document.getElementById('hud-camera-tag');
  const timecodeTag = document.getElementById('hud-timecode-tag');
  const feedModeBtn = document.getElementById('toggle-feed-mode');
  const timestampPills = document.querySelectorAll('.timestamp-pill');

  // Media feeds definition: Models wearing anime clothes
  const feeds = [
    {
      id: 0,
      timestamp: '00:00:00',
      label: 'ANIME HOODIE SPECIMEN',
      type: 'gif',
      src: 'assets/hero_anime_hoodie1.gif',
      cam: 'CAM_01 // MODEL OVERSIZED ANIME HOODIE',
      tag: 'ANIME HOODIE SPECIMEN'
    },
    {
      id: 1,
      timestamp: '00:04:15',
      label: 'CYBER HOODIE CINEMATIC',
      type: 'video',
      src: 'assets/hero_anime_hoodie1.mp4',
      cam: 'CAM_02 // 60FPS ANIME HOODIE CINEMATIC',
      tag: '60FPS MP4 STREAM'
    },
    {
      id: 2,
      timestamp: '00:08:30',
      label: 'ANIME JACKET RIG',
      type: 'gif',
      src: 'assets/hero_anime_jacket.gif',
      cam: 'CAM_03 // TACTICAL ANIME JACKET RIG',
      tag: 'ANIME JACKET SPECIMEN'
    },
    {
      id: 3,
      timestamp: '00:12:45',
      label: 'CYBER GIRL HOODIE',
      type: 'gif',
      src: 'assets/hero_anime_hoodie2.gif',
      cam: 'CAM_04 // CYBER GIRL OVERSIZED HOODIE',
      tag: 'ANIME HOODIE OVERLOOK'
    },
    {
      id: 4,
      timestamp: '00:16:00',
      label: 'CREW TECHWEAR JACKETS',
      type: 'gif',
      src: 'assets/edgerunners_crew.gif',
      cam: 'CAM_05 // CREW TECHWEAR JACKETS',
      tag: 'TACTICAL CREW RIG'
    }
  ];

  let currentFeedIndex = 0;

  function switchFeed(index, isUserInteraction = false) {
    const target = feeds[index];
    if (!target) return;
    currentFeedIndex = index;

    // Trigger visual glitch burst transition only on user action
    if (isUserInteraction && flashOverlay) {
      flashOverlay.classList.remove('glitch-flash-active');
      void flashOverlay.offsetWidth; // Trigger reflow
      flashOverlay.classList.add('glitch-flash-active');
      playCyberSound('glitch');
    }

    // Update Pills
    timestampPills.forEach((p, idx) => {
      if (idx === index) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    // Update HUD metadata
    if (cameraTag) cameraTag.textContent = target.cam;
    if (timecodeTag) timecodeTag.textContent = `TIMESTAMP: ${target.timestamp}`;

    // Switch between video element or anime gif element
    if (target.type === 'video') {
      if (gifEl) {
        gifEl.style.opacity = '0';
        gifEl.style.display = 'none';
      }
      if (videoEl) {
        videoEl.style.display = 'block';
        videoEl.style.opacity = '0.75';
        videoEl.src = target.src;
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
      }
    } else {
      if (videoEl) {
        videoEl.pause();
        videoEl.style.opacity = '0';
        videoEl.style.display = 'none';
      }
      if (gifEl) {
        gifEl.style.display = 'block';
        gifEl.src = target.src;
        gifEl.style.opacity = '0.85';
      }
    }
  }

  // Bind click to timestamp buttons
  timestampPills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      switchFeed(idx, true);
    });
  });

  // Toggle Feed Mode button
  if (feedModeBtn) {
    feedModeBtn.addEventListener('click', () => {
      // Toggle between Video (1) and current anime gif
      const nextIndex = currentFeedIndex === 1 ? 0 : 1;
      switchFeed(nextIndex, true);
    });
  }

  // Initialize default feed (Feed 0: Anime GIF) without flash
  switchFeed(0, false);
}

/* ==========================================================================
   4. TRANSITION-BASED SCROLL REVEALS (Intersection Observer + Scroll Fallback)
   ========================================================================== */
function initScrollTransitions() {
  const revealElements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale'
  );

  function checkReveals() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 200 && rect.bottom > -100) {
        el.classList.add('is-revealed');
      }
    });
  }

  // Check immediately
  checkReveals();
  window.addEventListener('scroll', checkReveals, { passive: true });

  const observerOptions = {
    root: null,
    rootMargin: '150px 0px 100px 0px',
    threshold: 0.01
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Expose checkReveals globally for instant synchronization
  window.__zenjiCheckReveals = checkReveals;

  // Navbar dynamic scroll transition
  const mainNav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (!mainNav) return;
    if (window.scrollY > 40) {
      mainNav.classList.add('bg-obsidian-black/95', 'py-3', 'shadow-2xl', 'border-lacquer-crimson/40');
      mainNav.classList.remove('bg-transparent', 'py-4', 'border-outline-variant');
    } else {
      mainNav.classList.remove('bg-obsidian-black/95', 'py-3', 'shadow-2xl', 'border-lacquer-crimson/40');
      mainNav.classList.add('bg-transparent', 'py-4', 'border-outline-variant');
    }
  }, { passive: true });
}

/* ==========================================================================
   5. 3D CARD PERSPECTIVE TILT PHYSICS
   ========================================================================== */
function initCard3DTilt() {
  const tiltWrappers = document.querySelectorAll('.card-tilt-wrap');

  tiltWrappers.forEach(wrap => {
    const card = wrap.querySelector('.card-tilt-inner') || wrap;

    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max rotation ±7 degrees for subtle high-tech feel
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    wrap.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   6. CUSTOM CYBER CROSSHAIR CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Lerp smoothing loop for cursor ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover detection for interactive elements
  const hoverables = document.querySelectorAll('button, a, input, .cursor-hoverable, .timestamp-pill, .product-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      playCyberSound('click');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* ==========================================================================
   7. HORIZONTAL CAROUSEL SNAP SCROLL
   ========================================================================== */
function initCarouselControls() {
  const carousel = document.getElementById('deployment-carousel');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');

  if (!carousel || !btnPrev || !btnNext) return;

  btnPrev.addEventListener('click', () => {
    carousel.scrollBy({ left: -380, behavior: 'smooth' });
    playCyberSound('whoosh');
  });

  btnNext.addEventListener('click', () => {
    carousel.scrollBy({ left: 380, behavior: 'smooth' });
    playCyberSound('whoosh');
  });
}

/* ==========================================================================
   8. CATEGORY FILTER TABS
   ========================================================================== */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const products = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playCyberSound('click');
      filterBtns.forEach(b => b.classList.remove('bg-lacquer-crimson', 'text-stark-white', 'border-lacquer-crimson'));
      filterBtns.forEach(b => b.classList.add('border-outline-variant', 'text-secondary'));

      btn.classList.add('bg-lacquer-crimson', 'text-stark-white', 'border-lacquer-crimson');
      btn.classList.remove('border-outline-variant', 'text-secondary');

      const cat = btn.getAttribute('data-category');

      products.forEach(prod => {
        const prodCat = prod.getAttribute('data-category');
        if (cat === 'all' || prodCat === cat) {
          prod.style.display = 'block';
          setTimeout(() => {
            prod.style.opacity = '1';
            prod.style.transform = 'scale(1)';
          }, 50);
        } else {
          prod.style.opacity = '0';
          prod.style.transform = 'scale(0.95)';
          setTimeout(() => {
            prod.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   9. MODALS, INSPECT SPECIMEN, AND CART DRAWER
   ========================================================================== */
function initModalsAndDrawers() {
  const inspectModal = document.getElementById('inspect-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-product-img');
  const modalTitle = document.getElementById('modal-product-title');
  const modalPrice = document.getElementById('modal-product-price');
  const modalDesc = document.getElementById('modal-product-desc');
  const modalAddCart = document.getElementById('modal-add-cart');

  // Cart elements
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsContainer = document.getElementById('cart-items-list');
  const cartCountBadges = document.querySelectorAll('.cart-count-badge');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  let cart = [
    { id: 'CYBER-HOODIE', name: 'CYBER-GEISHA // OVERSIZED HOODIE', price: 24000, size: 'L', qty: 1 }
  ];

  function renderCart() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-16 text-tertiary font-label-technical">
          <span class="material-symbols-outlined text-4xl block mb-2 opacity-50">shopping_bag</span>
          RIG EMPTY // ZERO SPECIMENS ATTACHED
        </div>
      `;
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;

        const row = document.createElement('div');
        row.className = 'flex justify-between items-center p-4 bg-surface-panel border border-border-muted transition-all hover:border-lacquer-crimson';
        row.innerHTML = `
          <div>
            <div class="font-headline-md text-stark-white text-sm">${item.name}</div>
            <div class="font-label-technical text-xs text-tertiary mt-1">SIZE: ${item.size} // QTY: ${item.qty}</div>
            <div class="font-headline-md text-lacquer-crimson text-sm mt-1">¥ ${(item.price * item.qty).toLocaleString()}</div>
          </div>
          <button data-index="${index}" class="remove-cart-item text-tertiary hover:text-lacquer-crimson p-2 transition-colors">
            <span class="material-symbols-outlined text-sm">delete</span>
          </button>
        `;
        cartItemsContainer.appendChild(row);
      });
    }

    cartCountBadges.forEach(b => {
      b.textContent = count;
      b.classList.add('scale-125');
      setTimeout(() => b.classList.remove('scale-125'), 300);
    });

    if (cartTotalAmount) {
      cartTotalAmount.textContent = `¥ ${total.toLocaleString()}`;
    }

    // Attach delete handlers
    document.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        cart.splice(idx, 1);
        playCyberSound('click');
        renderCart();
      });
    });
  }

  // Open / Close Cart Drawer
  function openCart() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add('open');
      cartBackdrop.classList.remove('hidden');
      setTimeout(() => cartBackdrop.classList.add('opacity-100'), 10);
      playCyberSound('whoosh');
    }
  }

  function closeCart() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('open');
      cartBackdrop.classList.remove('opacity-100');
      setTimeout(() => cartBackdrop.classList.add('hidden'), 350);
      playCyberSound('click');
    }
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', openCart));
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  // Inspect Modal logic
  let activeInspectItem = null;

  document.querySelectorAll('.btn-inspect').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playCyberSound('beep-high');

      const title = btn.getAttribute('data-title') || 'TACTICAL PIECE';
      const price = btn.getAttribute('data-price') || '¥ 25,000';
      const priceNum = parseInt(btn.getAttribute('data-price-num') || '25000', 10);
      const image = btn.getAttribute('data-img') || '';
      const desc = btn.getAttribute('data-desc') || 'High-density composite textile constructed for urban combat mobility.';

      activeInspectItem = { title, price, priceNum, image, desc, size: 'M' };

      if (modalTitle) modalTitle.textContent = title;
      if (modalPrice) modalPrice.textContent = price;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalImg) modalImg.style.backgroundImage = `url('${image}')`;

      if (inspectModal) {
        inspectModal.classList.add('open');
      }
    });
  });

  // Size buttons in modal
  document.querySelectorAll('.size-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('bg-lacquer-crimson', 'text-stark-white'));
      pill.classList.add('bg-lacquer-crimson', 'text-stark-white');
      if (activeInspectItem) {
        activeInspectItem.size = pill.textContent.trim();
      }
      playCyberSound('click');
    });
  });

  // Modal Add to Cart
  if (modalAddCart) {
    modalAddCart.addEventListener('click', () => {
      if (!activeInspectItem) return;
      playCyberSound('beep-high');

      cart.push({
        id: activeInspectItem.title,
        name: activeInspectItem.title,
        price: activeInspectItem.priceNum,
        size: activeInspectItem.size,
        qty: 1
      });

      renderCart();

      // Close modal and open cart drawer
      if (inspectModal) inspectModal.classList.remove('open');
      setTimeout(openCart, 300);
    });
  }

  // Close Modal
  if (modalCloseBtn && inspectModal) {
    modalCloseBtn.addEventListener('click', () => {
      inspectModal.classList.remove('open');
      playCyberSound('click');
    });
  }

  // Close on backdrop click
  if (inspectModal) {
    inspectModal.addEventListener('click', (e) => {
      if (e.target === inspectModal) {
        inspectModal.classList.remove('open');
      }
    });
  }

  renderCart();
}

/* ==========================================================================
   10. REAL-TIME HUD TELEMETRY CLOCK
   ========================================================================== */
function initTelemetryClock() {
  const clockEl = document.getElementById('hud-live-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
    clockEl.textContent = `SYS// ${h}:${m}:${s}:${ms} [ONLINE]`;
    requestAnimationFrame(updateClock);
  }
  requestAnimationFrame(updateClock);
}
