/* ============================================================
   LAXMI ENGINEERING WORKS — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ============================================================
   1. PAGE LOADER
   ============================================================ */
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  if (!loader) return;
  // Give a slight delay so the fill animation completes nicely
  setTimeout(function () {
    loader.classList.add('hidden');
    // Kick off entrance animations after loader disappears
    setTimeout(triggerHeroAnimations, 300);
  }, 1700);
});

function triggerHeroAnimations() {
  // Animate elements that are already in viewport (hero section)
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-left, .hero .reveal-right')
    .forEach(function (el, i) {
      setTimeout(function () { el.classList.add('visible'); }, i * 120);
    });
}

/* ============================================================
   2. STICKY HEADER SHADOW
   ============================================================ */
(function () {
  var header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
})();

/* ============================================================
   3. HAMBURGER MOBILE MENU
   ============================================================ */
(function () {
  var hamburger = document.getElementById('hamburger');
  var navbar    = document.getElementById('navbar');
  if (!hamburger || !navbar) return;

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navbar.classList.toggle('open');
    document.body.style.overflow = navbar.classList.contains('open') ? 'hidden' : '';
  });

  // Close on nav link click
  navbar.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navbar.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && navbar.classList.contains('open')) {
      hamburger.classList.remove('open');
      navbar.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

/* ============================================================
   4. ACTIVE NAV LINK ON SCROLL (Intersection Observer)
   ============================================================ */
(function () {
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();

/* ============================================================
   5. SCROLL REVEAL (Intersection Observer)
   ============================================================ */
(function () {
  var revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================
   6. ANIMATED COUNTERS (hero stats)
   ============================================================ */
(function () {
  var counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  var started = false;

  function startCounters() {
    if (started) return;
    started = true;
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var duration = 1800;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) { requestAnimationFrame(step); }
        else { el.textContent = target.toLocaleString(); }
      }
      requestAnimationFrame(step);
    });
  }

  // Trigger when hero stats enter viewport
  var statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;

  var obs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) { startCounters(); obs.disconnect(); }
  }, { threshold: 0.4 });
  obs.observe(statsEl);
})();

/* ============================================================
   7. PRODUCT FILTER
   ============================================================ */
(function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var productCards = document.querySelectorAll('.product-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      productCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal animation
          card.classList.remove('visible');
          setTimeout(function () { card.classList.add('visible'); }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ============================================================
   8. BACK TO TOP BUTTON
   ============================================================ */
(function () {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   9. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var headerHeight = document.getElementById('header')
        ? document.getElementById('header').offsetHeight
        : 70;
      var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   10. CONTACT FORM HANDLER
   ============================================================ */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    var name    = document.getElementById('name');
    var phone   = document.getElementById('phone');
    var message = document.getElementById('message');
    var valid   = true;

    [name, phone, message].forEach(function (field) {
      if (!field) return;
      if (!field.value.trim()) {
        field.style.borderColor = '#e74c3c';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) return;

    // Simulate form submission
    var submitBtn = form.querySelector('[type="submit"]');
    var original  = submitBtn.innerHTML;
    submitBtn.disabled  = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(function () {
      submitBtn.innerHTML = original;
      submitBtn.disabled  = false;
      form.reset();
      var success = document.getElementById('formSuccess');
      if (success) {
        success.style.display = 'flex';
        setTimeout(function () { success.style.display = 'none'; }, 5000);
      }
    }, 1600);
  });
})();

/* ============================================================
   11. HERO BACKGROUND PARTICLES
   ============================================================ */
(function () {
  var container = document.getElementById('heroParticles');
  if (!container) return;

  var count = window.innerWidth < 600 ? 18 : 36;

  for (var i = 0; i < count; i++) {
    var p = document.createElement('div');
    p.className = 'particle';

    var size = Math.random() * 5 + 2;
    p.style.cssText = [
      'width:'            + size + 'px',
      'height:'           + size + 'px',
      'left:'             + (Math.random() * 100) + '%',
      'top:'              + (Math.random() * 100) + '%',
      'animation-duration:'  + (Math.random() * 12 + 8) + 's',
      'animation-delay:'     + (Math.random() * 8) + 's',
    ].join(';');

    container.appendChild(p);
  }
})();

/* ============================================================
   12. GALLERY LIGHTBOX (simple overlay)
   ============================================================ */
(function () {
  var items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  // Build overlay
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;cursor:zoom-out;';
  overlay.innerHTML = '<div style="text-align:center;color:#fff;padding:20px;"><div style="font-size:4rem;margin-bottom:12px;" id="lightboxIcon"></div><div style="font-size:1.2rem;font-weight:600;" id="lightboxTitle"></div><div style="font-size:.85rem;color:rgba(255,255,255,.5);margin-top:8px;">Click to close</div></div>';
  document.body.appendChild(overlay);

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      var icon  = item.querySelector('.gallery-placeholder i');
      var label = item.querySelector('.gallery-placeholder span');
      document.getElementById('lightboxIcon').innerHTML  = icon ? icon.outerHTML : '';
      document.getElementById('lightboxTitle').textContent = label ? label.textContent : '';
      overlay.style.display = 'flex';
      setTimeout(function () { overlay.style.opacity = '1'; }, 10);
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.addEventListener('click', function () {
    overlay.style.opacity = '0';
    setTimeout(function () {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  });
})();

/* ============================================================
   13. TOPBAR — hide on mobile scroll
   ============================================================ */
(function () {
  var topbar    = document.querySelector('.topbar');
  if (!topbar) return;
  var lastY = 0;
  window.addEventListener('scroll', function () {
    if (window.innerWidth < 768) {
      topbar.style.display = window.scrollY > 80 ? 'none' : '';
    }
    lastY = window.scrollY;
  }, { passive: true });
})();

/* ============================================================
   EOF
   ============================================================ */
