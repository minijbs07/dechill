// --- BASE DE DATOS DE PRODUCTOS ---
const productsDB = [
    {
        id: "ataudes",
        category: "Fabricación Propia",
        title: "Ataúd Pino Cantabria",
        description: "Ataúdes elaborados íntegramente en España, concretamente en Cantabria. Utilizamos madera de alta calidad proveniente de proveedores de la región. El diseño combina la solidez estructural con acabados finos y respetuosos, garantizando un producto digno para la despedida. Su interior está revestido en satén blanco hipoalergénico.",
        // NOMBRE ACTUALIZADO
        image: "ataud-roble.jpeg" 
    },
    {
        id: "urnas",
        category: "Elaboración Artesanal",
        title: "Urna Minimalista",
        description: "Urnas de diseño exclusivo y elaboración artesanal llevada a cabo en nuestra nave del Polígono Industrial de Guarnizo. Torneadas con precisión, estas piezas destacan por su calidez y estética minimalista. Acabado mate natural.",
        // NOMBRE ACTUALIZADO
        image: "urna-minimalista.jpeg" 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Quitar Preloader
    setTimeout(() => {
        const loader = document.getElementById('preloader');
        const mainContent = document.getElementById('main-content');
        const navbar = document.querySelector('.navbar');

        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 800);
        }
        
        if(mainContent) mainContent.classList.add('loaded');
        if(navbar) navbar.classList.add('visible');

    }, 1200);

    // 2. Renderizar Catálogo
    renderCatalog();

    // 3. Menú Móvil
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active-menu');
            menuToggle.classList.toggle('is-active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active-menu')) {
                navMenu.classList.remove('active-menu');
                menuToggle.classList.remove('is-active');
            }
        });
    });

    // 4. Animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);
});

function navigateTo(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none'; 
    });

    window.scrollTo(0, 0);

    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = 'block';
        void target.offsetWidth; 
        target.classList.add('active');
    }
}

function renderCatalog() {
    const container = document.getElementById('catalog-container');
    if(!container) return;
    
    container.innerHTML = '';

    productsDB.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.onclick = () => openProductDetail(prod.id); 

        // Fallback por seguridad
        const fallbackImg = "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?q=80&w=800&auto=format&fit=crop";

        card.innerHTML = `
            <div class="pc-img-box">
                <img src="${prod.image}" alt="${prod.title}" onerror="this.src='${fallbackImg}'">
            </div>
            <div class="pc-info">
                <span class="pc-cat">${prod.category}</span>
                <h3 class="pc-title">${prod.title}</h3>
                <button class="btn-noble" style="margin-top:1rem;">Ver Detalle</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function openProductDetail(id) {
    const product = productsDB.find(p => p.id === id);
    if (!product) return;

    const imgEl = document.getElementById('pd-img');
    const fallbackImg = "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?q=80&w=800&auto=format&fit=crop";
    
    if(imgEl) {
        imgEl.src = product.image;
        imgEl.onerror = function() { this.src = fallbackImg; };
    }
    
    const catEl = document.getElementById('pd-category');
    if(catEl) catEl.textContent = product.category;
    
    const titleEl = document.getElementById('pd-title');
    if(titleEl) titleEl.textContent = product.title;
    
    const descEl = document.getElementById('pd-desc');
    if(descEl) descEl.textContent = product.description;

    navigateTo('product-detail');
}