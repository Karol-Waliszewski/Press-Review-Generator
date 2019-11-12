$navMenu = document.querySelector("#navbarMobileMenu");
$navBurger = document.querySelector("#navbarBurger");

const toggleMenu = function() {
  $navMenu.classList.toggle("is-active");
};

$navBurger.addEventListener("click", toggleMenu);
