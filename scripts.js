// --- BASE DE DATOS GENÉRICA ---
const productsDB = [
    {
        id: "ataudes",
        category: "Fabricación Propia",
        title: "Ataúdes",
        description: "Ataúdes elaborados íntegramente en España, concretamente en Cantabria. Utilizamos madera proveniente de proveedores de la región, garantizando un proceso productivo responsable y sostenible. Cada pieza refleja el compromiso, la dedicación y el respeto de nuestros profesionales.",
        image: "https://images.unsplash.com/photo-1517424667319-e58f0003cb0c?q=80&w=2069&auto=format&fit=crop" 
    },
    {
        id: "urnas",
        category: "Elaboración Artesanal",
        title: "Urnas Funerarias",
        description: "Urnas de elaboración artesanal llevada a cabo en nuestra nave del Polígono Industrial de Guarnizo. Tratadas con el máximo rigor profesional, sensibilidad y calidad en el cuidado del detalle.",
        image: "https://images.unsplash.com/photo-1605218427368-35b86121852d?q=80&w=2008&auto=format&fit=crop" 
    }
];

// --- INICIALIZACIÓN (Event Listeners y Carga inicial) ---
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

    // 3. Menú Móvil (Listener para el botón)
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active-menu');
            menuToggle.classList.toggle('is-active');
        });
    }

    // 4. Iniciar Observador de Animaciones (Scroll)
    // Retardo para asegurar que el DOM dinámico está listo
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);
});

// --- SISTEMA DE NAVEGACIÓN (GLOBAL) ---
// Esta función debe estar fuera para ser accesible desde el HTML
function navigateTo(pageId) {
    // 1. Ocultar todas las secciones
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        sec.classList.remove('active');
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

    // 4. Cerrar menú móvil al navegar
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.getElementById('mobile-menu');
    
    if(navMenu && navMenu.classList.contains('active-menu')) {
        navMenu.classList.remove('active-menu');
        if(menuToggle) menuToggle.classList.remove('is-active');
    }
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

    // Navegar a la página de detalle
    navigateTo('product-detail');
}

// --- ANIMACIONES AL SCROLL (OBSERVER) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });