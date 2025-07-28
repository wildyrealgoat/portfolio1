// Плавный скролл по навигации
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Кнопка связи
const contactButtons = [document.getElementById('contactBtn')];
contactButtons.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      alert('Свяжитесь со мной по email: ilyasharaputin@gmail.com');
    });
  }
});

// Анимация появления/исчезновения блоков
const fadeElements = document.querySelectorAll('.fade');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        const delay = Array.from(fadeElements).indexOf(el) * 150;
        setTimeout(() => {
          el.classList.add('visible');
          el.classList.remove('hidden');
        }, delay);
      } else {
        el.classList.remove('visible');
        el.classList.add('hidden');
      }
    });
  },
  { threshold: 0.3 }
);
fadeElements.forEach(el => observer.observe(el));

// Эффект параллакса на фото в "Обо мне"
const aboutPhoto = document.querySelector('.about-photo img');
if (aboutPhoto) {
  const movementStrength = 15;
  document.querySelector('.about-me').addEventListener('mousemove', e => {
    const rect = aboutPhoto.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const moveX = (relX / (rect.width / 2)) * movementStrength;
    const moveY = (relY / (rect.height / 2)) * movementStrength;
    aboutPhoto.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });
  document.querySelector('.about-me').addEventListener('mouseleave', () => {
    aboutPhoto.style.transform = 'translate(0, 0) scale(1)';
  });
}

// Scroll Spy 
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Эффект увеличения карточек
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 10px 25px rgba(102, 252, 241, 0.7)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
    card.style.boxShadow = 'none';
  });
});

// Анимация фона при скролле
window.addEventListener('scroll', () => {
  let scroll = window.scrollY / 1000;
  document.body.style.backgroundPosition = `${scroll * 50}% ${scroll * 50}%`;
});

// Плавное появление заголовков с увеличением
const titles = document.querySelectorAll('h1, h2');
const titleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.5 });

titles.forEach(title => titleObserver.observe(title));

const spaceCanvas = document.getElementById("space-bg");
const sCtx = spaceCanvas.getContext("2d");
let stars = [];

function resizeSpace() {
  spaceCanvas.width = window.innerWidth;
  spaceCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeSpace);
resizeSpace();

// Звёзды
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * spaceCanvas.width,
    y: Math.random() * spaceCanvas.height,
    r: Math.random() * 1.5 + 0.5,
    baseR: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.2, 
    flicker: Math.random() * 0.15 + 0.05 
  });
}

function drawStars(scrollOffset) {
  sCtx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);
  sCtx.fillStyle = "#fff";

  stars.forEach((s) => {
    s.r += (Math.random() - 0.5) * s.flicker;
    if (s.r < 0.3) s.r = 0.3;
    if (s.r > 3) s.r = 3;

    s.y += s.speed;
    if (s.y > spaceCanvas.height) s.y = 0;

    let offsetY = (s.y - scrollOffset * 0.5) % spaceCanvas.height;
    if (offsetY < 0) offsetY += spaceCanvas.height;

    sCtx.beginPath();
    sCtx.arc(s.x, offsetY, s.r, 0, Math.PI * 2);
    sCtx.fill();
  });
}

function animateSpace() {
  const scrollY = window.scrollY;
  drawStars(scrollY);
  requestAnimationFrame(animateSpace);
}
animateSpace();

