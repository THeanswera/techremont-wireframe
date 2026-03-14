/* ===========================
   БУРГЕР-МЕНЮ
   =========================== */
(function () {
  var burger = document.querySelector('.burger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (!burger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    burger.classList.add('burger--open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    burger.classList.remove('burger--open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  burger.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.contains('mobile-menu--open');
    if (isOpen) { closeMenu(); } else { openMenu(); }
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Закрытие по клику вне меню
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('mobile-menu--open') &&
      !mobileMenu.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      closeMenu();
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
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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

  // Группы карточек — получают каскадную задержку
  var cardGroups = [
    '.advantage-card',
    '.service-card',
    '.repair-card',
    '.step-card',
    '.catalog-card'
  ];

  // Одиночные блоки — без каскада
  var singleSelectors = [
    '.about__inner',
    '.cta-form__inner',
    '.catalog-banner',
    '.price-table',
    '.pagination',
    '.section__title',
    '.catalog__header',
    '.request__inner',
    '.cta__title',
    '.cta__text',
    '.hero__content',
    '.hero__img'
  ];

  // Добавляем .reveal ко всем
  var allSelectors = cardGroups.concat(singleSelectors);
  document.querySelectorAll(allSelectors.join(', ')).forEach(function (el) {
    el.classList.add('reveal');
  });

  // Каскадная задержка для карточек внутри одного родителя
  cardGroups.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (card) {
      var parent = card.parentElement;
      if (!parent) return;
      var siblings = Array.prototype.slice.call(
        parent.querySelectorAll(selector)
      );
      var idx = siblings.indexOf(card);
      if (idx >= 0) {
        card.style.transitionDelay = (idx * 80) + 'ms';
      }
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.10,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll(allSelectors.join(', ')).forEach(function (el) {
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
