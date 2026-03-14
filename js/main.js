/* ===========================
   БУРГЕР-МЕНЮ
   =========================== */
(function () {
  var burger = document.querySelector('.burger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (!burger || !mobileMenu) return;

  burger.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('mobile-menu--open');
    burger.classList.toggle('burger--open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('mobile-menu--open');
      burger.classList.remove('burger--open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ===========================
   АКТИВНЫЙ ПУНКТ НАВИГАЦИИ
   =========================== */
(function () {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  document.querySelectorAll('.mobile-menu__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('mobile-menu__link--active');
    }
  });
})();

/* ===========================
   HEADER — ТЕНЬ ПРИ СКРОЛЛЕ
   =========================== */
(function () {
  var header = document.querySelector('.header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Проверить при загрузке
})();

/* ===========================
   ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ
   =========================== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ===========================
   АНИМАЦИИ ПОЯВЛЕНИЯ (INTERSECTION OBSERVER)
   =========================== */
(function () {
  if (!('IntersectionObserver' in window)) return;

  // Селекторы элементов, которые анимируются
  var selectors = [
    '.advantage-card',
    '.service-card',
    '.repair-card',
    '.step-card',
    '.catalog-card',
    '.about__inner',
    '.cta-form__inner',
    '.catalog-banner',
    '.price-table',
    '.pagination',
    '.section__title',
    '.catalog__header',
    '.request__inner',
    '.cta__title',
    '.cta__text'
  ];

  var elements = document.querySelectorAll(selectors.join(', '));
  elements.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ===========================
   ФИЛЬТРЫ КАТАЛОГА
   =========================== */
(function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');
    });
  });
})();

/* ===========================
   ФОРМА — ЗАГЛУШКА ОТПРАВКИ
   =========================== */
(function () {
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var original = btn.textContent;

      btn.textContent = 'Отправляем...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = '✓ Заявка отправлена!';
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
          form.reset();
        }, 2500);
      }, 800);
    });
  });
})();
