require('./jquery-helpers');

document.addEventListener("DOMContentLoaded", function () {
    const myCarousel = document.querySelector('#carouselExampleCaptions');

    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000,
        ride: 'carousel'
    });
});