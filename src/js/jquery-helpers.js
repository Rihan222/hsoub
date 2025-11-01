// jQuery helpers: include scroll-to-navbar behavior and small utilities
const $ = require('jquery');

$(function () {
    // Navbar background on scroll — target any navbar on the page (header or top-level)
    const $nav = $('header nav, nav.navbar');
    function updateNav() {
        if ($(window).scrollTop() > 200) {
            $nav.addClass('scrolled');
        } else {
            $nav.removeClass('scrolled');
        }
    }
    // initial check
    updateNav();
    $(window).on('scroll', updateNav);

    // Smooth scroll for internal links
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top - 60 }, 400);
        }
    });
});
