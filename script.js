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
const menuToggleBaseColor = '#041E32';
const menuToggleActiveColor = '#00ADEF';
const deferredFontStylesheet = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Rajdhani:wght@600;700;800&family=Roboto:wght@400;700;900&family=Sora:wght@400;600;700;800;900&display=swap';
const deferredIconStylesheet = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
const deferredExternalStylesheets = [deferredFontStylesheet, deferredIconStylesheet];

function loadStylesheet(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

window.addEventListener('load', () => {
    const loadDeferredExternalStyles = () => {
        deferredExternalStylesheets.forEach(loadStylesheet);
        fontEvents.forEach(eventName => window.removeEventListener(eventName, loadDeferredExternalStyles));
    };
    const fontEvents = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    fontEvents.forEach(eventName => window.addEventListener(eventName, loadDeferredExternalStyles, { once: true, passive: true }));
    setTimeout(loadDeferredExternalStyles, 10000);
});

function setMobileMenuState(isOpen) {
    if (!menuToggle || !menuList) return;
    menuList.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
    menuToggle.style.color = isOpen ? menuToggleActiveColor : menuToggleBaseColor;
    menuToggle.style.transform = isOpen ? 'scaleY(1)' : 'scaleY(0.8)';
}

function toggleMenu() {
    if (!menuList) return;
    setMobileMenuState(!menuList.classList.contains('active'));
}

function closeMobileMenu() {
    setMobileMenuState(false);
}


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

// MODIFICADO PARA SOPORTAR TRADUCCIÓN
function openFaqModal(box) {
    // Obtenemos el ID de la pregunta
    const faqId = box.getAttribute('data-faq-id');
    const currentLang = localStorage.getItem('imponect_lang') || 'es';
    
    // Buscamos los textos en el diccionario global 'translations' (definido abajo)
    // Si no existe la traducción, usamos un fallback
    const title = translations[currentLang][faqId] || "Pregunta"; 
    const content = translations[currentLang][faqId + '_content'] || "Contenido no disponible.";

    if (faqModalTitle && faqModalBody) {
        faqModalTitle.innerHTML = title; // innerHTML por si hay formatos
        faqModalBody.innerHTML = content; 
        openModal(faqModal);
    }
}


// =========================================================================
// 3. EVENT LISTENERS
// =========================================================================

if (cotizacionCard) cotizacionCard.addEventListener('click', () => openModal(modalCotizacion));
if (importacionCard) importacionCard.addEventListener('click', () => openModal(modalImportacion));

faqBoxes.forEach(box => {
    box.addEventListener('click', () => openFaqModal(box));
});

closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        closeModal(e.target.closest('.modal'));
    });
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target);
    }
});


// =========================================================================
// CHAT WIDGET
// =========================================================================
function toggleChat() {
    if (!chatWidget) return;
    chatWidget.classList.toggle('is-open'); 
    if (chatButton) {
        const isExpanded = chatWidget.classList.contains('is-open') ? 'true' : 'false';
        chatButton.setAttribute('aria-expanded', isExpanded);
    }
}

if (chatButton && chatWidget) chatButton.addEventListener('click', toggleChat);
if (closeChatButton) closeChatButton.addEventListener('click', toggleChat);
if (menuToggle && menuList) menuToggle.addEventListener('click', toggleMenu);


// =========================================================================
// ... (previous code) ...
// =========================================================================

// --- NUEVO: MODAL DE PRODUCTO Y CARRUSEL ---

function createProductModal() {
    if (document.getElementById('modalProduct')) return;
    
    const modal = document.createElement('div');
    modal.id = 'modalProduct';
    modal.className = 'modal modal-product'; 
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-button">&times;</button>
            
            <div class="modal-product-header">
                <div class="product-carousel" id="productCarousel">
                    <!-- Imágenes inyectadas aquí -->
                </div>
            </div>

            <div class="modal-product-body">
                <span class="product-category-badge" id="prodBadge"></span>
                <h3 class="product-title" id="prodTitle"></h3>
                <p class="product-description-large" id="prodDescLarge"></p>
                
                <div class="product-info-grid">
                    <div class="info-column">
                        <h4 class="info-section-title"><i class="fas fa-bullseye"></i> Casos de Uso</h4>
                        <ul class="use-cases-list" id="prodUseCases">
                            <!-- Casos de uso inyectados -->
                        </ul>
                    </div>
                    <div class="info-column">
                        <h4 class="info-section-title"><i class="fas fa-microchip"></i> Especificaciones Técnicas</h4>
                        <div class="tech-specs-text" id="prodSpecsDetail">
                            <!-- Detalles técnicos inyectados -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-product-footer">
                <a href="#" id="waLink" target="_blank" class="btn-modal-action">
                    <i class="fab fa-whatsapp"></i> Contactar a un asesor
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'none';
    
    modal.querySelector('.close-button').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(modal); });
}

window.openProductModal = function(productId) {
    createProductModal();
    const product = productos.find(p => p.id === productId);
    if (!product) return;

    const lang = localStorage.getItem('imponect_lang') || 'es';
    const carousel = document.getElementById('productCarousel');
    
    // Rutas de imágenes (usamos la misma lógica que el catálogo)
    const rutaImagenes = 'assets/catalog_images/optimized/';
    const rutaImagenesFallback = 'assets/catalog_images/';
    const imagenFinal = rutaImagenes + product.imagen.replace(/\.[^.]+$/, '.webp');
    const imagenFallback = rutaImagenesFallback + product.imagen;

    // Simulación de varias imágenes (puedes añadir más a data.js si las tienes)
    const images = [imagenFinal, imagenFinal]; 
    carousel.innerHTML = images.map((img, i) => `
        <img src="${img}" class="carousel-image ${i === 0 ? 'active' : ''}" 
             onerror="this.onerror=null;this.src='${imagenFallback}'" alt="Product">
    `).join('') + `
        <button class="carousel-arrow carousel-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="carousel-arrow carousel-next"><i class="fas fa-chevron-right"></i></button>
    `;

    // Poblar datos básicos
    document.getElementById('prodBadge').textContent = lang === 'es' ? product.categoria_es : product.categoria_en;
    document.getElementById('prodTitle').textContent = lang === 'es' ? product.nombre_es : product.nombre_en;
    document.getElementById('prodDescLarge').textContent = lang === 'es' ? product.descripcion_es : product.descripcion_en;
    
    // Poblar Casos de Uso
    const useCases = lang === 'es' ? (product.casos_uso_es || []) : (product.casos_uso_en || []);
    const useCasesContainer = document.getElementById('prodUseCases');
    useCasesContainer.innerHTML = useCases.map(item => `<li>${item}</li>`).join('');
    if (useCases.length === 0) useCasesContainer.innerHTML = '<li>Consulte para más detalles</li>';

    // Poblar Detalles Técnicos
    const details = lang === 'es' ? (product.detalles_es || product.specs_es) : (product.detalles_en || product.specs_en);
    document.getElementById('prodSpecsDetail').textContent = details;

    // WhatsApp Link
    const waText = lang === 'es' 
        ? `Hola, me interesa obtener más información sobre el producto: ${product.nombre_es}`
        : `Hello, I'm interested in getting more information about the product: ${product.nombre_en}`;
    document.getElementById('waLink').href = `https://wa.me/543564369474?text=${encodeURIComponent(waText)}`;

    openModal(document.getElementById('modalProduct'));
    
    // Lógica básica de carrusel
    let currentIndex = 0;
    const slides = carousel.querySelectorAll('.carousel-image');
    if (slides.length > 1) {
        carousel.querySelector('.carousel-prev').onclick = () => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            slides[currentIndex].classList.add('active');
        };
        carousel.querySelector('.carousel-next').onclick = () => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        };
    } else {
        carousel.querySelectorAll('.carousel-arrow').forEach(a => a.style.display = 'none');
    }
}
// =========================================================================
// 4. FORMULARIO DE CONTACTO
// =========================================================================
// ... (rest of the file)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.classList.add('btn-loading');
        submitButton.disabled = true;

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
            setTimeout(() => statusMsg.remove(), 5000);
        };

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
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
                displayStatusMessage(result.message || 'Error desconocido.', false);
            }
        } catch (error) {
            console.error('Error:', error);
            displayStatusMessage('Error de conexión. Verifica send_email.php', false);
        } finally {
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
let animationsInitialized = false;

function initAnimations() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    const selectorsToAnimate = [
        '.section-title', '.section-title-nos', '.section-title-productos',
        '.section-title-reseñas', '.section-title-faq', '.section-title-exclusivos',
        '.section-subtitle', '.about-text', '.about-header-content', '.card-text-area',
        '.exclusive-desc', '.service-card', '.video-container', '.contact-form-container',
        '.map-container', '.product-item', '.case-card', '.faq-question-box',
        '.team-member', '.team-card', '.exclusive-item', '.footer-content-container', '.footer-bottom'
    ];

    if (!('IntersectionObserver' in window)) {
        selectorsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.classList.add('active'));
        });
        return;
    }

    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

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

}


// =========================================================================
// 7, 8, 9. UTILIDADES (Esc, Smooth Scroll, Chat Logic)
// =========================================================================
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal');
        openModals.forEach(modal => { if (modal.style.display === 'flex') closeModal(modal); });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu-list a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    closeMobileMenu();
                }
            }
        });
    });
    initAnimations();
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.case-studies-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!container || !prevBtn || !nextBtn) return;

    const updateArrows = () => {
        const scrollLeft = Math.ceil(container.scrollLeft);
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        prevBtn.classList.toggle('hidden-arrow', scrollLeft <= 10);
        nextBtn.classList.toggle('hidden-arrow', scrollLeft + clientWidth >= scrollWidth - 10);
    };

    container.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);

    prevBtn.addEventListener('click', () => { container.scrollBy({ left: -320, behavior: 'smooth' }); });
    nextBtn.addEventListener('click', () => { container.scrollBy({ left: 320, behavior: 'smooth' }); });

    updateArrows();
});

document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth < 1024 && !this.classList.contains('active-mobile')) {
                e.preventDefault();
                productItems.forEach(otherItem => {
                    otherItem.classList.remove('active-mobile');
                });
                this.classList.add('active-mobile');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024 && !e.target.closest('.product-item')) {
            productItems.forEach(item => {
                item.classList.remove('active-mobile');
            });
        }
    });
});

// Chat Logic
document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const N8N_WEBHOOK_URL = 'https://nicoelicecheg97.app.n8n.cloud/webhook/chat-imponect';

    // --- NUEVO: FUNCIÓN PARA GESTIONAR EL ID DE SESIÓN ---
    function getSessionId() {
        let sessionId = localStorage.getItem('imponect_chat_session');
        if (!sessionId) {
            // Generamos un ID único (ej: user_ky84jf9_167234)
            sessionId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
            localStorage.setItem('imponect_chat_session', sessionId);
        }
        return sessionId;
    }
    // -----------------------------------------------------

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('chat-message', sender);
        const p = document.createElement('p');
        p.textContent = text;
        const timeSpan = document.createElement('span');
        timeSpan.classList.add('time');
        const now = new Date();
        timeSpan.textContent = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
        div.appendChild(p);
        div.appendChild(timeSpan);
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        if(document.getElementById('typingIndicator')) return;
        const div = document.createElement('div');
        div.classList.add('chat-message', 'bot');
        div.id = 'typingIndicator';
        div.innerHTML = '<p>Pensando... <i class="fas fa-circle-notch fa-spin"></i></p>';
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const userMessage = chatInput.value.trim();
            if (!userMessage) return;

            appendMessage(userMessage, 'user');
            chatInput.value = '';
            chatInput.style.height = 'auto';
            showTypingIndicator();

            // --- NUEVO: OBTENEMOS EL ID ANTES DE ENVIAR ---
            const currentSessionId = getSessionId();
            // ----------------------------------------------

            try {
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: userMessage,
                        sessionId: currentSessionId // <--- AQUÍ ESTÁ LA MAGIA
                    })
                });
                const data = await response.json();
                removeTypingIndicator();
                
                // Usamos mensaje_usuario si viene del flujo con parser, o output si es directo
                const botReply = data.output || data.mensaje_usuario || "Gracias por tu mensaje. Un asesor revisará tu consulta.";
                
                appendMessage(botReply, 'bot');
            } catch (error) {
                console.error('Error de conexión:', error);
                removeTypingIndicator();
                // Opcional: Mostrar error en el chat
            }
        });

        // ... (resto de tus listeners de enter e input siguen igual) ...
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatForm.dispatchEvent(new Event('submit'));
            }
        });
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            if(this.value === '') this.style.height = 'auto';
        });
    }
});

// =========================================================================
// 10. MULTILENGUAJE (TRADUCCIÓN ES/EN) - GLOBAL DEFINITION
// =========================================================================
// Definimos la variable fuera para que openFaqModal pueda acceder
let translations = {}; 

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const langTexts = document.querySelectorAll('.lang-text');
    
    // --- 1. DICCIONARIO DE TRADUCCIONES COMPLETO ---
    translations = {
        es: {
            // NAVBAR & HERO
            nav_home: "Home", nav_services: "Servicios", nav_products: "Productos",
            nav_exclusive: "Exclusivos", nav_about: "Nosotros", nav_faq: "FAQ", nav_contact: "Contacto",
            hero_title: "IMPORTÁ DESDE<br class=\"hero-mobile-break\"> CUALQUIER<br> PARTE DEL MUNDO",
            hero_subtitle: "Comprá lo que tu negocio<br class=\"hero-subtitle-break\"> necesita al menor precio<br class=\"hero-subtitle-break\"> con la gestión de Imponect.",
            
            // SERVICIOS
            sec_services: "SERVICIOS",
            sec_services_phrase: "Traemos cualquier producto que tu negocio necesite.",
            serv_cotizacion: "Búsqueda y Cotización",
            serv_cotizacion_desc: "Evitá perder tiempo y dinero en proveedores dudosos. Nosotros buscamos, verificamos y negociamos por vos.",
            serv_importacion: "Importación",
            serv_importacion_desc: "Nos ocupamos de todo: desde retirar tu carga en la fábrica hasta entregarla nacionalizada en tu negocio.",
            
            // FORM
            form_title: "CONSULTAS",
            form_subtitle: "Dejanos tu consulta acá,<br> te responderemos a la brevedad.",
            btn_submit: "Enviar Consulta",
            btn_chat_rep: "Hablar con un representante",
            
            // PRODUCTOS (Generales)
            sec_products_title: "Algunos de nuestros productos innovadores<br>para el mercado argentino.",
            btn_catalog_main: "Ver el catálogo completo",
            btn_view_catalog: "Ver Catálogo",
            btn_datasheet: "Ficha Técnica",
            btn_stock: "Consultar Stock",

            // --- TARJETAS DE PRODUCTOS (Detalles) ---
            prod_camara_name: "Cámara Endoscópica",
            prod_camara_len: "Largo:",
            prod_inflador_name: "Inflador Portátil",
            prod_inflador_desc: "Descripción:",
            prod_inflador_charge: "Carga celular",
            prod_inflador_light: "Linterna LED",
            prod_vincha_name: "Vincha Led",
            prod_vincha_colors: "LEDs de 3 Colores:",
            prod_vincha_white: "Blanco",
            prod_vincha_yellow: "Amarillo",
            prod_vincha_red: "Rojo",
            prod_vincha_side: "Linterna LED lateral.",
            prod_vincha_sensor: "Sensor de proximidad",
            prod_vincha_reg: "Regulable",
            prod_chaleco_name: "Chaleco LED",
            prod_chaleco_colors_title: "Colores de Chaleco:",
            prod_chaleco_green: "Verde",
            prod_chaleco_blue_light: "Celeste",
            prod_chaleco_pink: "Rosa",
            prod_chaleco_red: "Rojo",
            prod_chaleco_blue: "Azul",
            prod_chaleco_bat: "Batería interna recargable <br>con cargadores USB-A / USB-C",

            // EXCLUSIVOS
            sec_exclusive_title: "Exclusivos IMPONECT",
            sec_exclusive_subtitle: "Somos representantes oficiales de marcas únicas en Argentina.",
            btn_catalog_exclusive: "Ver el catálogo exclusivo",
            btn_detail: "View Detail",
            // Kneel-It
            ex_kneelit_desc: "Soporte ergonómico para trabajar de rodillas.",
            ex_kneelit_f1: "Protección articular",
            ex_kneelit_f2: "Ajuste personalizado",
            ex_kneelit_f3: "Facilita el trabajo a nivel del suelo",
            // Kneaze
            ex_kneaze_desc: "Movilidad estable y reducción de tensión.",
            ex_kneaze_f1: "Ajuste biométrico",
            ex_kneaze_f2: "Máxima estabilidad",
            ex_kneaze_f3: "Reduce la tensión articular",

            // ABOUT & REVIEWS
            sec_about_title: "SOBRE NOSOTROS",
            about_quote: '"Somos un equipo apasionado por la transparencia. Nacimos para conectar negocios <span class="highlight-arg">ARGENTINOS</span> con el mundo, brindando confianza y visibilidad del proceso."',
            team_role_cofounder: "Co-Fundador",
            sec_reviews_title: "CASOS DE ÉXITO",
            sec_reviews_subtitle: "Historias reales, resultados reales",
            footer_social_title: "NUESTRAS REDES",
            
            // FOOTER SLOGAN
            footer_slogan: "IMPONECT - Tu socio estratégico en importaciones globales",

            // --- MODALES (Popups) ---
            // Cotización
            modal_cot_title: "Búsqueda y Cotización",
            modal_subtitle_incl: "Incluye:",
            modal_cot_l1: "Búsqueda de proveedores confiables.",
            modal_cot_l2: "Verificación de certificaciones de gestión del proveedor y reseñas.",
            modal_cot_l3: "Verificación de certificaciones del producto para asegurar que cumple las normas argentinas.",
            modal_cot_l4: "Negociación del mejor precio.",
            modal_cot_l5: "Cotización de envío marítimo/aéreo + Tributación aduanera + Despacho a dirección declarada.",
            modal_subtitle_extra: "Extra (Opcional - a cargo del cliente):",
            modal_cot_e1: "Control de calidad sobre una muestra.",
            modal_cot_e2: "Fotos, videos y reunión en vivo (Meet) con nuestra agente en China en español.",
            btn_modal_req: "Solicitar Presupuesto",
            
            // Importación
            modal_imp_title: "Importación",
            modal_imp_l1: "Retiro (pickup) en fábrica y consolidación en despacho (warehouse).",
            modal_imp_l2: "Intervenciones especiales necesarias (por ciertas regulaciones).",
            modal_imp_l3: "Exportación marítima o aérea hacia Argentina.",
            modal_imp_l4: "Tributación aduanera y nacionalización de los bienes en aduana Argentina.",
            modal_imp_l5: "Entrega directa a domicilio declarado.",

            // FAQ (Títulos y Contenidos)
            sec_faq_title: "PREGUNTAS FRECUENTES",
            btn_faq_custom: "Hacer una Consulta Personalizada",
            
            faq_1: "¿Qué productos no puedo importar a argentina?",
            faq_1_content: "Por lo general, casi todos los productos pueden ser importados, a menos que haya alguna ley que puntualmente lo prohíba (ej: vehículos usados). Para productos no restringidos, mientras se cumplan los requisitos (como certificaciones eléctricas o de salud), pueden importarse sin problemas.",
            
            faq_2: "¿Qué pasa si mi proveedor no tiene certificaciones?",
            faq_2_content: "Las certificaciones son claves para asegurar calidad y evitar retenciones en aduana. Si tu proveedor no las tiene, advertimos el riesgo. Nosotros verificamos tanto certificaciones de producto como de gestión de fábrica.",
            
            faq_3: "¿Cuánto tarda en promedio un envío marítimo y uno aéreo?",
            faq_3_content: "Un envío <strong>marítimo</strong> desde Asia suele tardar <strong>45-60 días</strong>. Un envío <strong>aéreo</strong> es mucho más rápido, entre <strong>7-15 días</strong>. Estos tiempos incluyen tránsito y trámites.",
            
            faq_4: "¿Puedo pagar en pesos argentinos?",
            faq_4_content: "Sí, aceptamos diversos medios de pagos, incluyendo pesos argentinos a la tasa de cambio vigente al momento de la transacción.",
            
            faq_5: "¿Qué garantía tengo sobre mis productos?",
            faq_5_content: "La garantía depende del proveedor original. Nosotros garantizamos la diligencia en el proceso de importación y ofrecemos inspecciones de calidad previas y seguros de carga.",
            
            faq_6: "¿Cuánto demora tener una cotización?",
            faq_6_content: "Entre <strong>1 y 2 semanas</strong>, dependiendo de la rapidez de respuesta de proveedores y agentes aduaneros.",
            
            faq_7: "¿Necesito ser monotributista, responsable inscripto o tener empresa?",
            faq_7_content: "No es estrictamente necesario. Nosotros gestionamos la importación y facturamos a tu nombre. Sin embargo, para volúmenes grandes, recomendamos asesoría contable.",
        
            // CHAT WIDGET
            chat_header_title: "Asistente de IMPONECT",
            chat_status_online: "En línea",
            chat_welcome_msg: "¡Hola! 👋 Bienvenido a Imponect. <br>¿En qué podemos innovar juntos hoy?",
            chat_time_now: "Justo ahora",
            chat_placeholder: "Escribe tu consulta..."
        },
        en: {
            // NAVBAR & HERO
            nav_home: "Home", nav_services: "Services", nav_products: "Products",
            nav_exclusive: "Exclusive", nav_about: "About Us", nav_faq: "FAQ", nav_contact: "Contact",
            hero_title: "IMPORT FROM<br class=\"hero-mobile-break\"> ANYWHERE<br> IN THE WORLD",
            hero_subtitle: "Buy what your business needs<br class=\"hero-subtitle-break\"> at the lowest price<br class=\"hero-subtitle-break\"> with Imponect's management.",
            
            // SERVICES
            sec_services: "SERVICES",
            sec_services_phrase: "We source any product your business needs.",
            serv_cotizacion: "Research andQuotation",
            serv_cotizacion_desc: "Avoid wasting time and money on doubtful suppliers. We search, verify, and negotiate for you.",
            serv_importacion: "Import",
            serv_importacion_desc: "We take care of everything: from factory pickup to delivery at your business door.",
            
            // FORM
            form_title: "INQUIRIES",
            form_subtitle: "Leave your inquiry here,<br> we will reply shortly.",
            btn_submit: "Send Inquiry",
            btn_chat_rep: "Talk to a representative",
            
            // PRODUCTS (General)
            sec_products_title: "Some of our innovative products<br>for the Argentine market.",
            btn_catalog_main: "View full catalog",
            btn_view_catalog: "View Catalog",
            btn_datasheet: "Datasheet",
            btn_stock: "Check Stock",

            // --- PRODUCT CARDS (Details) ---
            prod_camara_name: "Endoscopic Camera",
            prod_camara_len: "Length:",
            prod_inflador_name: "Portable Tire Inflator",
            prod_inflador_desc: "Description:",
            prod_inflador_charge: "Phone charging",
            prod_inflador_light: "LED Flashlight",
            prod_vincha_name: "LED Headband",
            prod_vincha_colors: "3 Color LEDs:",
            prod_vincha_white: "White",
            prod_vincha_yellow: "Yellow",
            prod_vincha_red: "Red",
            prod_vincha_side: "Side LED flashlight.",
            prod_vincha_sensor: "Proximity sensor",
            prod_vincha_reg: "Adjustable",
            prod_chaleco_name: "LED Vest",
            prod_chaleco_colors_title: "Vest Colors:",
            prod_chaleco_green: "Green",
            prod_chaleco_blue_light: "Light Blue",
            prod_chaleco_pink: "Pink",
            prod_chaleco_red: "Red",
            prod_chaleco_blue: "Blue",
            prod_chaleco_bat: "Internal rechargeable battery <br>with USB-A / USB-C chargers",

            // EXCLUSIVE
            sec_exclusive_title: "IMPONECT Exclusives",
            sec_exclusive_subtitle: "We are official representatives of unique brands in Argentina.",
            btn_catalog_exclusive: "View exclusive catalog",
            btn_detail: "View Detail",
            // Kneel-It
            ex_kneelit_desc: "Ergonomic support for kneeling work.",
            ex_kneelit_f1: "Joint protection",
            ex_kneelit_f2: "Custom fit",
            ex_kneelit_f3: "Facilitates ground-level work",
            // Kneaze
            ex_kneaze_desc: "Stable mobility and tension reduction.",
            ex_kneaze_f1: "Biometric fit",
            ex_kneaze_f2: "Maximum stability",
            ex_kneaze_f3: "Reduces joint tension",
            
            // ABOUT & REVIEWS
            sec_about_title: "ABOUT US",
            about_quote: '"We are a team passionate about transparency. We were born to connect <span class="highlight-arg">ARGENTINE</span> businesses with the world, providing trust and visibility of the process."',
            team_role_cofounder: "Co-Founder",
            sec_reviews_title: "SUCCESS STORIES",
            sec_reviews_subtitle: "Real stories, real results",
            footer_social_title: "SOCIAL MEDIA",
            
            // FOOTER SLOGAN
            footer_slogan: "IMPONECT - Your strategic partner in global imports.",

            // --- MODALES (Popups) ---
            // Cotización
            modal_cot_title: "Research and Quotation",
            modal_subtitle_incl: "Includes:",
            modal_cot_l1: "Search for reliable suppliers.",
            modal_cot_l2: "Verification of supplier management certifications and reviews.",
            modal_cot_l3: "Verification of product certifications to ensure compliance with Argentine standards.",
            modal_cot_l4: "Negotiation of the best price.",
            modal_cot_l5: "Quote for sea/air shipping + Customs taxation + Delivery to declared address.",
            modal_subtitle_extra: "Extra (Optional - paid by client):",
            modal_cot_e1: "Quality control on a sample.",
            modal_cot_e2: "Photos, videos, and live meeting (Meet) with our agent in China (in Spanish).",
            btn_modal_req: "Request Quote",

            // Importación
            modal_imp_title: "Import",
            modal_imp_l1: "Factory pickup and consolidation in warehouse.",
            modal_imp_l2: "Special interventions required (due to specific regulations).",
            modal_imp_l3: "Maritime or air export to Argentina.",
            modal_imp_l4: "Customs taxation and nationalization of goods in Argentine customs.",
            modal_imp_l5: "Direct delivery to declared address.",

            // FAQ
            sec_faq_title: "FREQUENTLY ASKED QUESTIONS",
            btn_faq_custom: "Make a Custom Inquiry",

            faq_1: "What products cannot be imported to Argentina?",
            faq_1_content: "Generally, almost all products can be imported unless a law specifically prohibits it (e.g., used vehicles). For non-restricted products, as long as requirements (such as electrical or health certifications) are met, they can be imported without issues.",
            
            faq_2: "What if my supplier has no certifications?",
            faq_2_content: "Certifications are key to ensuring quality and avoiding customs delays. If your supplier lacks them, we warn of the risk. We verify both product and factory management certifications.",
            
            faq_3: "What is the average time for sea and air shipping?",
            faq_3_content: "A <strong>sea shipment</strong> from Asia usually takes <strong>45-60 days</strong>. An <strong>air shipment</strong> is much faster, between <strong>7-15 days</strong>. These times include transit and paperwork.",
            
            faq_4: "Can I pay in Argentine Pesos?",
            faq_4_content: "Yes, we accept various payment methods, including Argentine pesos at the exchange rate current at the time of the transaction.",
            
            faq_5: "What warranty do I have on my products?",
            faq_5_content: "Warranty depends on the original supplier. We guarantee diligence in the import process and offer pre-shipment quality inspections and cargo insurance.",
            
            faq_6: "How long does it take to get a quote?",
            faq_6_content: "Between <strong>1 and 2 weeks</strong>, depending on the response speed of suppliers and customs agents.",
            
            faq_7: "Do I need to be a registered company?",
            faq_7_content: "It is not strictly necessary. We manage the import and invoice in your name. However, for large volumes, we recommend accounting advice.",

            // CHAT WIDGET
            chat_header_title: "IMPONECT Assistant",
            chat_status_online: "Online",
            chat_welcome_msg: "Hello! 👋 Welcome to Imponect. <br>How can we innovate together today?",
            chat_time_now: "Just now",
            chat_placeholder: "Type your message..."
        }
    };

    function setLanguage(lang) {
        localStorage.setItem('imponect_lang', lang);

        langTexts.forEach(span => {
            if(span.innerText === lang.toUpperCase()) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });

        const elementsToTranslate = document.querySelectorAll('[data-i18n]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        
        // --- NUEVO: TRADUCCIÓN DE PLACEHOLDERS ---
        const elementsWithPlaceholder = document.querySelectorAll('[data-i18n-placeholder]');
        elementsWithPlaceholder.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        
        // Actualizar FAQ visible dinámicamente si el modal no está abierto
        // (Esto es opcional, pero ayuda a que los títulos de la lista cambien)
        const faqTitles = document.querySelectorAll('.faq-question-box');
        faqTitles.forEach(box => {
            const id = box.getAttribute('data-faq-id');
            if(translations[lang][id]) {
                box.innerText = translations[lang][id];
            }
        });
    }

    if(langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault(); 
            const currentLang = localStorage.getItem('imponect_lang') || 'es';
            const newLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(newLang);
        });
    }

    const savedLang = localStorage.getItem('imponect_lang') || 'es';
    setLanguage(savedLang);
});
