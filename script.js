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
const navbar = document.querySelector('.navbar');

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

function toggleMenu() {
    menuList.classList.toggle('active');
    const isExpanded = menuList.classList.contains('active') ? 'true' : 'false';
    menuToggle.setAttribute('aria-expanded', isExpanded);
}

function closeMenuIfOpen() {
    if (menuList && menuList.classList.contains('active')) {
        toggleMenu();
    }
}

// 3. ASIGNACIÓN DE LISTENERS

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

// NAV
if (menuToggle && menuList) {
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });
    
    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenuIfOpen);
    });

    window.addEventListener('click', (event) => {
        const isMenuOpen = menuList.classList.contains('active');
        if (isMenuOpen && !menuList.contains(event.target) && event.target !== menuToggle) {
            closeMenuIfOpen();
        }
    });

    let isMobile = window.matchMedia("(max-width: 1023px)").matches;
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        if (isMobile) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && menuList.classList.contains('active')) {
                closeMenuIfOpen();
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
    }, false);
    
    window.addEventListener('resize', () => {
        isMobile = window.matchMedia("(max-width: 1023px)").matches;
        if (!isMobile && menuList.classList.contains('active')) {
             menuList.classList.remove('active');
        }
    });
}

// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === CARRUSEL ===
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

// VIDEO: overlay play, hover play, click -> modal (pausa al cerrar)
document.addEventListener("DOMContentLoaded", () => {
    const smallVideo = document.getElementById("institutional-video");
    if (!smallVideo) return;

    const wrapper = smallVideo.parentElement;
    wrapper.style.position = wrapper.style.position || "relative";
    wrapper.classList.add("has-video-overlay");

    const playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.className = "video-play-btn";
    playBtn.setAttribute("aria-label","Reproducir video");
    playBtn.innerHTML = '<svg viewBox="0 0 100 100" width="48" height="48" aria-hidden="true"><polygon points="30,20 80,50 30,80" fill="white"/></svg>';
    wrapper.appendChild(playBtn);

    smallVideo.pause();

    function showPlay() { playBtn.style.opacity = "1"; playBtn.style.pointerEvents = "auto"; }
    function hidePlay() { playBtn.style.opacity = "0"; playBtn.style.pointerEvents = "none"; }

    if (window.matchMedia("(hover: hover)").matches) {
        wrapper.addEventListener("mouseenter", () => {
            smallVideo.muted = true;
            smallVideo.play().catch(()=>{});
            hidePlay();
        });
        wrapper.addEventListener("mouseleave", () => {
            smallVideo.pause();
            showPlay();
        });
    }

    function openModalWithVideo() {
        const sources = [];
        smallVideo.querySelectorAll("source").forEach(s => { if (s.src) sources.push({src: s.src, type: s.type}); });

        const poster = smallVideo.getAttribute("poster") || "";
        const modal = document.createElement("div");
        modal.className = "video-modal";
        modal.innerHTML = '<div class="video-modal-inner"><button class="video-modal-close" aria-label="Cerrar">✕</button><div class="video-modal-stage"><video class="video-modal-player" controls playsinline></video></div></div>';
        document.body.appendChild(modal);

        const modalVideo = modal.querySelector(".video-modal-player");
        if (poster) modalVideo.poster = poster;
        sources.forEach(s => { const srcEl = document.createElement("source"); srcEl.src = s.src; if (s.type) srcEl.type = s.type; modalVideo.appendChild(srcEl); });

        document.body.style.overflow = "hidden";
        modalVideo.play().catch(()=>{});
        smallVideo.pause();

        modal.querySelector(".video-modal-close").addEventListener("click", () => {
            modalVideo.pause();
            modal.remove();
            document.body.style.overflow = "";
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modalVideo.pause();
                modal.remove();
                document.body.style.overflow = "";
            }
        });
    }

    playBtn.addEventListener("click", (e) => { e.stopPropagation(); openModalWithVideo(); });
    smallVideo.addEventListener("click", openModalWithVideo);
});
// === 4. LÓGICA DE ENVÍO ASÍNCRONO DEL FORMULARIO (AJAX/FETCH) ===
// Objetivo: Evitar que la página se recargue cuando envían la consulta.
// Importante: El FORMULARIO en HTML TIENE que tener id="contactForm"
const contactForm = document.getElementById('contactForm'); 

if (contactForm) {
    
    // Función helper para que los mensajes de estado (ok/error) aparezcan chido
    function displayStatusMessage(message, isSuccess) {
        // Primero, borro cualquier alerta anterior si existe
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertBox = document.createElement('div');
        alertBox.classList.add('form-alert');
        alertBox.textContent = message;
        
        // Estilos ultra-básicos. Mejorar esto en el CSS principal!
        alertBox.style.padding = '10px';
        alertBox.style.marginBottom = '15px';
        alertBox.style.borderRadius = '5px';
        alertBox.style.color = 'white';
        alertBox.style.backgroundColor = isSuccess ? '#4CAF50' : '#F44336'; // Verde si es OK, Rojo si falla

        // Lo inserto justo antes del form, para que se vea bien
        contactForm.insertAdjacentElement('beforebegin', alertBox);
    }

    // El listener principal: cuando el usuario hace click en 'Enviar Consulta'
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // <-- SÚPER CLAVE: Esto detiene la recarga del navegador

        const submitButton = contactForm.querySelector('.btn-submit');
        
        // Deshabilito el botón y le cambio el texto para que no hagan doble click
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Tomo los datos del formulario de forma fácil
        const formData = new FormData(contactForm);
        const data = {};
        // Lo convierto a JSON, que es lo que espera el script de PHP ahora
        formData.forEach((value, key) => (data[key] = value));

        try {
            // Hago la llamada 'Fetch' (el AJAX moderno) al archivo PHP
            const response = await fetch('send_email.php', {
                method: 'POST',
                headers: {
                    // Le aviso al servidor: "te envío datos en formato JSON"
                    'Content-Type': 'application/json' 
                },
                // Mando los datos convertidos a texto JSON
                body: JSON.stringify(data) 
            });

            // Espero la respuesta, que debería ser otro JSON
            const result = await response.json();

            // Chequeo si todo salió bien (código HTTP 200 y el flag 'success' en el JSON)
            if (response.ok && result.success) {
                displayStatusMessage(result.message, true); // Muestro el mensaje de éxito
                contactForm.reset(); // Limpio los campos del form
            } else {
                // Si la llamada fue OK pero PHP dijo que falló el envío del mail, muestro error
                const errorMessage = result.message || 'Error desconocido al procesar el envío. ¡Revisar logs del servidor!';
                displayStatusMessage(errorMessage, false);
            }

        } catch (error) {
            // Error si falló la conexión o el script PHP no se encontró
            console.error('Error de red/procesamiento:', error);
            displayStatusMessage('Error de conexión. ¿El archivo PHP está ahí?', false);
        } finally {
            // Esto se ejecuta siempre, haya éxito o error. Vuelvo a dejar el botón usable
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Consulta';
        }
    });
}