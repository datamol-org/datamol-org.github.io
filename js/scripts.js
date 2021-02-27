$(function () {
  // init feather icons
  feather.replace();
});

// tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// mobile nav business logic
var nav = document.querySelector("#nav");
var waves = document.querySelector(".box");
var menu = document.querySelector("#menu");
var menuToggle = document.querySelector(".nav__toggle");
var isMenuOpen = false;

menuToggle.addEventListener("click", (e) => {
  e.preventDefault();
  isMenuOpen = !isMenuOpen;

  // toggle a11y attributes and active class
  menuToggle.setAttribute("aria-expanded", String(isMenuOpen));
  menu.hidden = !isMenuOpen;
  nav.classList.toggle("nav--open");
  waves.classList.toggle("nav--open");

  if (menu.hidden) {
    bodyScrollLock.enableBodyScroll(nav);
  } else {
    bodyScrollLock.disableBodyScroll(nav);
  }
});

// TRAP TAB INSIDE NAV WHEN OPEN
nav.addEventListener("keydown", (e) => {
  // abort if menu isn't open or modifier keys are pressed
  if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
    return;
  }

  // listen for tab press and move focus
  // if we're on either end of the navigation
  var menuLinks = menu.querySelectorAll(".nav__link");
  if (e.keyCode === 9) {
    if (e.shiftKey) {
      if (document.activeElement === menuLinks[0]) {
        menuToggle.focus();
        e.preventDefault();
      }
    } else if (document.activeElement === menuToggle) {
      menuLinks[0].focus();
      e.preventDefault();
    }
  }
});
