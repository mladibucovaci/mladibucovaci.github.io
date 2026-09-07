const nav = document.querySelector('#main-nav');
const toggle = document.querySelector('.menu-toggle');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const form = document.querySelector('#contact-form');
const status = document.querySelector('.form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Děkujeme za Váš dotaz. Ozveme se Vám obratem.';
  form.reset();
});
