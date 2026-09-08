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

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Honeypot proti jednoduchým spam botům. Pro běžného návštěvníka musí zůstat prázdný.
  const honey = form.querySelector('[name="_honey"]');
  if (honey?.value) {
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const originalButtonText = button?.textContent;

  if (button) {
    button.disabled = true;
    button.textContent = 'Odesílám…';
  }

  status.textContent = 'Odesílám vaši zprávu…';
  status.classList.remove('is-error', 'is-success');

  try {
    const formData = new FormData(form);

    // E-mail návštěvníka nastavíme jako adresu pro odpověď.
    formData.set('_replyto', formData.get('email'));

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Odeslání se nezdařilo.');
    }

    status.textContent = 'Děkujeme. Vaše zpráva byla úspěšně odeslána.';
    status.classList.add('is-success');
    form.reset();
  } catch (error) {
    status.textContent = 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište přímo na mladibucovaci@gmail.com.';
    status.classList.add('is-error');
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalButtonText;
    }
  }
});
