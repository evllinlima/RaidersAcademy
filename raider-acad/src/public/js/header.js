console.log("Home.js carregado!");
// header.js

const navItems = document.querySelectorAll('.navbar a');

function activateNavItem(index) {
  navItems.forEach(item => item.classList.remove('active'));
  navItems[index].classList.add('active');
}

function checkSections() {
  const sections = document.querySelectorAll('.section');
  const triggerBottom = window.innerHeight / 5 * 4;

  sections.forEach((section, index) => {
    const sectionTop = section.getBoundingClientRect().top;
    
    if (sectionTop < triggerBottom) {
      section.classList.add('active');
      activateNavItem(index);
    } else {
      section.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', checkSections);
window.addEventListener('resize', checkSections);
window.addEventListener('load', checkSections);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });