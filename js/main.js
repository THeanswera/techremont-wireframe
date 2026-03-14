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

  // Закрытие при клике на ссылку внутри мобильного меню
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

  // Десктопная навигация
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  // Мобильная навигация
  document.querySelectorAll('.mobile-menu__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('mobile-menu__link--active');
    }
  });
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
   ФИЛЬТРЫ КАТАЛОГА
   =========================== */
(function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');
      // В wireframe фильтрация визуально не реализована — только переключение активной кнопки
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
      alert('Заявка принята! Мы свяжемся с вами в ближайшее время.');
      form.reset();
    });
  });
})();
