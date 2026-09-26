/* ============================================================
   PRODUCTS PAGE — SEARCH, FILTER & UTILITY JS
   ============================================================ */

'use strict';

(function () {

  /* ── All card elements ──────────────────────────────────── */
  var allCards     = Array.from(document.querySelectorAll('.cat-card'));
  var catHeaders   = Array.from(document.querySelectorAll('.cat-header'));
  var resultCount  = document.getElementById('resultCount');
  var emptyState   = document.getElementById('emptyState');
  var searchInput  = document.getElementById('productSearch');
  var clearBtn     = document.getElementById('clearSearch');
  var filterBtns   = document.querySelectorAll('.cat-filter-wrap .filter-btn');
  var resetBtn     = document.getElementById('resetSearch');

  var currentFilter = 'all';
  var currentSearch = '';

  /* ── Render / filter ────────────────────────────────────── */
  function applyFilters() {
    var visible = 0;

    allCards.forEach(function (card) {
      var cat  = card.getAttribute('data-category') || '';
      var name = (card.getAttribute('data-name') || '').toLowerCase();
      var text = (card.textContent || '').toLowerCase();

      var matchFilter = (currentFilter === 'all') || (cat === currentFilter);
      var matchSearch = !currentSearch ||
        name.includes(currentSearch) ||
        text.includes(currentSearch);

      if (matchFilter && matchSearch) {
        card.classList.remove('hidden');
        card.classList.add('visible');   // re-trigger reveal
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    /* Show/hide category headers based on visible cards in their group */
    catHeaders.forEach(function (header) {
      var id     = header.id;                  // e.g. "cat-fittings"
      var catKey = id.replace('cat-', '');     // e.g. "fittings"
      var hasVisible = allCards.some(function (c) {
        return !c.classList.contains('hidden') &&
               c.getAttribute('data-category') === catKey;
      });
      header.style.display = hasVisible ? '' : 'none';
    });

    /* Update count */
    if (resultCount) resultCount.textContent = visible;

    /* Empty state */
    if (emptyState) {
      emptyState.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  /* ── Search ─────────────────────────────────────────────── */
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      currentSearch = searchInput.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = currentSearch ? 'flex' : 'none';
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      searchInput.value = '';
      currentSearch = '';
      clearBtn.style.display = 'none';
      applyFilters();
      searchInput.focus();
    });
  }

  /* ── Category filter buttons ────────────────────────────── */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  /* ── Reset from empty state ─────────────────────────────── */
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      currentFilter = 'all';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      if (clearBtn)    clearBtn.style.display = 'none';
      filterBtns.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
      });
      applyFilters();
    });
  }

  /* ── Smooth scroll for in-page anchor links ─────────────── */
  document.querySelectorAll('a[href^="#cat-"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = 140; // toolbar + header height
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Initial count ──────────────────────────────────────── */
  if (resultCount) resultCount.textContent = allCards.length;

})();
