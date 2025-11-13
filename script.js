// 1. OBTENCIÓN DE ELEMENTOS
const cotizacionCard = document.getElementById('cotizacion');
const importacionCard = document.getElementById('importacion');
const modalCotizacion = document.getElementById('modalCotizacion');
const modalImportacion = document.getElementById('modalImportacion');
const faqBoxes = document.querySelectorAll('.faq-question-box[data-open-modal="true"]');
const faqModal = document.getElementById('faqModal');
const faqModalTitle = faqModal ? faqModal.querySelector('.modal-title-faq') : null;
const faqModalBody = faqModal ? faqModal.querySelector('.modal-body-faq') : null;
const closeButtons = document.querySelectorAll('.close-button');
const chatButton = document.getElementById('chat-button');
const chatWidget = document.getElementById('chat-widget');
const closeChatButton = document.querySelector('.close-chat');

// 2. FUNCIONES DE CONTROL DE MODALES
function openModal(modalElement) {
  modalElement.style.display = 'flex';
}

function closeModal(modalElement) {
  modalElement.style.display = 'none';
}

function openFaqModal(box) {
  const title = box.getAttribute('data-title');
  const content = box.getAttribute('data-content');
  if (faqModalTitle && faqModalBody) {
    faqModalTitle.textContent = title;
    faqModalBody.innerHTML = content;
  }
  openModal(faqModal);
}

function toggleChat() {
  chatWidget.classList.toggle('is-open');
  const isExpanded = chatWidget.classList.contains('is-open') ? 'true' : 'false';
  chatButton.setAttribute('aria-expanded', isExpanded);
}

// 3. ASIGNACIÓN DE LISTENERS
if (cotizacionCard && modalCotizacion)
  cotizacionCard.addEventListener('click', () => openModal(modalCotizacion));

if (importacionCard && modalImportacion)
  importacionCard.addEventListener('click', () => openModal(modalImportacion));

faqBoxes.forEach(box => {
  box.addEventListener('click', () => openFaqModal(box));
});

if (chatButton && chatWidget && closeChatButton) {
  chatButton.addEventListener('click', toggleChat);
  closeChatButton.addEventListener('click', toggleChat);
}

closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const modalToClose = event.target.closest('.modal');
    if (modalToClose) closeModal(modalToClose);
  });
});

window.addEventListener('click', (event) => {
  if (event.target === modalCotizacion) closeModal(modalCotizacion);
  if (event.target === modalImportacion) closeModal(modalImportacion);
  if (event.target === faqModal) closeModal(faqModal);
});

// === CARRUSEL DE CASOS DE ÉXITO (sin cálculos manuales, responsivo) ===
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".case-studies-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = container.clientWidth * 0.9;

  prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});
