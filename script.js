document.documentElement.classList.add('js');

// Atualize este número no formato internacional, sem espaços ou símbolos.
const WHATSAPP_NUMBER = '5531997839247';
const procedures = [
  {
    title: 'Avaliação podológica',
    description: 'Avaliação inicial dos pés.'
  },
  {
    title: 'Corte técnico de unhas',
    description: 'Corte e cuidado das unhas.'
  },
  {
    title: 'Tratamento de unhas encravadas',
    description: 'Atendimento podológico para unhas encravadas.'
  },
  {
    title: 'Remoção de calosidades',
    description: 'Cuidados com calos e calosidades.'
  },
  {
    title: 'Tratamento de fissuras',
    description: 'Cuidados com rachaduras nos pés.'
  },
  {
    title: 'Hidratação dos pés',
    description: 'Hidratação e cuidados com a pele.'
  },
  {
    title: 'Reflexologia podal',
    description: 'Técnica de estímulo em pontos dos pés.'
  },
  {
    title: 'Tratamento de micose',
    description: 'Atendimento e acompanhamento podológico.'
  },
  {
    title: 'Órtese ungueal',
    description: 'Procedimento para correção de curvatura da unha.'
  },
  {
    title: 'Atendimento preventivo',
    description: 'Cuidados preventivos com os pés.'
  }
];

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const procedureGrid = document.querySelector('#procedure-grid');
const whatsappIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Z"/><path d="M9 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4 0 .5l-.5.7c-.2.2-.2.4-.1.6.4.7 1.1 1.4 1.8 1.8.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .3-.2 1.2-.8 1.6-.5.4-1.1.6-1.8.4-1-.2-2.2-.8-3.5-2-1.1-1-1.9-2.3-2.1-3.2-.3-1 .2-1.9.5-2.5Z"/></svg>';

procedures.forEach((procedure, index) => {
  const card = document.createElement('article');
  card.className = 'procedure-card reveal';

  const content = document.createElement('div');
  content.className = 'procedure-content';

  const number = document.createElement('span');
  number.className = 'procedure-number';
  number.textContent = String(index + 1).padStart(2, '0');

  const title = document.createElement('h3');
  title.textContent = procedure.title;

  const description = document.createElement('p');
  description.textContent = procedure.description;

  const link = document.createElement('a');
  link.className = 'procedure-button';
  link.href = createWhatsAppUrl(`Olá! Gostaria de solicitar um orçamento para: ${procedure.title}.`);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Solicitar orçamento de ${procedure.title.toLowerCase()}`);
  link.innerHTML = `${whatsappIcon}<span>Solicitar orçamento</span>`;

  content.append(number, title, description, link);
  card.append(content);
  procedureGrid.append(card);
});

const generalQuoteLink = document.querySelector('#general-quote-link');
generalQuoteLink.href = createWhatsAppUrl('Olá! Gostaria de solicitar um orçamento.');
generalQuoteLink.setAttribute('aria-label', 'Solicitar orçamento geral pelo WhatsApp');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('is-open', !isExpanded);
  document.body.classList.toggle('menu-open', !isExpanded);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const contactForm = document.querySelector('#contact-form');
const phoneInput = document.querySelector('#phone');

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/[^\d()+\-\s]/g, '').slice(0, 20);
});

function setFieldError(field, errorElement, message) {
  errorElement.textContent = message;
  field.setAttribute('aria-invalid', String(Boolean(message)));
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#name');
  const phone = document.querySelector('#phone');
  const message = document.querySelector('#message');
  const nameError = document.querySelector('#name-error');
  const phoneError = document.querySelector('#phone-error');
  const messageError = document.querySelector('#message-error');
  const status = document.querySelector('#form-status');
  const phoneDigits = phone.value.replace(/\D/g, '');

  setFieldError(name, nameError, name.value.trim().length < 2 ? 'Informe seu nome (mínimo de 2 caracteres).' : '');
  setFieldError(phone, phoneError, phoneDigits.length < 10 || phoneDigits.length > 13 ? 'Informe um telefone válido com DDD.' : '');
  setFieldError(message, messageError, message.value.trim().length < 5 ? 'Escreva uma mensagem (mínimo de 5 caracteres).' : '');
  status.textContent = '';

  if (!contactForm.checkValidity() || name.value.trim().length < 2 || phoneDigits.length < 10 || phoneDigits.length > 13 || message.value.trim().length < 5) {
    const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const text = `Olá, meu nome é ${name.value.trim()}.\nTelefone: ${phone.value.trim()}.\nMensagem: ${message.value.trim()}`;
  const whatsappUrl = createWhatsAppUrl(text);
  const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

  if (!whatsappWindow) {
    status.textContent = 'Não foi possível abrir uma nova aba. Permita pop-ups ou fale diretamente pelo WhatsApp.';
    return;
  }

  status.textContent = 'Mensagem preparada no WhatsApp. Revise e envie por lá.';
  contactForm.reset();
  [name, phone, message].forEach((field) => field.removeAttribute('aria-invalid'));
});
