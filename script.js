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

// ELEMENTOS DE NAVEGACIÓN
const menuToggle = document.getElementById('menu-toggle');
const menuList = document.querySelector('.menu-list');

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

// FUNCIÓN DE CONTROL DE NAVEGACIÓN
function toggleMenu() {
    menuList.classList.toggle('active');
    // Actualiza el estado de accesibilidad
    const isExpanded = menuList.classList.contains('active') ? 'true' : 'false';
    menuToggle.setAttribute('aria-expanded', isExpanded);
}

// FUNCIÓN PARA CERRAR EL MENÚ SI ESTÁ ABIERTO
function closeMenuIfOpen() {
    if (menuList && menuList.classList.contains('active')) {
        toggleMenu();
    }
}


// 3. ASIGNACIÓN DE LISTENERS

// LISTENERS DE MODALES Y CHAT (Sin cambios en esta sección)
if (cotizacionCard && modalCotizacion) {
    cotizacionCard.addEventListener('click', () => openModal(modalCotizacion));
}
if (importacionCard && modalImportacion) {
    importacionCard.addEventListener('click', () => openModal(modalImportacion));
}
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


// LISTENERS DE NAVEGACIÓN
if (menuToggle && menuList) {
    // 1. Abre/Cierra el menú al hacer clic en el botón hamburguesa
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que se dispare el evento 'click' del window inmediatamente
        toggleMenu();
    });
    
    // 2. Cierra el menú cuando se hace clic en un enlace
    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenuIfOpen);
    });

    // 3. CIERRE AL HACER CLIC FUERA DEL MENÚ (Nuevo)
    window.addEventListener('click', (event) => {
        const isMenuOpen = menuList.classList.contains('active');
        // Si el menú está abierto Y el clic no fue dentro del menú o el botón
        if (isMenuOpen && !menuList.contains(event.target) && event.target !== menuToggle) {
            closeMenuIfOpen();
        }
    });

    // 4. CIERRE AL HACER SCROLL (Nuevo)
    let isMobile = window.matchMedia("(max-width: 1023px)").matches;
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        // Solo cerramos si estamos en vista móvil
        if (isMobile) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Si el scroll es hacia abajo y el menú está abierto
            if (scrollTop > lastScrollTop && menuList.classList.contains('active')) {
                closeMenuIfOpen();
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para iOS y otros
        }
    }, false);
    
    // Actualizar 'isMobile' en redimensionamiento para optimizar el listener de scroll
    window.addEventListener('resize', () => {
        isMobile = window.matchMedia("(max-width: 1023px)").matches;
        // Si se pasa a desktop, asegurarse de que el menú no tenga la clase 'active' para evitar conflictos
        if (!isMobile && menuList.classList.contains('active')) {
             menuList.classList.remove('active');
        }
    });
}


// === CARRUSEL DE CASOS DE ÉXITO (sin cálculos manuales, responsivo) ===
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".case-studies-container");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (!container || !prevBtn || !nextBtn) return;

    // Ajusta el desplazamiento para que sea el ancho visible del carrusel
    const scrollAmount = container.clientWidth * 0.9;

    prevBtn.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
});