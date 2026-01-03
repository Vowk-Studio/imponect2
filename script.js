// =========================================================================
// 1. OBTENCIÓN DE ELEMENTOS Y VARIABLES GLOBALES
// =========================================================================
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


// =========================================================================
// 2. FUNCIONES DE CONTROL DE MODALES
// =========================================================================
function openModal(modalElement) {
    if(!modalElement) return;
    modalElement.style.display = 'flex';
}

function closeModal(modalElement) {
    if(!modalElement) return;
    modalElement.style.display = 'none';
}

function openFaqModal(box) {
    const title = box.getAttribute('data-title');
    const content = box.getAttribute('data-content');
    if (faqModalTitle && faqModalBody) {
        faqModalTitle.textContent = title;
        faqModalBody.innerHTML = content; 
        openModal(faqModal);
    }
}


// =========================================================================
// 3. EVENT LISTENERS (Interacciones del usuario)
// =========================================================================

// Modales principales (Cards de Servicios)
if (cotizacionCard) {
    cotizacionCard.addEventListener('click', () => openModal(modalCotizacion));
}
if (importacionCard) {
    importacionCard.addEventListener('click', () => openModal(modalImportacion));
}

// FAQ Modales
faqBoxes.forEach(box => {
    box.addEventListener('click', () => openFaqModal(box));
});

// Cerrar modales (Botón X)
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        closeModal(modal);
    });
});

// Cerrar al hacer click fuera del contenido (Overlay oscuro)
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target);
    }
});

// Chat Widget
if (chatButton && chatWidget) {
    chatButton.addEventListener('click', () => {
        const isVisible = chatWidget.style.display === 'block';
        chatWidget.style.display = isVisible ? 'none' : 'block';
    });
}

if (closeChatButton && chatWidget) {
    closeChatButton.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });
}


// =========================================================================
// 4. LÓGICA DE FORMULARIO DE CONTACTO (CORREGIDA Y ANIMADA)
// =========================================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // 1. ACTIVAR ANIMACIÓN DE CARGA (CSS)
        // Agregamos la clase que convierte el botón en barra de progreso
        submitButton.classList.add('btn-loading');
        submitButton.disabled = true;

        // Función auxiliar para alertas
        const displayStatusMessage = (message, isSuccess) => {
            let statusMsg = contactForm.querySelector('.status-message');
            if (!statusMsg) {
                statusMsg = document.createElement('div');
                statusMsg.className = 'status-message';
                statusMsg.style.marginTop = '15px';
                statusMsg.style.fontWeight = 'bold';
                statusMsg.style.padding = '10px';
                statusMsg.style.borderRadius = '8px';
                statusMsg.style.textAlign = 'center';
                contactForm.appendChild(statusMsg);
            }
            statusMsg.textContent = message;
            statusMsg.style.backgroundColor = isSuccess ? '#d4edda' : '#f8d7da';
            statusMsg.style.color = isSuccess ? '#155724' : '#721c24';
            statusMsg.style.border = isSuccess ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
            
            setTimeout(() => {
                statusMsg.remove();
            }, 5000);
        };

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            // CORRECCIÓN AQUÍ: Usamos 'send_email.php' (como en el script original)
            const response = await fetch('send_email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data) 
            });

            const result = await response.json();

            if (response.ok && result.success) {
                displayStatusMessage(result.message, true);
                contactForm.reset(); 
            } else {
                const errorMessage = result.message || 'Error desconocido.';
                displayStatusMessage(errorMessage, false);
            }

        } catch (error) {
            console.error('Error:', error);
            displayStatusMessage('Error de conexión. Verifica send_email.php', false);
        } finally {
            // 2. DESACTIVAR ANIMACIÓN DE CARGA
            // Quitamos la clase para que el botón vuelva a la normalidad
            submitButton.classList.remove('btn-loading');
            submitButton.disabled = false;
        }
    });
}


// =========================================================================
// 5. NAVBAR STICKY
// =========================================================================
(function() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('#home') || document.querySelector('.hero-section');

    if (!navbar || !hero) return;

    function updateNavbarState() {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const navbarHeight = navbar.getBoundingClientRect().height;
        
        if (heroBottom <= navbarHeight + 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', () => requestAnimationFrame(updateNavbarState));
    window.addEventListener('resize', () => requestAnimationFrame(updateNavbarState));
    document.addEventListener('DOMContentLoaded', updateNavbarState);
    updateNavbarState();
})();


// =========================================================================
// 6. MOTOR DE ANIMACIONES SCROLL
// =========================================================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const selectorsToAnimate = [
        '.section-title', 
        '.section-title-nos', 
        '.section-title-productos', 
        '.section-title-reseñas', 
        '.section-title-faq', 
        '.section-title-exclusivos',
        '.section-subtitle',
        '.about-text',        
        '.about-header-content',
        '.card-text-area',
        '.exclusive-desc',
        '.service-card',
        '.video-container',        
        '.contact-form-container', 
        '.map-container',          
        '.product-item',
        '.case-card',
        '.faq-question-box',
        '.team-member',
        '.exclusive-item',
        '.footer-content-container',
        '.footer-bottom'
    ];

    selectorsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((el, index) => {
            el.classList.add('reveal-up');

            const isGridItem = el.matches('.service-card, .product-item, .case-card, .team-member, .exclusive-item, .faq-question-box');
            
            if (isGridItem) {
                const delay = (index % 3) * 150; 
                el.style.transitionDelay = `${delay}ms`;
            } else if (el.matches('.contact-form-container, .video-container')) {
                el.style.transitionDelay = '200ms';
            }

            observer.observe(el);
        });
    });

    // Animación Hero
    const heroTitle = document.querySelector('.main-title');
    const heroSubtitle = document.querySelector('.subtitle');
    const heroLogo = document.querySelector('.hero-logo');

    if(heroLogo) {
        heroLogo.classList.add('simple-fade'); 
        observer.observe(heroLogo);
    }
    
    if(heroTitle) {
        heroTitle.classList.add('reveal-up'); 
        heroTitle.style.transitionDelay = '300ms';
        observer.observe(heroTitle);
    }
    
    if(heroSubtitle) {
        heroSubtitle.classList.add('reveal-up');
        heroSubtitle.style.transitionDelay = '600ms';
        observer.observe(heroSubtitle);
    }
}

// ==========================================
// 7. CERRAR MODALES CON TECLA ESC
// ==========================================
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal');
        openModals.forEach(modal => {
            if (modal.style.display === 'flex') {
                closeModal(modal);
            }
        });
    }
});

// ==========================================
// 8. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL) - VERSIÓN NATIVA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Buscamos todos los enlaces del menú
    const menuLinks = document.querySelectorAll('.menu-list a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Solo actuamos si es un enlace interno
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault(); // Detenemos el salto brusco

                    // Usamos la función nativa del navegador
                    // 'start' hace que el elemento se alinee arriba.
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Si el menú móvil está abierto, lo cerramos
                    if (document.querySelector('.menu-list').classList.contains('active')) {
                        toggleMenu(); 
                    }
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', initAnimations);
window.addEventListener('load', initAnimations);
