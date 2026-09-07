/**
 * ============================================================================
 * NIKUNJ SINGH - OPTIMIZED JAVASCRIPT ENGINE (60-120 FPS HIGH PERFORMANCE)
 * Core interactions, particle canvas, scroll animations, typewriter & navigation
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initParticleCanvas();
  initScrollEffects();
  initNavigation();
  initTypewriter();
  initAnimatedCounters();
  initScrollReveal();
  highlightActiveNavLink();
});

/* ----------------------------------------------------------------------------
 * 0. UNIVERSAL THEME SYSTEM (DARK/LIGHT PERSISTENCE ACROSS ALL PAGES)
 * ---------------------------------------------------------------------------- */
const THEME_STORAGE_KEY = 'portfolio-theme';

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function applyTheme(theme, save = true) {
  const mode = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', mode);

  if (save) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (err) {
      console.warn('Theme storage failed:', err);
    }
  }

  // Update all theme toggle buttons (desktop & mobile)
  const buttons = document.querySelectorAll('.theme-toggle-btn');
  buttons.forEach(btn => {
    const isDark = mode === 'dark';
    const nextDesc = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    btn.setAttribute('aria-label', nextDesc);
    btn.setAttribute('title', nextDesc);
  });

  const mobileLabels = document.querySelectorAll('.mobile-theme-text');
  mobileLabels.forEach(lbl => {
    lbl.textContent = mode === 'dark' ? 'Dark Theme' : 'Light Theme';
  });
}

function initThemeSystem() {
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme, false);

  // Bind click event on all theme buttons on the current page
  const buttons = document.querySelectorAll('.theme-toggle-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(targetTheme, true);
    });
  });

  // Cross-tab/window synchronization
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_STORAGE_KEY && e.newValue) {
      applyTheme(e.newValue, false);
    }
  });
}

/* ----------------------------------------------------------------------------
 * 1. HIGH-PERFORMANCE GPU-FRIENDLY PARTICLE CANVAS BACKGROUND
 * ---------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Optimize pixel ratio for high-DPI displays without GPU exhaustion
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let width = 0;
  let height = 0;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();

  // Optimized particle counts: ~40 on desktop, ~18 on mobile
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile 
    ? Math.min(Math.floor(width / 35), 20) 
    : Math.min(Math.floor(width / 32), 42);

  const maxDistance = isMobile ? 100 : 130;
  const maxDistSq = maxDistance * maxDistance;

  // Mouse & Scroll State Tracking
  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  let isPageVisible = true;
  let animationFrameId = null;
  let scrollVelocity = 0;
  let targetScrollVelocity = 0;
  let lastScrollY = window.scrollY || window.pageYOffset || 0;

  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
    }, 150);
  }, { passive: true });

  // Passive mouse tracking with throttling
  let mouseMoveTimeout;
  window.addEventListener('mousemove', (e) => {
    if (!mouseMoveTimeout) {
      mouseMoveTimeout = requestAnimationFrame(() => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouseMoveTimeout = null;
      });
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  // Smooth scroll inertia tracking
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    const delta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;
    targetScrollVelocity = Math.max(Math.min(delta * 0.35, 12), -12);
  }, { passive: true });

  // Pause rendering when tab is in background to save 100% CPU/GPU
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible && !animationFrameId) {
      lastFrameTime = performance.now();
      animate(lastFrameTime);
    }
  });

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (targetScrollVelocity > 0 ? height + 15 : -15);
      this.baseVx = (Math.random() - 0.5) * 0.45;
      this.baseVy = (Math.random() - 0.5) * 0.45;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      this.depth = Math.random() * 0.7 + 0.3; // 0.3 to 1.0 for parallax
      this.radius = (Math.random() * 2.0 + 1.5) * this.depth;
      this.isCyan = Math.random() > 0.45;
      this.baseAlpha = (Math.random() * 0.35 + 0.35) * this.depth;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseAngle = Math.random() * Math.PI * 2;
    }

    update(scrollForce) {
      this.pulseAngle += this.pulseSpeed;

      // Parallax scroll effect
      const scrollDrift = -scrollForce * this.depth * 0.6;
      this.y += this.vy + scrollDrift;
      this.x += this.vx + Math.sin(this.pulseAngle) * 0.25;

      // Wrap around canvas edges
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -25) {
        this.y = height + 20;
        this.x = Math.random() * width;
      }
      if (this.y > height + 25) {
        this.y = -20;
        this.x = Math.random() * width;
      }

      // Mouse proximity repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouse.radius * mouse.radius) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          const fx = (dx / (dist || 1)) * force * 1.8;
          const fy = (dy / (dist || 1)) * force * 1.8;
          this.x -= fx;
          this.y -= fy;
        }
      }
    }

    draw(scrollEnergy, isDark) {
      if (isDark) {
        const alpha = Math.min(this.baseAlpha + scrollEnergy * 0.12, 0.85);
        const colorStr = this.isCyan 
          ? `rgba(56, 189, 248, ${alpha})` 
          : `rgba(192, 132, 252, ${alpha})`;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colorStr;
        ctx.fill();
      } else {
        // High visibility in Light Mode
        const alpha = Math.min(this.baseAlpha * 1.5 + 0.18 + scrollEnergy * 0.15, 0.95);
        const colorStr = this.isCyan 
          ? `rgba(29, 78, 216, ${alpha})` 
          : `rgba(109, 40, 217, ${alpha})`;

        // Ambient halo
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = this.isCyan ? `rgba(37, 99, 235, 0.15)` : `rgba(124, 58, 237, 0.15)`;
        ctx.fill();

        // Core particle dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.25, 0, Math.PI * 2);
        ctx.fillStyle = colorStr;
        ctx.fill();
      }
    }
  }

  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let lastFrameTime = performance.now();

  function animate(currentTime) {
    if (!isPageVisible) {
      animationFrameId = null;
      return;
    }

    // Smoothly decay scroll velocity
    scrollVelocity += (targetScrollVelocity - scrollVelocity) * 0.1;
    targetScrollVelocity *= 0.85;

    const scrollEnergy = Math.min(Math.abs(scrollVelocity) / 5, 1);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update(scrollVelocity);
      p1.draw(scrollEnergy, isDark);

      // Interactive connection to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = mouse.x - p1.x;
        const mdy = mouse.y - p1.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < mouse.radius * mouse.radius) {
          const mDist = Math.sqrt(mDistSq);
          const mAlpha = (1 - mDist / mouse.radius) * (isDark ? 0.45 : 0.55);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark 
            ? `rgba(56, 189, 248, ${mAlpha.toFixed(3)})` 
            : `rgba(29, 78, 216, ${mAlpha.toFixed(3)})`;
          ctx.lineWidth = isDark ? 1.0 : 1.4;
          ctx.stroke();
        }
      }

      // Pairwise connection with squared-distance early rejection
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          if (isDark) {
            const alpha = (1 - dist / maxDistance) * (0.22 + scrollEnergy * 0.14);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          } else {
            // Crisp, bold, high-contrast lines in Light Mode
            const alpha = (1 - dist / maxDistance) * (0.38 + scrollEnergy * 0.22);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.isCyan 
              ? `rgba(37, 99, 235, ${alpha.toFixed(3)})` 
              : `rgba(124, 58, 237, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.35;
            ctx.stroke();
          }
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate(performance.now());
}

/* ----------------------------------------------------------------------------
 * 2. OPTIMIZED RAF-THROTTLED SCROLL PROGRESS & NAVBAR BEHAVIOR
 * ---------------------------------------------------------------------------- */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');

  let isTicking = false;
  let cachedTotalHeight = 0;

  function updateDimensions() {
    cachedTotalHeight = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
  }

  updateDimensions();
  window.addEventListener('resize', updateDimensions, { passive: true });

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        
        // Update top progress bar
        if (progressBar && cachedTotalHeight > 0) {
          const progress = Math.min(Math.max((scrollY / cachedTotalHeight) * 100, 0), 100);
          progressBar.style.width = `${progress}%`;
        }

        // Toggle navbar scrolled style
        if (navbar) {
          if (scrollY > 30) {
            if (!navbar.classList.contains('scrolled')) {
              navbar.classList.add('scrolled');
            }
          } else {
            if (navbar.classList.contains('scrolled')) {
              navbar.classList.remove('scrolled');
            }
          }
        }

        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });
}

/* ----------------------------------------------------------------------------
 * 3. NAVIGATION & MOBILE DRAWER
 * ---------------------------------------------------------------------------- */
function initNavigation() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    drawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.innerHTML = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function highlightActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ----------------------------------------------------------------------------
 * 4. TYPEWRITER EFFECT
 * ---------------------------------------------------------------------------- */
function initTypewriter() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const phrases = [
    'IoT & Embedded Systems Engineer',
    'B.Tech CSE (AI & ML) @ LPU',
    'Python & Relational DBMS Developer',
    'NCC Cadet & Military Camp Veteran',
    'AIESEC Member & Outreach Coordinator',
    'Tech Innovator & Problem Solver'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 350;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ----------------------------------------------------------------------------
 * 5. HIGH-PERFORMANCE BIDIRECTIONAL SCROLL REVEAL (SCROLL UP & DOWN)
 * ---------------------------------------------------------------------------- */
function initScrollReveal() {
  window.initScrollReveal = initScrollReveal;
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (entry.isIntersecting) {
          el.classList.remove('out-top', 'out-bottom');
          el.classList.add('active');
        } else {
          el.classList.remove('active');
          if (rect.top < 0) {
            el.classList.add('out-top');
            el.classList.remove('out-bottom');
          } else if (rect.bottom > windowHeight) {
            el.classList.add('out-bottom');
            el.classList.remove('out-top');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '10px 0px -25px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ----------------------------------------------------------------------------
 * 6. ANIMATED NUMBER COUNTERS (RE-TRIGGERS SMOOTHLY ON SCROLL)
 * ---------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          const target = parseFloat(el.getAttribute('data-counter'));
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
          
          animateValue(el, 0, target, 1200, suffix, decimals);
        } else {
          const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
          const suffix = el.getAttribute('data-suffix') || '';
          el.textContent = (0).toFixed(decimals) + suffix;
          if (el._counterRaf) {
            cancelAnimationFrame(el._counterRaf);
            el._counterRaf = null;
          }
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach(el => observer.observe(el));
  } else {
    counterElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
      el.textContent = target.toFixed(decimals) + suffix;
    });
  }
}

function animateValue(obj, start, end, duration, suffix, decimals) {
  if (obj._counterRaf) {
    cancelAnimationFrame(obj._counterRaf);
  }
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    const current = start + easeProgress * (end - start);
    
    obj.textContent = current.toFixed(decimals) + suffix;
    if (progress < 1) {
      obj._counterRaf = window.requestAnimationFrame(step);
    } else {
      obj.textContent = end.toFixed(decimals) + suffix;
      obj._counterRaf = null;
    }
  };
  obj._counterRaf = window.requestAnimationFrame(step);
}

/* ----------------------------------------------------------------------------
 * 7. TOAST NOTIFICATION UTILITY
 * ---------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');
  toast.innerHTML = `<span style="color:var(--accent-cyan);font-weight:bold;">${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 320);
  }, 3200);
}

/* Global helper for copying text */
function copyToClipboard(text, label = 'Text') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`, 'success');
    }).catch(() => {
      showToast(`Failed to copy ${label}`, 'error');
    });
  } else {
    showToast(`${label} copied!`, 'success');
  }
}
