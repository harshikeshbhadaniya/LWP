/* ============================================================
   PRODUCTS PAGE — SEARCH & FILTER
   ============================================================ */
'use strict';

(function () {
  var allCards   = Array.from(document.querySelectorAll('.cat-card'));
  var catHeads   = Array.from(document.querySelectorAll('.cat-section-head'));
  var countEl    = document.getElementById('pCount');
  var emptyEl    = document.getElementById('emptyState');
  var searchEl   = document.getElementById('pSearch');
  var clearEl    = document.getElementById('pSearchClear');
  var filterBtns = document.querySelectorAll('.p-cats .pf-btn');
  var resetBtn   = document.getElementById('resetFilters');

  var curFilter = 'all';
  var curSearch = '';

  function applyFilters() {
    var visible = 0;
    allCards.forEach(function (card) {
      var cat  = card.getAttribute('data-cat') || '';
      var name = (card.getAttribute('data-name') || '').toLowerCase();
      var text = (card.textContent || '').toLowerCase();
      var matchF = curFilter === 'all' || cat === curFilter;
      var matchS = !curSearch || name.includes(curSearch) || text.includes(curSearch);
      var show   = matchF && matchS;
      card.classList.toggle('hidden', !show);
      if (show) { card.classList.remove('visible'); setTimeout(function () { card.classList.add('visible'); }, 20); visible++; }
    });

    // Show/hide category headers
    catHeads.forEach(function (h) {
      var key = h.id.replace('cat-', '');
      var any = allCards.some(function (c) { return !c.classList.contains('hidden') && c.getAttribute('data-cat') === key; });
      h.style.display = any ? '' : 'none';
    });

    if (countEl)  countEl.textContent = visible;
    if (emptyEl)  emptyEl.style.display = visible === 0 ? 'block' : 'none';
  }

  // Search
  if (searchEl) {
    searchEl.addEventListener('input', function () {
      curSearch = searchEl.value.trim().toLowerCase();
      if (clearEl) clearEl.style.display = curSearch ? 'flex' : 'none';
      applyFilters();
    });
  }
  if (clearEl) {
    clearEl.addEventListener('click', function () {
      searchEl.value = ''; curSearch = ''; clearEl.style.display = 'none';
      applyFilters(); searchEl.focus();
    });
  }

  // Filter buttons
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      curFilter = btn.getAttribute('data-f') || 'all';
      applyFilters();
    });
  });

  // Reset
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      curFilter = 'all'; curSearch = '';
      if (searchEl) searchEl.value = '';
      if (clearEl)  clearEl.style.display = 'none';
      filterBtns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-f') === 'all'); });
      applyFilters();
    });
  }

  // Smooth scroll for in-page anchor links (#cat-*)
  document.querySelectorAll('a[href^="#cat-"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (!t) return; e.preventDefault();
      var offset = 130;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  // Set initial count
  if (countEl) countEl.textContent = allCards.length;
})();
