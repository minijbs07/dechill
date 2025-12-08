// --- BASE DE DATOS GENÉRICA (Basada estrictamente en el texto) ---
// Solo mostramos las dos categorías principales mencionadas en el texto.
const productsDB = [
    {
        id: "ataudes",
        category: "Fabricación Propia",
        title: "Ataúdes",
        description: "Ataúdes elaborados íntegramente en España, concretamente en Cantabria. Utilizamos madera proveniente de proveedores de la región, garantizando un proceso productivo responsable y sostenible. Cada pieza refleja el compromiso, la dedicación y el respeto de nuestros profesionales.",
        image: "https://images.unsplash.com/photo-1517424667319-e58f0003cb0c?q=80&w=2069&auto=format&fit=crop" // Imagen solemne de ataúd de madera clara/natural
    },
    {
        id: "urnas",
        category: "Elaboración Artesanal",
        title: "Urnas Funerarias",
        description: "Urnas de elaboración artesanal llevada a cabo en nuestra nave del Polígono Industrial de Guarnizo. Tratadas con el máximo rigor profesional, sensibilidad y calidad en el cuidado del detalle.",
        image: "https://images.unsplash.com/photo-1605218427368-35b86121852d?q=80&w=2008&auto=format&fit=crop" // Imagen de urna sobria/madera
    }
];

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Quitar Preloader
    setTimeout(() => {
        const loader = document.getElementById('preloader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 800);
        }
    }, 1200);

    // 2. Renderizar Catálogo
    renderCatalog();

    // 3. Menú Móvil
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active-menu');
        });
    }
});

// --- SISTEMA DE NAVEGACIÓN ---
function navigateTo(pageId) {
    // 1. Ocultar todas las secciones
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        sec.classList.remove('active');
        // Pequeño timeout para display none si quisieramos animar salida
        sec.style.display = 'none'; 
    });

    // 2. Scroll al top
    window.scrollTo(0, 0);

    // 3. Mostrar sección deseada
    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = 'block';
        // Forzar reflow para reiniciar animaciones CSS
        void target.offsetWidth; 
        target.classList.add('active');
    }

    // Cerrar menú móvil si está abierto
    const navMenu = document.querySelector('.nav-menu');
    if(navMenu) navMenu.classList.remove('active-menu');
}

// --- RENDERIZADO CATÁLOGO ---
function renderCatalog() {
    const container = document.getElementById('catalog-container');
    if(!container) return;
    
    container.innerHTML = '';

    productsDB.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.onclick = () => openProductDetail(prod.id); 

        card.innerHTML = `
            <div class="pc-img-box">
                <img src="${prod.image}" alt="${prod.title}">
            </div>
            <div class="pc-info">
                <span class="pc-cat">${prod.category}</span>
                <h3 class="pc-title">${prod.title}</h3>
                <button class="btn-noble" style="margin-top:1rem;">Ver Descripción</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- DETALLE PRODUCTO ---
function openProductDetail(id) {
    const product = productsDB.find(p => p.id === id);
    if (!product) return;

    // Rellenar datos
    const imgEl = document.getElementById('pd-img');
    if(imgEl) imgEl.src = product.image;
    
    const catEl = document.getElementById('pd-category');
    if(catEl) catEl.textContent = product.category;
    
    const titleEl = document.getElementById('pd-title');
    if(titleEl) titleEl.textContent = product.title;
    
    const descEl = document.getElementById('pd-desc');
    if(descEl) descEl.textContent = product.description;

    // Navegar
    navigateTo('product-detail');
}

// --- ANIMACIONES AL SCROLL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Forzar opacidad por si el CSS tarda
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Retardo para asegurar que el DOM está listo
setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}, 500);