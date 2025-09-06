/* v5 scripts: navbar behavior, reveals, slider, form validation, micro interactions */
document.addEventListener('DOMContentLoaded', function(){
  // Navbar: animación al hacer scroll
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 20) {
      header.style.transition = "all 0.6s ease";
      header.style.backdropFilter = 'blur(8px)';
      header.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
      header.style.boxShadow = '0 8px 28px rgba(3,20,18,0.08)';
      header.style.transform = "translateY(0)";
      header.style.opacity = "1";
    } else {
      header.style.background = 'transparent';
      header.style.boxShadow = 'none';
      header.style.opacity = "0.95";
    }
  });

  // Mobile nav toggle con scale animado
  const navToggle = document.getElementById('nav-toggle');
  navToggle.addEventListener('click', () => {
    if(nav.style.display === 'flex'){
      nav.style.opacity = "0";
      nav.style.transform = "scale(0.95)";
      setTimeout(()=> nav.style.display = 'none', 300);
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))';
      nav.style.padding = '12px';
      nav.style.borderRadius = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '20px';
      nav.style.top = '64px';
      nav.style.opacity = "0";
      nav.style.transform = "scale(0.95)";
      setTimeout(()=> {
        nav.style.opacity = "1";
        nav.style.transform = "scale(1)";
      }, 20);
      nav.style.transition = "all 0.35s ease";
    }
  });

  // Scroll reveal con rebote extra
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('in');
        entry.target.style.transition = "all 0.9s cubic-bezier(.2,1,.3,1.4)";
        entry.target.style.transform = "translateY(-10px) scale(1.05)";
        entry.target.style.opacity = "1";
        setTimeout(()=> entry.target.style.transform = "scale(1)", 800);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => {
    el.style.opacity = "0";
    observer.observe(el);
  });

  // Slider con zoom
  let current = 0;
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');

  function show(n){
    slides.forEach((s,i)=> {
      s.classList.toggle('active', i===n);
      s.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      if(i===n){
        s.style.opacity = "1";
        s.style.transform = "translateX(0) scale(1.02)";
        setTimeout(()=> s.style.transform = "scale(1)", 600);
      } else {
        s.style.opacity = "0";
        s.style.transform = i<n ? "translateX(-40px)" : "translateX(40px)";
      }
    });
  }
  show(current);

  prevBtn.addEventListener('click', ()=>{
    current = (current-1+slides.length)%slides.length;
    show(current);
  });
  nextBtn.addEventListener('click', ()=>{
    current = (current+1)%slides.length;
    show(current);
  });

  setInterval(()=>{
    current = (current+1)%slides.length;
    show(current);
  }, 4500);

  // Contact form con animación de error shake
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      formMsg.style.color = 'crimson';
      formMsg.textContent = 'Por favor completa todos los campos.';
      formMsg.style.opacity = "1";
      formMsg.style.transition = "opacity 0.4s ease";
      formMsg.style.animation = "shake 0.3s";
      setTimeout(()=> formMsg.style.animation = "", 400);
      return;
    }
    formMsg.style.color = 'green';
    formMsg.textContent = 'Mensaje enviado. ¡Gracias!';
    formMsg.style.opacity = "0";
    setTimeout(()=> formMsg.style.opacity = "1", 50);
    form.reset();
    setTimeout(()=> formMsg.textContent = '', 4000);
  });

  // Parallax card con resplandor
  const device = document.getElementById('deviceCard');
  if(device){
    device.addEventListener('mousemove', (ev)=>{
      const r = device.getBoundingClientRect();
      const px = (ev.clientX - r.left)/r.width;
      const py = (ev.clientY - r.top)/r.height;
      const rx = (py - 0.5) * 6;
      const ry = (px - 0.5) * -10;
      device.style.transition = "transform 0.1s ease-out, box-shadow 0.2s ease-out";
      device.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
      device.style.boxShadow = `${-ry*1.2}px ${rx*1.2}px 25px rgba(0,150,255,0.3)`;
    });
    device.addEventListener('mouseleave', ()=>{
      device.style.transition = "transform 0.6s cubic-bezier(.2,1.2,.3,1), box-shadow 0.6s ease";
      device.style.transform = 'translateY(-6px) scale(1)';
      device.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
    });
  }
});

// Extra: animación de shake para errores
const style = document.createElement("style");
style.textContent = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}`;
document.head.appendChild(style);
