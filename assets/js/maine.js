(function () {
  "use strict";

  document
    .querySelector("#navbarSideCollapse")
    .addEventListener("click", function () {
      document.querySelector(".offcanvas-collapse").classList.toggle("open");
    });
})();

$(function () {
  const template = {
    win: $(window),
    navbar: $(".nav-bar"),
  };

  $(document).ready(function () {
    "use strict";
    template.win.on("scroll", function () {
      var navBarOne = $(".bg-gray"),
        navBarMenu = $(".nav-menu-bar");
      if (template.win.scrollTop() > 50) {
        navBarOne.css("display", "none");
        navBarMenu.css("position", "fixed");
      } else {
        navBarOne.css("display", "block");
        navBarMenu.css("position", "relative");
      }
    });
    /*========== Start Scroll For Navigation Menu ==========*/

    //// COLLAPSED MENU CLOSE ON CLICK
    template.navbar.on("click", ".navbar-collapse", function (e) {
      if ($(e.target).is(".navsLink a, .dropdown-menu .dropdown-item")) {
        $(this).collapse("hide");
      }
    });
  });
});
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

function rangeSlide(value) {
  document.getElementById("rangeValue").innerHTML = value;
}
// Siwper JS

let swiperCard = new Swiper(".card-content", {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    600: { slidesPerView: 2 },
    968: { slidesPerView: 3 },
  },
});

// =========================================================
