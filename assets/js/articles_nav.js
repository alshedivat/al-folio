// Dynamic Navigation Panel for Articles Page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on articles page
    if (!window.location.pathname.includes('/me-like/articles')) return;
    
    // Fetch articles data and build navigation
    fetch('/assets/json/me-like-articles.json')
        .then(response => response.json())
        .then(data => {
            createArticlesNavigation(data.categories);
            buildArticlesContent(data.categories);
            setupRandomArticleBox(data.categories);
        })
        .catch(error => {
            console.error('Error loading articles data:', error);
        });
});

function createArticlesNavigation(categories) {
    // Create navigation panel
    const navPanel = document.createElement('div');
    navPanel.className = 'articles-nav-panel';
    navPanel.innerHTML = `
        <div class="articles-nav-header">Navigate</div>
        <div class="articles-nav-items">
            ${categories.map(category => 
                `<a href="#${createSlug(category.title)}" class="articles-nav-item" data-section="${createSlug(category.title)}">${category.title}</a>`
            ).join('')}
        </div>
    `;
    
    document.body.appendChild(navPanel);
    
    // Add smooth scrolling for navigation links
    const navItems = document.querySelectorAll('.articles-nav-panel .articles-nav-item');
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
        const scrollPosition = window.scrollY + 200;
        let activeSection = null;
        
        categories.forEach(category => {
            const sectionId = createSlug(category.title);
            const sectionElement = document.getElementById(sectionId);
            if (sectionElement) {
                const sectionTop = sectionElement.offsetTop;
                const sectionHeight = sectionElement.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    activeSection = sectionId;
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
    updateActiveSection(); // Initial call
}

function buildArticlesContent(categories) {
    const articlesContainer = document.getElementById('articles-content');
    if (!articlesContainer) return;
    
    articlesContainer.innerHTML = `
        <div class="random-article-section">
            <div class="random-article-box">
                <div class="random-article-header">
                    <h3>Random Article</h3>
                    <div class="random-article-header-buttons">
                        <a href="#" target="_blank" class="random-article-link">Read</a>
                        <button class="refresh-article-btn" onclick="refreshRandomArticle()">🔄</button>
                    </div>
                </div>
                <div class="random-article-content">
                    <div class="random-article-title"></div>
                    <div class="random-article-authors"></div>
                    <div class="random-article-commentary"></div>
                </div>
            </div>
        </div>
        <hr class="random-section-divider">
    ` + categories.map(category => `
        <div class="articles-section" id="${createSlug(category.title)}">
            <h2 class="articles-section-header">${category.title}</h2>
            <div class="articles-section-description-inline">${category.description}</div>
            <div class="articles-grid">
                ${category.papers.map((paper, index) => `
                    <div class="article-item" data-category="${createSlug(category.title)}" data-index="${index}">
                        <div class="article-compact-view">
                            <div class="article-main-info">
                                <h3 class="article-title">${paper.title}</h3>
                                <div class="article-authors">${paper.authors} • ${paper.year}</div>
                            </div>
                            <a href="${paper.link}" target="_blank" class="article-link-btn" onclick="event.stopPropagation()">Read</a>
                        </div>
                        <div class="article-expanded-view" style="display: none;">
                            <div class="article-details">
                                <div class="article-commentary">${paper.commentary}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    // Add click handlers for article cards
    const articleItems = document.querySelectorAll('.article-item');
    articleItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't expand if clicking on the Read button
            if (e.target.classList.contains('article-link-btn')) {
                return;
            }
            
            const expandedView = this.querySelector('.article-expanded-view');
            const isExpanded = expandedView.style.display === 'block';
            
            // Close all other expanded cards
            document.querySelectorAll('.article-expanded-view').forEach(view => {
                view.style.display = 'none';
            });
            document.querySelectorAll('.article-item').forEach(card => {
                card.classList.remove('expanded');
            });
            
            // Toggle current card
            if (!isExpanded) {
                expandedView.style.display = 'block';
                this.classList.add('expanded');
            }
        });
        
        // Add cursor pointer to indicate clickability
        item.style.cursor = 'pointer';
    });
}

function createSlug(text) {
    return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Global variable to store articles data for random article functionality
let allArticles = [];

function setupRandomArticleBox(categories) {
    // Flatten all articles into a single array
    allArticles = [];
    categories.forEach(category => {
        category.papers.forEach(paper => {
            allArticles.push(paper);
        });
    });
    
    // Show initial random article
    refreshRandomArticle();
}

function refreshRandomArticle() {
    if (allArticles.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * allArticles.length);
    const randomArticle = allArticles[randomIndex];
    
    const titleElement = document.querySelector('.random-article-title');
    const authorsElement = document.querySelector('.random-article-authors');
    const commentaryElement = document.querySelector('.random-article-commentary');
    const linkElement = document.querySelector('.random-article-link');
    
    if (titleElement && authorsElement && commentaryElement && linkElement) {
        titleElement.textContent = randomArticle.title;
        authorsElement.textContent = `${randomArticle.authors} • ${randomArticle.year}`;
        commentaryElement.textContent = randomArticle.commentary;
        linkElement.href = randomArticle.link;
    }
}