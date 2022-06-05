const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: false,

  // Navigation arrows
  navigation: {
    nextEl: ".arrow-slider-next",
    prevEl: ".arrow-slider-prev",
  },
  autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  slidesPerView: 4,
  slidesPerGroup: 4,
  breakpoints: {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },

    // when window width is >= 480px
    400: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});
