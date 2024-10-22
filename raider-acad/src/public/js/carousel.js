console.log("Home.js carregado!");
// carousel.js
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentIndex = 0;

function showSlide(index) {
  if (index < 0) {
    currentIndex = items.length - 1;
  } else if (index >= items.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  
  items.forEach(item => item.style.opacity = '0');
  
  setTimeout(() => {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    items[currentIndex].style.opacity = '1';
  }, 200);
}

prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

// Auto-play (optional)
setInterval(() => showSlide(currentIndex + 1), 6000);
