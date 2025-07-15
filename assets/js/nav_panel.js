// Dynamic Navigation Panel for CV Page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on CV page
    if (!window.location.pathname.includes('/cv')) return;
    
    // Create navigation panel
    const navPanel = document.createElement('div');
    navPanel.className = 'nav-panel';
    navPanel.innerHTML = `
        <div class="nav-header">Navigate</div>
        <div class="nav-items">
            <a href="#cs-publications" class="nav-item" data-section="cs-publications">CS Work</a>
            <a href="#philosophy-writings" class="nav-item" data-section="philosophy-writings">Philosophy Work</a>
            <a href="#education" class="nav-item" data-section="education">Education</a>
            <a href="#recognition" class="nav-item" data-section="recognition">Recognition</a>
            <a href="#teaching" class="nav-item" data-section="teaching">Teaching</a>
            <a href="#news" class="nav-item" data-section="news">News</a>
            <a href="#service" class="nav-item" data-section="service">Service</a>
            <a href="#books" class="nav-item" data-section="books">Books</a>
            <a href="#projects" class="nav-item" data-section="projects">Misc. Work</a>
        </div>
    `;
    
    document.body.appendChild(navPanel);
    
    // Add IDs to sections for navigation
    const sections = [
        { selector: 'h2:contains("Computer Science Publications")', id: 'cs-publications' },
        { selector: 'h2:contains("Philosophy Writings")', id: 'philosophy-writings' },
        { selector: 'h2:contains("Education")', id: 'education' },
        { selector: 'h2:contains("Recognition")', id: 'recognition' },
        { selector: 'h2:contains("Teaching")', id: 'teaching' },
        { selector: 'h2:contains("News")', id: 'news' },
        { selector: 'h2:contains("Academic Service")', id: 'service' },
        { selector: 'h2:contains("Books")', id: 'books' },
        { selector: 'h2:contains("Misc. Work")', id: 'projects' }
    ];
    
    // Helper function to find elements by text content
    function findElementByText(text) {
        const elements = document.querySelectorAll('h2');
        for (let el of elements) {
            if (el.textContent.includes(text)) {
                return el;
            }
        }
        return null;
    }
    
    // Add IDs to sections
    const sectionElements = [
        { element: findElementByText('Computer Science Publications'), id: 'cs-publications' },
        { element: findElementByText('Philosophy Writings'), id: 'philosophy-writings' },
        { element: findElementByText('Education'), id: 'education' },
        { element: findElementByText('Recognition'), id: 'recognition' },
        { element: findElementByText('Teaching'), id: 'teaching' },
        { element: findElementByText('News'), id: 'news' },
        { element: findElementByText('Academic Service'), id: 'service' },
        { element: findElementByText('Books'), id: 'books' },
        { element: findElementByText('Misc. Work'), id: 'projects' }
    ];
    
    sectionElements.forEach(({ element, id }) => {
        if (element) {
            element.parentElement.id = id;
        }
    });
    
    // Smooth scrolling for navigation links
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll spy functionality
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 200; // Offset for better detection
        
        let activeSection = null;
        sectionElements.forEach(({ element, id }) => {
            if (element && element.parentElement) {
                const sectionTop = element.parentElement.offsetTop;
                const sectionHeight = element.parentElement.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    activeSection = id;
                }
            }
        });
        
        // Update active state
        navItems.forEach(item => {
            const sectionId = item.getAttribute('data-section');
            if (sectionId === activeSection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Throttled scroll listener
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    updateActiveSection();
});