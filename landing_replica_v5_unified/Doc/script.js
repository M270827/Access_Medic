// Animación al hacer scroll
const animadas = document.querySelectorAll('.animada');

const mostrarElementos = () => {
  animadas.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const visible = window.innerHeight * 0.8;
    if (top < visible) el.classList.add('visible');
  });
};

window.addEventListener('scroll', mostrarElementos);
document.addEventListener('DOMContentLoaded', mostrarElementos);

// Animación de entrada para la sección principal
window.addEventListener('load', () => {
  const hero = document.querySelector('.contenido-hero');
  hero.style.opacity = 0;
  hero.style.transform = 'translateY(30px)';
  setTimeout(() => {
    hero.style.transition = 'all 1s ease';
    hero.style.opacity = 1;
    hero.style.transform = 'translateY(0)';
  }, 300);
});

// Hover en imágenes de vistas
const vistas = document.querySelectorAll('.vista img');
vistas.forEach(img => {
  img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.05)';
    img.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    img.style.boxShadow = 'none';
  });
});
