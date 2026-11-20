// Atualize este número no formato internacional, sem espaços ou símbolos.
const WHATSAPP_NUMBER = '5531997839247';
document.documentElement.classList.add('js');

// Para adicionar, copie uma linha completa; para editar, mude os textos.
// Mantenha as aspas e a vírgula. Para remover, apague a linha do procedimento.
const procedimentos = [
  ['Avaliação podológica', 'Avaliação inicial dos pés'],
  ['Corte técnico de unhas', 'Corte e cuidado das unhas'],
  ['Tratamento de unhas encravadas', 'Atendimento podológico para unhas encravadas'],
  ['Remoção de calosidades', 'Cuidados com calos e calosidades'],
  ['Tratamento de fissuras', 'Cuidados com rachaduras nos pés'],
  ['Hidratação dos pés', 'Hidratação e cuidados com a pele'],
  ['Reflexologia podal', 'Técnica de estímulo em pontos dos pés'],
  ['Tratamento de micose', 'Atendimento e acompanhamento podológico'],
  ['Órtese ungueal', 'Procedimento para correção de curvatura da unha'],
  ['Atendimento preventivo', 'Cuidados preventivos com os pés'],
];

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const procedureGrid = document.querySelector('#procedure-grid');
procedimentos.forEach(([titleText, descriptionText], index) => {
  const item = document.createElement('article');
  item.className = 'procedure-item';

  const number = document.createElement('span');
  number.className = 'procedure-number';
  number.textContent = String(index + 1).padStart(2, '0');

  const content = document.createElement('div');
  content.className = 'procedure-content';

  const title = document.createElement('h3');
  title.textContent = titleText;
  const description = document.createElement('p');
  description.textContent = descriptionText;

  content.append(title, description);
  item.append(number, content);
  procedureGrid.append(item);
});

const generalQuoteLink = document.querySelector('#general-quote-link');
generalQuoteLink.href = createWhatsAppUrl('Olá! Gostaria de solicitar um orçamento.');

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
