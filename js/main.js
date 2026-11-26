/* ============================================================
   LAXMI ENGINEERING WORKS — MAIN JS
   ============================================================ */
'use strict';

/* ── 1. PRELOADER ─────────────────────────────────────── */
window.addEventListener('load', function () {
  var pre = document.getElementById('preloader');
  if (!pre) return;
  setTimeout(function () {
    pre.classList.add('out');
    // hero entrance after loader
    setTimeout(function () {
      document.querySelectorAll('.hero .fade-in').forEach(function (el, i) {
        setTimeout(function () { el.classList.add('visible'); }, i * 120);
      });
    }, 300);
    // show banner popup after loader
    setTimeout(openPopup, 500);
  }, 1700);
});

/* ── 2. STICKY HEADER ─────────────────────────────────── */
(function () {
  var h = document.getElementById('header');
  if (!h) return;
  window.addEventListener('scroll', function () {
    h.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ── 3. MOBILE NAV ────────────────────────────────────── */
(function () {
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');
  var header = document.getElementById('header');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  menu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && menu.classList.contains('open')) {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

/* ── 4. ACTIVE NAV ON SCROLL ──────────────────────────── */
(function () {
  var secs  = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-link');
  if (!secs.length) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(function (s) { obs.observe(s); });
})();

/* ── 5. FADE-IN ON SCROLL ─────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { obs.observe(el); });
})();

/* ── 6. COUNTER ANIMATION ─────────────────────────────── */
(function () {
  var counters = document.querySelectorAll('.count');
  if (!counters.length) return;
  var done = false;
  var obs = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting || done) return;
    done = true;
    counters.forEach(function (el) {
      var target = +el.getAttribute('data-target');
      var start  = null;
      var dur    = 1800;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(step);
    });
    obs.disconnect();
  }, { threshold: 0.4 });
  var hero = document.querySelector('.hero-counters');
  if (hero) obs.observe(hero);
})();

/* ── 7. PRODUCT FILTER ────────────────────────────────── */
(function () {
  var btns  = document.querySelectorAll('.pf-btn');
  var cards = document.querySelectorAll('.prod-card');
  if (!btns.length) return;
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-f');
      cards.forEach(function (c) {
        var show = f === 'all' || c.getAttribute('data-cat') === f;
        c.classList.toggle('hidden', !show);
        if (show) { c.classList.remove('visible'); setTimeout(function () { c.classList.add('visible'); }, 30); }
      });
    });
  });
})();

/* ── 8. BACK TO TOP ───────────────────────────────────── */
(function () {
  var btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', function () { btn.classList.toggle('show', window.scrollY > 400); }, { passive: true });
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();

/* ── 9. SMOOTH SCROLL ─────────────────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      var hh = document.getElementById('header') ? document.getElementById('header').offsetHeight : 70;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - hh, behavior: 'smooth' });
    });
  });
})();

/* ── 10. CONTACT FORM ─────────────────────────────────── */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = [document.getElementById('cfName'), document.getElementById('cfPhone'), document.getElementById('cfMsg')];
    var ok = true;
    fields.forEach(function (f) {
      if (!f) return;
      if (!f.value.trim()) { f.style.borderColor = '#e74c3c'; ok = false; }
      else f.style.borderColor = '';
    });
    if (!ok) return;
    var sub = form.querySelector('[type="submit"]');
    var orig = sub.innerHTML;
    sub.disabled = true;
    sub.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    setTimeout(function () {
      sub.disabled = false; sub.innerHTML = orig; form.reset();
      var s = document.getElementById('cfSuccess');
      if (s) { s.style.display = 'flex'; setTimeout(function () { s.style.display = 'none'; }, 5000); }
    }, 1600);
  });
})();

/* ── 11. PARTICLES ────────────────────────────────────── */
(function () {
  var c = document.getElementById('heroParticles');
  if (!c) return;
  var n = window.innerWidth < 600 ? 16 : 32;
  for (var i = 0; i < n; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    var s = Math.random() * 5 + 2;
    p.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (Math.random()*100) + '%;top:' + (Math.random()*100) + '%;animation-duration:' + (Math.random()*12+8) + 's;animation-delay:' + (Math.random()*8) + 's;';
    c.appendChild(p);
  }
})();

/* ── 12. BANNER POPUP ─────────────────────────────────── */
function openPopup() {
  var ov = document.getElementById('bannerPopup');
  if (!ov) return;
  ov.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closePopup() {
  var ov = document.getElementById('bannerPopup');
  if (!ov) return;
  ov.classList.remove('show');
  document.body.style.overflow = '';
}
(function () {
  var ov  = document.getElementById('bannerPopup');
  if (!ov) return;
  var cls = document.getElementById('popupClose');
  var skp = document.getElementById('popupSkip');
  var cta = document.getElementById('popupCta');
  if (cls) cls.addEventListener('click', closePopup);
  if (skp) skp.addEventListener('click', closePopup);
  if (cta) cta.addEventListener('click', closePopup);
  ov.addEventListener('click', function (e) { if (e.target === ov) closePopup(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePopup(); });
})();

/* ── 13. TOPBAR HIDE ON MOBILE SCROLL ─────────────────── */
(function () {
  var tb = document.querySelector('.topbar');
  if (!tb) return;
  window.addEventListener('scroll', function () {
    if (window.innerWidth < 768) tb.style.display = window.scrollY > 60 ? 'none' : '';
  }, { passive: true });
})();
