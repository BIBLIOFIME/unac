document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOTOR DE ENGRANAJES INTERACTIVOS POR SCROLL
    // ==========================================
    const gearMain = document.querySelector('.gear-main');
    const gearSub1 = document.querySelector('.gear-sub-1');
    const gearSub2 = document.querySelector('.gear-sub-2');

    window.addEventListener('scroll', () => {
        let value = window.scrollY;

        // Girar engranajes a velocidades desfasadas según la rotación física real
        if(gearMain) gearMain.style.transform = `rotate(${value * 0.15}deg)`;
        if(gearSub1) gearSub1.style.transform = `rotate(${value * -0.3}deg)`;
        if(gearSub2) gearSub2.style.transform = `rotate(${value * 0.25}deg)`;
    });

    // ==========================================
    // 2. BUSCADOR INTELIGENTE EN TIEMPO REAL
    // ==========================================
    const searchInput = document.getElementById('courseSearch');
    // Buscamos las tarjetas de ciclos. Si cambiaste la clase en tu HTML, 
    // asegúrate de que tus contenedores de ciclos tengan la clase 'cycle-section-card'
    const cycleCards = document.querySelectorAll('.cycle-section-card');

    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            cycleCards.forEach(cycle => {
                const accordionItems = cycle.querySelectorAll('.accordion-item');
                
                // SI EL BUSCADOR ESTÁ VACÍO: Muestra absolutamente todos los ciclos y cursos
                if (searchTerm === "") {
                    cycle.style.setProperty('display', 'block', 'important');
                    accordionItems.forEach(item => {
                        item.style.display = 'block';
                    });
                    return; 
                }

                // SI EL CICLO NO TIENE CURSOS EN EL HTML: Se oculta de inmediato al buscar
                if (accordionItems.length === 0) {
                    cycle.style.setProperty('display', 'none', 'important');
                    return;
                }

                let hasVisibleCourse = false;

                accordionItems.forEach(item => {
                    const keywords = item.getAttribute('data-keywords') ? item.getAttribute('data-keywords').toLowerCase() : '';
                    const courseTitle = item.querySelector('.accordion-trigger h3') ? item.querySelector('.accordion-trigger h3').textContent.toLowerCase() : '';

                    if (keywords.includes(searchTerm) || courseTitle.includes(searchTerm)) {
                        item.style.display = 'block';
                        hasVisibleCourse = true; 
                        item.style.animation = 'fadeIn 0.3s ease forwards';
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('active');
                        const panel = item.querySelector('.accordion-panel');
                        if (panel) panel.style.maxHeight = null;
                    }
                });

                // DECISIÓN FINAL SOBRE EL CICLO:
                // Si tiene el curso buscado se queda, si no, se fulmina de la pantalla.
                if (hasVisibleCourse) {
                    cycle.style.setProperty('display', 'block', 'important');
                } else {
                    cycle.style.setProperty('display', 'none', 'important');
                }
            });
        });
    }
});

// ==========================================
// 3. MÓDULO INTERACTIVO DE ASISTENCIA (CELULARES)
// ==========================================
function toggleHelpPanel() {
    if (window.innerWidth <= 992) {
        const sidebar = document.getElementById('helpSidebar');
        if (sidebar) {
            sidebar.classList.toggle('active-panel');
        }
    }
}

// ==========================================
// 4. MOTOR DE DESPLIEGUE EXCLUSIVO DE CURSOS POR CICLO
// ==========================================
function toggleAccordion(button) {
    const currentItem = button.parentElement;
    const currentPanel = currentItem.querySelector('.accordion-panel');
    const isActive = currentItem.classList.contains('active');
    
    // 1. Buscar todos los acordeones abiertos en la página y cerrarlos (Efecto acordeón único)
    document.querySelectorAll('.accordion-item.active').forEach(openItem => {
        if (openItem !== currentItem) {
            openItem.classList.remove('active');
            const panel = openItem.querySelector('.accordion-panel');
            if (panel) panel.style.maxHeight = null;
        }
    });
    
    // 2. Alternar el estado del curso clickeado
    if (!isActive) {
        currentItem.classList.add('active');
        currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
    } else {
        currentItem.classList.remove('active');
        currentPanel.style.maxHeight = null;
    }
}