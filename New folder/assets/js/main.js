/* ============================================================
   Lexinodix — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Current year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Header scrolled state ---------- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Mobile drawer ---------- */
  var navToggle = document.getElementById('navToggle');
  var drawer = document.getElementById('mobileDrawer');
  var backdrop = document.getElementById('drawerBackdrop');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (navToggle) navToggle.setAttribute('aria-expanded', String(open));
  }
  if (navToggle) navToggle.addEventListener('click', function () { setDrawer(true); });
  document.querySelectorAll('[data-drawer-close]').forEach(function (b) {
    b.addEventListener('click', function () { setDrawer(false); });
  });
  if (backdrop) backdrop.addEventListener('click', function () { setDrawer(false); });
  if (drawer) drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setDrawer(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', cur);
      try { localStorage.setItem('lex-theme', cur); } catch (e) {}
      syncThemeIcon(cur);
    });
  }
  function syncThemeIcon(theme) {
    var ic = document.getElementById('themeIcon');
    if (!ic) return;
    if (theme === 'dark') {
      ic.innerHTML = '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>';
    } else {
      ic.innerHTML = '<circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 3.5a8.5 8.5 0 1 0 0 17 6.5 6.5 0 0 1 0-17Z" fill="currentColor"/>';
    }
  }
  syncThemeIcon(document.documentElement.getAttribute('data-theme') || 'light');

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('[data-reveal], [data-count]');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          if (entry.target.hasAttribute('data-count')) runCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('in');
      if (el.hasAttribute('data-count')) {
        var t = parseFloat(el.getAttribute('data-count'));
        var s = el.getAttribute('data-suffix') || '', p = el.getAttribute('data-prefix') || '';
        var d = (String(t).split('.')[1] || '').length;
        el.querySelector('.count-val').textContent = p + formatNum(t, d) + s;
      }
    });
  }

  /* ---------- Count up ---------- */
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var pre = el.getAttribute('data-prefix') || '';
    var decimals = (String(target).split('.')[1] || '').length;
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.querySelector('.count-val').textContent = pre + formatNum(val, decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.querySelector('.count-val').textContent = pre + formatNum(target, decimals) + suffix;
    }
    requestAnimationFrame(step);
  }
  function formatNum(n, dec) {
    return Number(n.toFixed(dec)).toLocaleString('en-US');
  }

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.accordion .q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.item');
      var a = item.querySelector('.a');
      var open = item.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
    });
  });

  /* ---------- Copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        var prev = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
        setTimeout(function () { btn.innerHTML = prev; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done).catch(done);
      else done();
    });
  });

  /* ---------- Fake newsletter / contact form (no backend) ---------- */
  document.querySelectorAll('[data-noop-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.parentElement.querySelector('.form-ok');
      if (ok) ok.classList.add('show');
      form.reset();
    });
  });

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 620);
    }, { passive: true });
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- Reading progress (articles) ---------- */
  var bar = document.getElementById('readProgress');
  if (bar) {
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (scrolled * 100) + '%';
    }, { passive: true });
  }
})();
